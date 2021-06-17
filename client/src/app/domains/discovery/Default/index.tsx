import React, { useEffect } from "react";
import { useRouteMatch, useHistory } from "react-router-dom";
import { CircularProgress, Grid, Theme, Typography } from "@material-ui/core";
import { ButtonPrimary } from "baseComponents/ButtonPrimary";
import { makeStylesWithAwesomeTheme } from "styles/theme";
import { useAppDispatch, useAppSelector } from "hooks";
import { getBatchesThunk } from "app/domains/discovery/discoverySlice";
import { selectBatches, selectLoadingState } from "../discoverySlice";
import { THeader, AwesomeTable } from "baseComponents/AwesomeTable";
import { DiscoveryActions } from "./DiscoveryActionButton";
import { DiscoveryDetailsDialog } from "./DiscoveryDetailsDialog";

const useStyles = makeStylesWithAwesomeTheme((theme: Theme) => ({
    sectionHeader: {
        marginBottom: theme.spacing(4)
    },
    sectionBody: {
        height: "50%"
    },
    sectionFooter: {
        display: "flex",
        justifyContent: "flex-end"
    }
}))

const useGetBatches = () => {
    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(getBatchesThunk(null))
    }, [])
}

const tableHeaders: THeader[] = [
    { attr: "batchName", label: "Batch Name" },
    { attr: "sourceType", label: "Source Type" },
    { attr: "data_uploaded", label: "Date Updated" },
    { attr: "assignedRatio", label: "% Assigned" },
    { attr: "moderatedRatio", label: "% Moderated" },
    { attr: "qcRatio", label: "% QC" },
    { attr: "priority", label: "Priority" }
]

export const DiscoveryDefault = () => {
    useGetBatches()
    const classes = useStyles()
    const history = useHistory()
    const { path } = useRouteMatch();
    const isLoading = useAppSelector(selectLoadingState)
    const rows = useAppSelector(selectBatches)

    const [openRow, setOpenRow] = React.useState<null | number>(null);
    const handleClose = () => setOpenRow(null)

    return (
        <>
            <Grid className={classes.sectionHeader} container justify="space-between">
                <Grid item>
                    <Typography variant="h4">Discovery Batches</Typography>
                </Grid>
                <Grid item>
                    <ButtonPrimary onClick={() => history.push(`${path}/upload`)}>Upload File</ButtonPrimary>
                </Grid>
            </Grid>
            <div className={classes.sectionBody}>
                {
                    isLoading || !rows ?
                        <CircularProgress /> :
                        <AwesomeTable {...{
                            headers: tableHeaders,
                            showActionColumn: true,
                            rows: rows,
                            ActionButton: DiscoveryActions({ setOpenRow })
                        }} />
                }
            </div>
            { rows && openRow !== null && <DiscoveryDetailsDialog {...{ openRow, handleClose, rowData: rows![openRow] }} />}
        </>
    )
}
