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
interface IModerationBulkUpdateModeratorDialog {
  openRow: boolean,
  handleClose: () => void,
  updateBulk: (moderator: string) => void,
}
export const ModerationBulkUpdateModeratorDialog: React.FC<IModerationBulkUpdateModeratorDialog> = (props) => {
  const classes = useStyles()
  const { openRow, handleClose, updateBulk } = props
  const [moderator, setModerator] = useState<string>('')

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
      <Grid container>Update Moderator</Grid>
      <Grid>
        <TextField
          type="text"
          onChange={(event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
            setModerator(event.currentTarget.value?.trim())
          }}
        />
        <Button
          disabled={moderator.length == 0 ||moderator == ''}
          onClick={() => {
            updateBulk(moderator)
            handleClose()
          }}
        >
          Update moderator
        </Button>
      </Grid>
    </Dialog>
  )

}