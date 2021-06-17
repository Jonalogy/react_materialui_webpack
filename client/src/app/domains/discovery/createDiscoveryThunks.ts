import { createAsyncThunk } from "@reduxjs/toolkit"
import { api } from "apiConfig"
import { AppDispatch, RootState } from "store"
import { TBatch, TExcelData, TExcelRawData } from "app/domains/discovery/types"
import { UploadErrorEnum, TNewBatchDetails } from "app/domains/discovery/UploadNewBatch/types"
import { parseExcel, validateParsedData } from "app/domains/discovery//UploadNewBatch/utilities"
import { TSetNewUploadedBatch } from "app/domains/discovery//discoverySlice"

// TODO: 
// - Set loading state
// - Set wizard value
const parseAndValidateExcelThunkCreator = (setNewUploadedBatch?: TSetNewUploadedBatch) => createAsyncThunk(
    'discovery/parseAndValidateExcelThunk',
    async (excelRawData: TExcelRawData, thunkApi) => {

        if (!setNewUploadedBatch) { return }
        let parsedData = await parseExcel(excelRawData.buffer)
        
        if (!parsedData) {
            return thunkApi.rejectWithValue({
                errorType: UploadErrorEnum.PARSED_ERROR,
                errorMessage: "@parseAndValidateExcelThunk: Error occured while parsing excel data"
            })
        }

        let validationError = await validateParsedData(parsedData!)
        
        if (validationError?.length > 0) {
            return thunkApi.rejectWithValue({
                errorType: UploadErrorEnum.VALIDATION_ERROR,
                errorMessage: "@parseAndValidateExcelThunk: Error occured while validating excel data",
                loadingError: validationError,
                loadingErrorParsedData: parsedData,
            })
        }

        return thunkApi.dispatch(setNewUploadedBatch({
            batchName: excelRawData.batchName,
            placementList: parsedData!,
            priority: excelRawData.priority,
            sourceType: excelRawData.sourceType
        }))
    }
)

interface IUploadeBatchResponse extends Response {
    json(): Promise<any>
}
const uploadBatchThunk = createAsyncThunk<any, any, { dispatch: AppDispatch }>(
    'discovery/upload',
    async (customBatchDetails: TNewBatchDetails, thunkApi) => {
        if (!customBatchDetails) {
            return thunkApi.rejectWithValue("UploadBatchThunk Error: Argument [0] should not be empty!")
        }

        const { newBatch } = (thunkApi.getState() as RootState).discovery

        if (newBatch) {
            let response: IUploadeBatchResponse
            let responseBody

            let payload: TExcelData = {
                ...newBatch,
                batchName: customBatchDetails.name,
                priority: customBatchDetails.priority,
                sourceType: customBatchDetails.sourceType
            }
         
            try {
                response = await fetch(
                    api.discovery,
                    {
                        method: "POST",
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(payload)
                    }
                )

                if (response.status >= 400) { throw Error("Api Error") }

                responseBody = await response.json()

            } catch (e) {
                return thunkApi.rejectWithValue({
                    errorType: UploadErrorEnum.UPLOAD_BATCHES_ERROR,
                    errorMessage: `@uploadBatchThunk: Error occured while uploading the batches : ${e}`
                })
            }

            return responseBody
        }

    }
)

interface IBatchesResponse extends Response {
    json(): Promise<{
        batches: TBatch[],
        totalBatches: number
    }>
}

const getBatchesThunk = createAsyncThunk(
    'discovery/get',
    async (_: null, thunkApi) => {
        try {
            let fetched: IBatchesResponse = await fetch(api.discovery, { method: "GET" })
            if (fetched.status >= 400) { throw Error("Api Error") }
            const { batches } = await fetched.json()
            return batches
        } catch (e) {
            thunkApi.rejectWithValue(`getBatchesThunk error: ${e}`)
        }
    }
)

export const createDiscoveryThunks = {
    parseAndValidateExcelThunkCreator,
    uploadBatchThunk,
    getBatchesThunk
}

