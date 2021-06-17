import { IconButton, Theme, Typography } from "@material-ui/core";
import Box from "@material-ui/core/Box";
import { CloseSquareSVG } from "icons/CloseSquareSVG";
import React, { useState } from "react";
import { makeStylesWithAwesomeTheme } from "styles/theme";

const useStyles = makeStylesWithAwesomeTheme((theme: Theme) => ({
  errorMessageHeader: {
    backgroundColor: theme.palette.error.main,
    borderRadius: 4,
    width: "100%",
    display: "flex",
    marginTop: "34px",
    marginBottom: "40px",
    paddingTop: "24px",
    paddingLeft: "18px",
  },
  closeSquareIconButton: {
    color: theme.palette.error.contrastText,
    marginRight: "18px",
    width: "20px",
    height: "20px",
  },
  errorContent: {
    flexDirection: "column",
    marginBottom: "22px",
  }
}))

interface ErrorMessageHeaderProps {
  header: string
  content: string
}

export const ErrorMessageHeader = (props: ErrorMessageHeaderProps) => {
  const { header, content} = props
  const classes = useStyles()

  return (
    <Box className={classes.errorMessageHeader}>
      <CloseSquareSVG className={classes.closeSquareIconButton}/>
      <Box
        className={classes.errorContent}
      >
        <Typography variant="h6" >{header}</Typography>
        <Typography>{content}</Typography>
      </Box>

    </Box>
  );
}