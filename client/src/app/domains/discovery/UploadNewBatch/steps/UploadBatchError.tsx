import React from "react"
import { Box, IconButton, Theme, Typography, Table, TableHead, TableRow, TableCell, TableBody, Grid } from "@material-ui/core"
import { AwesomeTheme, makeStylesWithAwesomeTheme } from "styles/theme"
import { ArrowLeftSVG } from "icons/ArrowLeftSVG"
import { useAppSelector } from "hooks"
import { useWizardContext } from "app/layouts/WizardFlows"
import { ErrorMessageHeader } from "app/domains/discovery/UploadNewBatch/SubComponent/ErrorMessageHeader"
import { IDiscoveryState } from "app/domains/discovery/discoverySlice"
import { UploadErrorEnum, TExcelRowError } from "app/domains/discovery/UploadNewBatch/types"
import { ValidationError } from "yup"

const useStyles = makeStylesWithAwesomeTheme((theme: Theme) => ({
    iconButton: {
        color: theme.palette.primary.main
    },
    errorMessage: {
        color: theme.palette.error.contrastText
    },
    tableBox: {
        marginTop: "40px",
        display: "flex",
        justifyContent: "center",
        height: "500px",
        overflowY: "scroll",
        marginBottom: "50px"
    }
}))

export const UploadBatchError: React.FC = () => {
    const classes = useStyles()
    const { setWizardStep } = useWizardContext()
    const {
        loadingErrorType,
        loadingErrorMessage,
        loadingError,
        loadingErrorParsedData
    } = useAppSelector((state: { discovery: IDiscoveryState }) => {
        return state.discovery
    })
    
    
    const backToUploadHandler = () => setWizardStep(0)
    const getRowNumber = (path: string | undefined): string => {
        return !path ? '' : path.split('[')[1].split(']')[0]
    }
    let reformedError: TExcelRowError[] = []
    loadingError?.map((obj: ValidationError, index)=>{
        let { path, message } = obj
        let rowNumber = getRowNumber(path)
        let dupeIndex = reformedError.findIndex(error => error.rowNumber === rowNumber)
        if(dupeIndex >= 0){
            reformedError[dupeIndex] = {
                ...reformedError[dupeIndex],
                message: `${reformedError[dupeIndex].message}, ${message}`
            }
        }
        else {
            reformedError.push({
                rowNumber,
                message

            })
        }
    })
    const numberOfFailRecords = reformedError?.length ?? 0
    const numberOfAllRecords = loadingErrorParsedData?.length ?? 0

    return <Box height="100%" display="flex" flexDirection="column">
        <Box display="flex" justifyContent="start">
            <IconButton
                className={classes.iconButton}
                onClick={backToUploadHandler}
                edge="start"
                disableRipple={true} >
                <ArrowLeftSVG color="primary" />
                <Typography variant="button">Back</Typography>
            </IconButton>
        </Box>
        {loadingErrorType == UploadErrorEnum.UPLOAD_BATCHES_ERROR &&
            loadingErrorMessage &&
            loadingErrorMessage !== '' ?
            <ErrorMessageHeader
                header="Uploading Batch failed"
                content={`Batches uploading error please check with your admin. Error: ${loadingErrorMessage}`}
            />
            : <></>
        }
        {loadingErrorType == UploadErrorEnum.PARSED_ERROR &&
            loadingErrorMessage &&
            loadingErrorMessage !== ''
            ?
            <ErrorMessageHeader
                header="Excel parsing failed"
                content={`Excel parsing fail. Please check your file validity. Error: ${loadingErrorMessage} `}
            />
            : <></>
        }
        {loadingErrorType == UploadErrorEnum.VALIDATION_ERROR &&
            loadingErrorParsedData &&
            loadingErrorParsedData?.length > 0
            ?
            <>
                <ErrorMessageHeader
                    header="File Upload failed"
                    content={`${numberOfFailRecords} records out of ${numberOfAllRecords} failed entries. Please correct them and re-upload them later. `}
                />
                <Box display="flex" justifyContent="start">
                    <Typography variant="h4" >Failed records({numberOfFailRecords})</Typography>
                </Box>
                <Box className={classes.tableBox}>
                    <Grid container>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Row No.</TableCell>
                                    <TableCell>Error</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {reformedError?.map((obj, index) => {
                                    let { rowNumber, message } = obj
                                    
                                    return (
                                        <TableRow key={index}>
                                            <TableCell style={{ width: 100 }}>
                                                {rowNumber}
                                            </TableCell>
                                            <TableCell className={classes.errorMessage}>
                                                {message}
                                            </TableCell>
                                        </TableRow>
                                    )
                                })}
                            </TableBody>
                        </Table>
                    </Grid>

                </Box>
            </> : <></>}
    </Box>
}