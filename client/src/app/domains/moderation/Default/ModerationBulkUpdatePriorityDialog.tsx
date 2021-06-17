import { Button, Dialog, Grid, IconButton, TextField } from "@material-ui/core"
import { CloseSVG } from "icons/CloseSVG"
import React, { ChangeEventHandler, useState } from "react"
import { ChangeEvent } from "react"
import { AwesomeTheme, makeStylesWithAwesomeTheme } from "styles/theme"

const useStyles = makeStylesWithAwesomeTheme((theme) => ({
  dialog: {
    minHeight: "50%",
    minWidth: "50%",
    padding: theme.spacing(5)
  },
  dialogTitle: {
    display: "flex",
    justifyContent: "space-between",
  },
  dialogContent: {
    padding: 0
  },
  cell: {
    height: theme.spacing(10),
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-around"
  },
  divider: {
    margin: `${theme.spacing(3)}px 0`
  },
  placementName: { color: theme.palette.primary.dark }
}))
interface IModerationBulkUpdatePriorityDialog {
  openRow: boolean,
  handleClose: () => void,
  updateBulk: (priority: number) => void,
}
export const ModerationBulkUpdatePriorityDialog: React.FC<IModerationBulkUpdatePriorityDialog> = (props) => {
  const classes = useStyles()
  const { openRow, handleClose, updateBulk } = props
  const [priority, setPriority] = useState<number>(1)
  const inputProps = {
    'max': 5,
    'min': 1,
  }
  return (
    <Dialog classes={{ paper: classes.dialog }}
      open={openRow}
      onClose={handleClose}
      disableEscapeKeyDown={true}
      disableBackdropClick={true}
    >
      <Grid item xs={1}>
        <IconButton onClick={handleClose} color="inherit">
          <CloseSVG htmlColor={AwesomeTheme.palette.grey[900]} />
        </IconButton>
      </Grid>
      <Grid container>Update Priority</Grid>
      <Grid>
        <TextField
          type="number"
          onChange={(event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
            setPriority(Number(event.currentTarget.value))
          }}
          inputProps={inputProps}
        />
        <Button
          disabled={priority > 5 || priority < 1}
          onClick={() => {
            updateBulk(priority)
            handleClose()
          }}
        >
          Update Priority
        </Button>
      </Grid>
    </Dialog>
  )

}