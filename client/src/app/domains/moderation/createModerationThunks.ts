import { createAsyncThunk } from "@reduxjs/toolkit"
import { api } from "apiConfig"
import { TBulkUpdateField, TPlacement } from "app/domains/moderation/types"

interface IGetPlacementsResponse extends Response {
    json(): Promise<{
        placements: TPlacement[],
        totalPlacements: number
    }>
}

const getPlacementsThunk = createAsyncThunk(
    'moderation/get',
    async () => {
        let fetched: IGetPlacementsResponse = await fetch(api.moderation, { method: "GET" })

        if (fetched.status >= 400) { throw Error("Api Error") }

        const { placements } = await fetched.json()

        return placements
    }
)

interface IPlacementResponse extends Response {
    json(): Promise<{
        message: string,
        batchID: number
    }>
}

const deletePlacementThunk = createAsyncThunk(
    'moderation/delete',
    async (arg: { placementID: number }, thunkAPI) => {
        try {
            let response: IPlacementResponse = await fetch(api.moderation, {
                method: "DELETE",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ placementID: arg.placementID })
            })

            if(response.ok) {
                thunkAPI.dispatch(getPlacementsThunk())
            }

        } catch (e) {
            thunkAPI.rejectWithValue(`deletePlacementThunk: Encountered an error`)
            return
        }
        
        return
    }
)

interface IUpdateBulkPlacementResponse extends Response {
    json(): Promise<{
        message: string,
    }>
}
const updateBulkThunk = createAsyncThunk(
    'moderation/update/bulk',
    async(payload: TBulkUpdateField, thunkAPI)=>{
        let responseBody
        try {
            let response: IUpdateBulkPlacementResponse = await fetch(api.moderation, {
                method: "PUT",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(payload)
            })

            if(response.ok) {
                responseBody = await response.json()
                console.log(responseBody)
                thunkAPI.dispatch(getPlacementsThunk())
            }

        } catch (e) {
            thunkAPI.rejectWithValue(`updateBulkThunk: Encountered an error`)
            console.log(e)
            return
        }
        return
    }
)

export const createModerationThunks = {
    getPlacementsThunk,
    deletePlacementThunk,
    updateBulkThunk,
}
