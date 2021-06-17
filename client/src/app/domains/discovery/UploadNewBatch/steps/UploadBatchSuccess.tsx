import React from "react"
import { useHistory } from "react-router-dom"
import { Box, Container, Typography } from "@material-ui/core"
import { ButtonPrimary } from "baseComponents/ButtonPrimary"
import { AwesomeTheme } from "styles/theme"
import { TickSquareSVG } from "icons/TickSquareSVG"


export const UploadBatchSuccess: React.FC = () => {
    const history = useHistory()
    const backToMainHandler = () => history.push("/discovery")

    return <Box height="100%" display="flex" flexDirection="column" justifyContent="center">
        <Box display="flex" justifyContent="center">
            <TickSquareSVG
                width={`${AwesomeTheme.spacing(8)}px`}
                height={`${AwesomeTheme.spacing(8)}px`}
                color="primary" />
        </Box>
        <Box marginTop={`${AwesomeTheme.spacing(5)}px`} display="flex" justifyContent="center">
            <Typography variant="h4" color="primary">Upload Completed</Typography>
        </Box>
        <Box marginTop={`${AwesomeTheme.spacing(8)}px`} display="flex" justifyContent="center">
            <ButtonPrimary
                onClick={backToMainHandler}
                size="large">
                View Batch
            </ButtonPrimary>
        </Box>
    </Box>
}
