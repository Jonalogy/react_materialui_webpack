import React, { useEffect } from 'react'
import { UploadButton } from 'baseComponents/UploadButton';
import { useAppDispatch, useAppSelector } from 'hooks';
import { parseAndValidateExcelThunk, selectBatchName, setLoadingState, setNewUploadedBatch } from 'app/domains/discovery/discoverySlice'
import { IconButton, Theme, Typography } from '@material-ui/core';
import { DeleteSVG } from 'icons/DeleteSVG';
import { makeStylesWithAwesomeTheme } from 'styles/theme';
import { useWizardContext } from 'app/layouts/WizardFlows';
import { PayloadAction } from '@reduxjs/toolkit';

const useReadFile = (file: File | null) => {
    const dispatch = useAppDispatch()
    const { setWizardStep } = useWizardContext()
    useEffect(() => {
        if (!file) {
            dispatch(setNewUploadedBatch(null))
        } else {
            console.log("file changed")
            const Reader = new FileReader()

            Reader.readAsArrayBuffer(file!)
            Reader.onloadstart = () => dispatch(setLoadingState(true))
            Reader.onloadend = () => dispatch(setLoadingState(false))
            Reader.onload = async (e) => {
                if (e.target?.result instanceof ArrayBuffer) {
                    var binaryData = new Uint8Array(e.target.result);
                    let result:PayloadAction<any,any,any> = await dispatch(parseAndValidateExcelThunk({
                        batchName: file.name,
                        buffer: binaryData,
                        priority: "5", 
                        sourceType: "survey", // Temporily defaulting to 'survey' for now
                    }))
                    
                    if(result.payload?.loadingError?.length >0){
                        setWizardStep(2)
                    }
                    return result
                }

                throw new Error("FileReader failed to read file")
            };
        }
    }, [file?.name])
}

const useStyles = makeStylesWithAwesomeTheme((theme: Theme) => ({
    root: {
        marginBottom: theme.spacing(5),
    }
}))

export const SelectFileControls: React.FC<{}> = () => {
    const classes = useStyles()
    const [file, setFile] = React.useState<File | null>(null);
    useReadFile(file)

    const batchName = useAppSelector(selectBatchName)
    const uploadHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files
        if (files?.length) { setFile(files[0]) }
    }
    const deleteFileHandler = () => {
        setFile(null)

        const btn = document.getElementById("upload-button") as HTMLInputElement | null
        if (btn) {
            btn.value = ""
            setFile(null)
        }
    }

    return (
        <div className={classes.root}>
            <UploadButton
                buttonLabel="Choose File"
                onChange={uploadHandler}
                accept=".xlsx"
            />
            {
                !!batchName && <FileBoard {...{ deleteFileHandler, batchName }} />
            }

        </div>
    )
}

const FileBoard: React.FC<{ batchName: string, deleteFileHandler: () => any }> = props => {
    return (
        <>
            <div>
                <Typography variant="subtitle1" color="primary" component="span">{props.batchName}</Typography>
                <IconButton onClick={props.deleteFileHandler} color="primary">
                    <DeleteSVG />
                </IconButton>
            </div>
        </>
    )
}
