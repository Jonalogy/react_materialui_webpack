import React from "react"
import { Dialog, DialogContent, Typography, Grid, Divider, TypographyProps, IconButton } from "@material-ui/core"
import { TRowData } from "baseComponents/AwesomeTable"
import { PriorityBadge } from "baseComponents/PriorityBadge"
import { AwesomeTheme, makeStylesWithAwesomeTheme } from "styles/theme"
import { TBatch } from "app/domains/discovery/types"
import { CloseSVG } from "icons/CloseSVG"

const useStyles = makeStylesWithAwesomeTheme((theme) => ({
    dialog: {
        minHeight: "min-content",
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
    batchName: { color: theme.palette.primary.dark }
}))

type TDetails = Omit<TBatch, "batchID" | "priority">
type TDetailLabels = { [attr in keyof TDetails]: string }

const detailLabels: TDetailLabels = {
    batchName: "Batch Name",
    assignedRatio: "% Assigned",
    moderatedRatio: "% Moderated",
    qcRatio: "% QC",
    placements: "# Placements",
    new: "# New",
    approved: "# Approved",
    rejected: "# Rejected",
    dupes: "# Dupes",
    duplicates: "# Dupes Duplicated",
    sourceType: "Source Type",
    dateUploaded: "Date Uploaded",
    contributer: "Contributer"
}

interface IDiscoveryDetailsDialog {
    openRow: number,
    handleClose: () => void,
    rowData: TRowData | TBatch
}

export const DiscoveryDetailsDialog: React.FC<IDiscoveryDetailsDialog> = (props) => {
    const classes = useStyles()
    const { openRow, handleClose, rowData } = props

    return (
        <Dialog classes={{ paper: classes.dialog }}
            open={Number.isInteger(openRow)}
            onClose={handleClose}
            disableEscapeKeyDown={true}
            disableBackdropClick={true}>

            <Grid container>
                <Grid item xs={11}>
                    <DialogCell {...{ detailLabels, attr: "batchName" }}>
                        <Typography variant="h4" classes={{ root: classes.batchName }}>
                            {rowData.batchName}
                        </Typography>
                    </DialogCell>
                </Grid>
                <Grid item xs={1}>
                    <IconButton onClick={handleClose} color="inherit">
                        <CloseSVG htmlColor={AwesomeTheme.palette.grey[900]} />
                    </IconButton>
                </Grid>
            </Grid>

            <DialogContent className={classes.dialogContent}>
                <PriorityBadge priority={rowData.priority} />
                <Grid container>
                    <Grid item xs={4}>
                        <DialogCell {...{ attr: "assignedRatio", detailLabels }}>
                            <Typography variant="h5" color="inherit">{`${toStringPercentage(rowData.assignedRatio | 0)}%`}</Typography>
                        </DialogCell>
                    </Grid>
                    <Grid item xs={4}>
                        <DialogCell {...{ attr: "moderatedRatio", detailLabels }}>
                            <Typography variant="h5" color="inherit">{`${toStringPercentage(rowData.moderatedRatio | 0)}%`}</Typography>
                        </DialogCell>
                    </Grid>
                    <Grid item xs={4}>
                        <DialogCell {...{ attr: "qcRatio", detailLabels }}>
                            <Typography variant="h5" color="inherit">{`${toStringPercentage(rowData.qcRatio | 0)}%`}</Typography>
                        </DialogCell>
                    </Grid>
                </Grid>

                <Divider className={classes.divider} />

                <Grid container>
                    <Grid item xs={4}>
                        <DialogCell {...{ rowData, attr: "placements", detailLabels }} />
                    </Grid>
                    <Grid item xs={4}>
                        <DialogCell {...{ rowData, attr: "new", detailLabels }} />
                    </Grid>
                    <Grid item xs={4}>
                        <DialogCell {...{ rowData, attr: "approved", detailLabels }} />
                    </Grid>
                </Grid>
                <Grid container>
                    <Grid item xs={4}>
                        <DialogCell {...{ rowData, attr: "rejected", detailLabels }} />
                    </Grid>
                    <Grid item xs={4}>
                        <DialogCell {...{ rowData, attr: "dupes", detailLabels }} />
                    </Grid>
                    <Grid item xs={4}>
                        <DialogCell {...{ rowData, attr: "duplicates", detailLabels }} />
                    </Grid>
                </Grid>
                <Grid container>
                    <Grid item xs={4}>
                        <DialogCell {...{ rowData, attr: "sourceType", detailLabels }} />
                    </Grid>
                    <Grid item xs={4}>
                        <DialogCell {...{ rowData, attr: "dateUploaded", detailLabels }} />
                    </Grid>
                    <Grid item xs={4}>
                        <DialogCell {...{ rowData, attr: "contributer", detailLabels }} />
                    </Grid>
                </Grid>
            </DialogContent>
        </Dialog>
    )
}

interface IDialogCellProps {
    detailLabels: TDetailLabels
    rowData?: TRowData,
    attr: keyof TDetails,
    variant?: TypographyProps["variant"],
    color?: TypographyProps["color"]
}
const DialogCell: React.FC<IDialogCellProps> = props => {
    const { rowData, attr, detailLabels } = props
    const classes = useStyles()
    return (
        <div className={classes.cell}>
            <Typography variant="subtitle2" color="inherit">{detailLabels[attr]}</Typography>
            {
                props.children ?
                    props.children :
                    <Typography
                        variant={props.variant || "body2"}
                        color={props.color || "inherit"}>
                        {rowData?.[attr]}
                    </Typography>
            }
        </div>
    )
}


function toStringPercentage(arg: number | string) {
    let num = Number(arg)
    if (isNaN(num)) {
        throw new Error(`${toStringPercentage.name}: input must be numeric, but received ${arg}`)
    }

    return num
}
