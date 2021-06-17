import React from 'react'
import { Box, Theme, Typography } from "@material-ui/core"
import { AwesomeTheme, makeStylesWithAwesomeTheme } from "styles/theme"

export const PriorityBadge: React.FC<{ priority: number }> = (props) => {
    return (
        <Box component="div"
            height={`${AwesomeTheme.spacing(5)}px`}
            width={`${AwesomeTheme.spacing(5)}px`}
            borderRadius={`${AwesomeTheme.spacing(5) / 2}px`}
            display="flex"
            justifyContent="center"
            alignItems="center"
            color="white"
            bgcolor={`${AwesomeTheme.palette.primary.main}`} >
            <Typography variant="body2" color="inherit">{props.priority}</Typography>
        </Box>
    )
}
