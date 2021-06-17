import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { RootState } from "store"
import { TPlacement } from "app/domains/moderation/types"
import { createModerationThunks } from "app/domains/moderation/createModerationThunks"
interface IModerationState {
    loading: boolean;
    apiState: string | null;
    placements: TPlacement[] | null; // TODO: We use TExcelData for now, but it should likely have its own type later
}

const initialState: IModerationState = {
    loading: false,
    apiState: null,
    placements: null
}
const { getPlacementsThunk, deletePlacementThunk, updateBulkThunk } = createModerationThunks

const moderationSlice = createSlice({
    name: "moderation",
    initialState,
    reducers: {
        setLoadingState: (state, { payload }: PayloadAction<boolean>) => {
            state.loading = payload
        },
        updatePlacements: (state, { payload }: PayloadAction<TPlacement[]>) => {
            state.placements = payload
        }
    },
    extraReducers: builder => {
        builder
            .addCase(updateBulkThunk.pending, (state) => {
                state.loading = true
                state.apiState = updateBulkThunk.pending.toString()
            })
            .addCase(updateBulkThunk.rejected, (state) => {
                state.loading = false
            })
            .addCase(updateBulkThunk.fulfilled, (state) => {
                state.loading = false
            })
            .addCase(getPlacementsThunk.pending, (state) => {
                state.loading = true
            })
            .addCase(getPlacementsThunk.rejected, (state) => {
                state.loading = false
            })
            .addCase(getPlacementsThunk.fulfilled, (state, act: PayloadAction<TPlacement[]>) => {
                state.loading = false
                state.placements = act.payload
            })
            .addCase(
                deletePlacementThunk.pending,
                (state) => {
                    state.apiState = deletePlacementThunk.pending.toString()
                }
            )
            .addCase(
                deletePlacementThunk.fulfilled,
                (state) => {
                    state.apiState = null
                }
            )
            .addCase(
                deletePlacementThunk.rejected,
                (state) => {
                    state.apiState = null
                }
            )
    }
})

export const { setLoadingState, updatePlacements } = moderationSlice.actions
export default moderationSlice.reducer

export const selectLoadingState = (state: RootState) => state.discovery.loading
export const selectPlacements = ({ moderation }: RootState) => {
    return !moderation.placements?.length ? null : moderation.placements
}

// Thunks

export { getPlacementsThunk, deletePlacementThunk, updateBulkThunk }
