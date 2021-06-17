import React, { ChangeEventHandler } from 'react'
import { Button } from '@material-ui/core';
import { makeStylesWithAwesomeTheme } from 'styles/theme';

const useStyles = makeStylesWithAwesomeTheme({
  hiddenInput: { display: "none" },
  primaryButton: {
    height: "36px",
    minWidth: "102px"
  }
})


interface IUploadButton {
  onChange: ChangeEventHandler
  accept: string;
  buttonLabel?: string;
}

export const UploadButton: React.FunctionComponent<IUploadButton> = props => {
  const classes = useStyles()
  return (
    <>
      <input
        id="upload-button"
        accept={props.accept}
        className={classes.hiddenInput}
        onChange={props.onChange}
        type="file"
      />
      <label htmlFor="upload-button">
        {/* Can't use ButtonPrimary here because base component has to be <span /> */}
        <Button className={classes.primaryButton} variant="contained" color="primary" component="span">
          {props.buttonLabel || "Upload"}
        </Button>
      </label>
    </>
  )
}
