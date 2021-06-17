import React, { useEffect } from "react"
import { Theme, Typography, CircularProgress, Button } from "@material-ui/core"
import { useAppDispatch, useAppSelector } from "hooks"
import { makeStylesWithAwesomeTheme } from "styles/theme"
import { updateBulkThunk, getPlacementsThunk, selectLoadingState, selectPlacements, setLoadingState } from "app/domains/moderation/moderationSlice"
import { AwesomeTable, THeader, TRowData } from "baseComponents/AwesomeTable"
import { ModerationActions } from "app/domains/moderation/Default/ModerationActionButton"
import { ModerationDetailsDialog } from "app/domains/moderation/Default/ModerationDetailsDialog"
import { TBulkUpdate, TBulkUpdateField, TPlacement } from "app/domains/moderation/types"
import { ModerationBulkUpdatePriorityDialog } from "app/domains/moderation/Default/ModerationBulkUpdatePriorityDialog"
import { ModerationBulkUpdateModeratorDialog } from "app/domains/moderation/Default/ModerationBulkUpdateModeratorDialog"

const useStyles = makeStylesWithAwesomeTheme((theme: Theme) => ({
    sectionHeader: {
        marginBottom: theme.spacing(4)
    },
    sectionBody: {
        minHeight: "50%"
    },
    spinner: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: `calc(100% - ${theme.spacing(4)}px)`
    },
    table: {
        minWidth: 650,
        alignSelf: "flexStart"
    },
}))

const useGetPlacements = () => {
    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(getPlacementsThunk())
    }, [])
}

const tableHeaders: THeader[] = [
    { attr: "name", label: "Name & Inventory Type" },
    { attr: "source", label: "Source" },
    { attr: "language", label: "Language" },
    { attr: "origin", label: "Origin" },
    { attr: "priority", label: "Priority" },
    { attr: "status", label: "Status" },
]

type TPlacementWithChecked = TPlacement & {
    id: number,
    checked: boolean,
}

export const ModerationDefault: React.FC = () => {
    useGetPlacements()
    const dispatch = useAppDispatch()
    const classes = useStyles()
    const isLoading = useAppSelector(selectLoadingState)

    //Handle Detail Dialog
    const placementRows = useAppSelector(selectPlacements)

    const [openPlacementRowDialog, setOpenPlacementRowDialog] = React.useState<null | number>(null)

    //Handle Bulk Update Priority Dialog
    const [openBulkUpdateModeratorDialog, setOpenBulkUpdateModeratorDialog] = React.useState<boolean>(false)
    const [openBulkUpdatePriorityDialog, setOpenBulkUpdatePriorityDialog] = React.useState<boolean>(false)
    const [placementsForTable, setPlacementsForTable] = React.useState<TPlacementWithChecked[]>([])
    const [checkedPlacement, setCheckedPlacement] = React.useState<number>(0)
    useEffect(() => {
        let bufferPlacement: TPlacementWithChecked[] = []
        bufferPlacement = placementRows?.map((placement, index) => {
            return {
                ...placement,
                id: placement.placementID,
                checked: false
            }
        }) || []
        setPlacementsForTable([...bufferPlacement])
    }, [placementRows])

    useEffect(() => {
        setCheckedPlacement(placementsForTable.filter((placement) => placement.checked).length)
    }, [placementsForTable])

    const checkRow = (value: boolean, row: TPlacementWithChecked) => {
        let bufferPlacement: TPlacementWithChecked[] = []
        bufferPlacement = [...placementsForTable]
        const id: number = row.id
        const idIndex: number = placementsForTable.findIndex((placement, index) => placement.id == id)

        bufferPlacement[idIndex].checked = value
        setPlacementsForTable([...bufferPlacement])
    }
    const checkAll = async (value: boolean) => {
        let bufferPlacement: TPlacementWithChecked[] = []
        bufferPlacement = placementsForTable?.map((placement, index) => {
            return {
                ...placement,
                checked: value
            }
        })
        setPlacementsForTable(bufferPlacement)
    }
    const handleClosePlacementRowDialog = () => setOpenPlacementRowDialog(null)
    return (
        <>
            <div className={classes.sectionHeader}>
                <Typography variant="h4">Moderation</Typography>
            </div>
            {
                isLoading || !placementRows ?
                    <div className={classes.spinner}>
                        <CircularProgress size={80} />
                    </div> :
                    <div className={classes.sectionBody}>
                        {checkedPlacement > 0 ?
                            <Button
                                onClick={() => {
                                    setOpenBulkUpdatePriorityDialog(true)
                                }}
                            >
                                Open Priority Bulk Update
                            </Button>
                            :
                            <></>
                        }
                        {checkedPlacement > 0 ?
                            <Button
                                onClick={() => {
                                    setOpenBulkUpdateModeratorDialog(true)
                                }}
                            >
                                Open Moderator Bulk Update
                            </Button>
                            :
                            <></>
                        }

                        <AwesomeTable {...{
                            headers: tableHeaders,
                            showActionColumn: true,
                            showMultiSelectColumn: true,
                            rows: placementsForTable,
                            checkAll,
                            checkRow,
                            ActionButton: ModerationActions({ setOpenRow: setOpenPlacementRowDialog })
                        }} />
                    </div>
            }
            {checkedPlacement > 0 ? <ModerationBulkUpdatePriorityDialog
                openRow={openBulkUpdatePriorityDialog}
                handleClose={() => {
                    setOpenBulkUpdatePriorityDialog(false)
                }}
                updateBulk={(priority: number) => {
                    let formattingPlacement: TBulkUpdate[] = []
                    let checkedPlacement: TPlacementWithChecked[] = []
                    checkedPlacement = placementsForTable.filter((placement) => placement.checked)
                    formattingPlacement = checkedPlacement.map((placement) => {
                        return {
                            id: placement.placementID,
                            value: priority
                        }
                    })
                    const bulkUpdateField: TBulkUpdateField = {
                        bulkUpdate: formattingPlacement,
                        field: "priority"
                    }
                    console.log(bulkUpdateField)
                    dispatch(updateBulkThunk(bulkUpdateField))
                }}
            /> : <></>}
            {checkedPlacement > 0 ?
                <ModerationBulkUpdateModeratorDialog
                    openRow={openBulkUpdateModeratorDialog}
                    handleClose={() => {
                        setOpenBulkUpdateModeratorDialog(false)
                    }}
                    updateBulk={(moderator: string) => {
                        let formattingPlacement: TBulkUpdate[] = []
                        let checkedPlacement: TPlacementWithChecked[] = []
                        checkedPlacement = placementsForTable.filter((placement) => placement.checked)
                        formattingPlacement = checkedPlacement.map((placement) => {
                            return {
                                id: placement.placementID,
                                value: moderator
                            }
                        })
                        const bulkUpdateField: TBulkUpdateField = {
                            bulkUpdate: formattingPlacement,
                            field: "moderator"
                        }
                        console.log(bulkUpdateField)
                        dispatch(updateBulkThunk(bulkUpdateField))
                    }}
                /> : <></>
            }
            {
                placementRows &&
                openPlacementRowDialog !== null &&
                <ModerationDetailsDialog {
                    ...{
                        openRow: openPlacementRowDialog,
                        handleClose: handleClosePlacementRowDialog,
                        rowData: placementRows![openPlacementRowDialog]
                    }
                } />
            }
        </>
    )
}
