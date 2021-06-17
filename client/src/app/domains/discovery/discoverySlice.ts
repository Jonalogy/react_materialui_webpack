import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { RootState } from "store"
import { TBatch, TExcelData } from "app/domains/discovery/types"
import { createDiscoveryThunks } from "app/domains/discovery/createDiscoveryThunks"
import { ValidationError } from "yup"
import { UploadErrorEnum } from "app/domains/discovery/UploadNewBatch/types"


export interface IDiscoveryState {
    loading: boolean;
    apiState: string | null;
    newBatch: TExcelData | null;
    loadingErrorType: UploadErrorEnum | null;
    loadingErrorMessage: string;
    loadingError: ValidationError[];
    loadingErrorParsedData: TBatch[] | null;
    batches: TBatch[] | null; // TODO: We use TExcelData for now, but it should likely have its own type later
}

const initialState: IDiscoveryState = {
    loading: false,
    apiState: null,
    newBatch: null,
    batches: null,
    loadingErrorType: null,
    loadingErrorMessage: "",
    loadingError: [],
    loadingErrorParsedData: []
}

const { getBatchesThunk, uploadBatchThunk} = createDiscoveryThunks
const discoverySlice = createSlice({
    name: "discovery",
    initialState,
    reducers: {
        setLoadingState: (state, { payload }: PayloadAction<boolean>) => {
            state.loading = payload
        },
        setNewUploadedBatch: (state, { payload }: PayloadAction<TExcelData | null>) => {
            state.newBatch = payload
        },
        clearApiState: (state) => {
            state.apiState = null
        },
        setBatchName: (state, { payload }: PayloadAction<string>) => {
            if (state.newBatch) {
                state.newBatch.batchName = payload
            }

        }
    },
    extraReducers: builder => {
        builder
            .addCase(createDiscoveryThunks.parseAndValidateExcelThunkCreator().
            rejected,(state, { payload }: PayloadAction<any>)=>{
                state.loadingErrorType = payload.errorType
                state.loadingError = payload.loadingError
                state.loadingErrorParsedData = payload.loadingErrorParsedData
                state.loadingErrorMessage = payload.errorMessage
            })
            .addCase(getBatchesThunk.pending, (state) => {
                state.apiState = getBatchesThunk.pending.toString()
            })
            .addCase(getBatchesThunk.rejected, (state, act: PayloadAction<unknown>) => {
                state.apiState = getBatchesThunk.rejected.toString()
                console.error("Error: Fetch for batch list failed", act.payload)
            })
            .addCase(getBatchesThunk.fulfilled, (state, act: PayloadAction<TBatch[] | undefined>) => {
                state.apiState = getBatchesThunk.fulfilled.toString()
                state.batches = act.payload ?? []
            })
            .addCase(uploadBatchThunk.pending, state => {
                state.apiState = uploadBatchThunk.pending.toString()
            })
            .addCase(uploadBatchThunk.rejected, (state, act: PayloadAction<any>) => {
                state.apiState = uploadBatchThunk.rejected.toString()
                state.loadingErrorType = act.payload?.errorType
                state.loadingErrorMessage = act.payload?.errorMessage
                console.error("Error: New batch upload failed", act.payload)
            })
            .addCase(uploadBatchThunk.fulfilled, state => {
                state.apiState = uploadBatchThunk.fulfilled.toString()
            })
    }
})

export const { setLoadingState, setNewUploadedBatch, clearApiState, setBatchName } = discoverySlice.actions
export type TSetNewUploadedBatch = typeof setNewUploadedBatch
export default discoverySlice.reducer

export const selectLoadingState = ({ discovery }: RootState) => discovery.loading
export const selectApiState = ({ discovery }: RootState) => discovery.apiState
export const selectBatchName = ({ discovery }: RootState) => discovery.newBatch?.batchName || null
export const selectBatches = ({ discovery }: RootState) => !discovery.batches?.length ? null : discovery.batches
export const selectDiscoveryState = ({ discovery }: RootState) => discovery

// ---- Thunks ----
export const parseAndValidateExcelThunk = createDiscoveryThunks.parseAndValidateExcelThunkCreator(setNewUploadedBatch)
export { getBatchesThunk, uploadBatchThunk }
