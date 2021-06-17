import React, { useEffect, MouseEventHandler, useState, createContext } from "react"
import { Button, IconButton, Paper, Theme, Typography } from "@material-ui/core"
import { useWizardContext } from "app/layouts/WizardFlows"
import { useAppDispatch, useAppSelector } from "hooks"
import { ArrowLeftSVG } from "icons/ArrowLeftSVG"
import { useHistory } from "react-router-dom"
import { makeStylesWithAwesomeTheme } from "styles/theme"
import { selectApiState, clearApiState, selectBatchName, uploadBatchThunk } from "app/domains/discovery/discoverySlice"
import { SelectFileControls } from "./SelectFileControls"
import { SetBatchDetailsControls } from "./SetBatchDetailsControls"
import { TNewBatchDetails } from "../types"

const useStyles = makeStylesWithAwesomeTheme((theme: Theme) => ({
    iconButton: {
        color: theme.palette.primary.main
    },
    svgFill: {
        fill: theme.palette.primary.main
    },
    sectionHeader: {
        marginBottom: theme.spacing(4),
        height: "10%"
    },
    sectionBody: {
        minHeight: "60%",
        padding: `${theme.spacing(6)}px ${theme.spacing(4)}px`,
        overflowY: "auto" // This overflow setting is required to overcome Collapsing Margins
    },
    sectionFooter: {
        height: `calc(100% - 10% - 60%)`,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center"
    }
}))

const useUploadStatus = () => {
    const dispatch = useAppDispatch()
    const { setWizardStep } = useWizardContext()
    const apiState = useAppSelector(selectApiState)

    useEffect(() => {
        if (apiState === uploadBatchThunk.fulfilled.toString()) {
            setWizardStep(1)
        }
        if (apiState === uploadBatchThunk.rejected.toString()) {
            setWizardStep(2)
        }
        return () => {
            if (apiState === uploadBatchThunk.rejected.toString() ||
                apiState === uploadBatchThunk.fulfilled.toString()) {
                console.log("Resetting Api State")
                dispatch(clearApiState())
            }
        }
    }, [apiState])
}

const useBatchDetails = (initialBatchName: string) => {
    const [batchDetails, setBatchDetails] = useState<TNewBatchDetails>({
        name: initialBatchName,
        sourceType: "survey",
        priority: "1"

    })

    useEffect(
        () => {
            setBatchDetails({ ...batchDetails, name: initialBatchName })
        },
        [initialBatchName]
    )

    return [batchDetails, setBatchDetails] as [TNewBatchDetails, React.Dispatch<React.SetStateAction<TNewBatchDetails>>]
}

export const SelectFileStep: React.FC = () => {
    const classes = useStyles()
    const dispatch = useAppDispatch()
    const history = useHistory()
    const initialBatchName = useAppSelector(selectBatchName) || ""
    
    const [customBatchDetails, setBatchDetails] = useBatchDetails(initialBatchName)
    useUploadStatus()

    const cancelHandler: MouseEventHandler = () => history.push("/discovery")
    const uploadHandler = () => dispatch(uploadBatchThunk(customBatchDetails))

    return (
        <>
            <div className={classes.sectionHeader}>
                <IconButton
                    className={classes.iconButton}
                    onClick={cancelHandler}
                    edge="start"
                    disableRipple={true} >
                    <ArrowLeftSVG color="primary" />
                    <Typography variant="button">Back</Typography>
                </IconButton>
                <Typography variant="h4">Upload New Batch</Typography>
            </div>
            <Paper className={classes.sectionBody} elevation={1}>
                <SelectFileControls />
                {
                    !initialBatchName ?
                        null :
                        <SetBatchDetailsControls {...{ initialBatchName, batchDetails: customBatchDetails, setBatchDetails }} />
                }
            </Paper>
            <div className={classes.sectionFooter}>
                <div>
                    <Button color="secondary" onClick={cancelHandler} variant="outlined">Cancel</Button>
                    <Button disabled={!initialBatchName} onClick={uploadHandler} >Upload files</Button>
                </div>
            </div>
        </>
    )
}
