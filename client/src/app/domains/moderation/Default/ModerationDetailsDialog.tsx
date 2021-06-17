import React from "react"
import { Dialog, DialogContent, Typography, Grid, Divider, TypographyProps, Link, IconButton } from "@material-ui/core"
import { TRowData } from "baseComponents/AwesomeTable"
import { PriorityBadge } from "baseComponents/PriorityBadge"
import { AwesomeTheme, makeStylesWithAwesomeTheme } from "styles/theme"
import { TPlacement } from "app/domains/moderation/types"
import { CloseSVG } from "icons/CloseSVG"

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

type TDetails = Omit<TPlacement, "batchID" | "placementID">
type TDetailLabels = { [attr in keyof TDetails]: string }

const detailLabels: TDetailLabels = {
    priority: "Priority",
    moderator: "Moderator",
    status: "Status",
    source: "Source",
    inventoryType: "Inventory Type",
    sourceID: "ID",
    language: "Langage",
    origin: "Origin",
    url: "URL",
    name: "Placement Name"
}

interface IModerationDetailsDialog {
    openRow: number,
    handleClose: () => void,
    rowData: TRowData | TPlacement
}

export const ModerationDetailsDialog: React.FC<IModerationDetailsDialog> = (props) => {
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
                    <Cell {...{ detailLabels, attr: "name" }}>
                        <Typography variant="h4" classes={{ root: classes.placementName }}>
                            {rowData.name}
                        </Typography>
                    </Cell>
                </Grid>
                <Grid item xs={1}>
                    <IconButton onClick={handleClose} color="inherit">
                        <CloseSVG htmlColor={AwesomeTheme.palette.grey[900]} />
                    </IconButton>
                </Grid>
            </Grid>
            <Grid container>
                <Grid item xs={12}>
                    <Cell {...{ detailLabels, attr: "priority" }}>
                        <PriorityBadge priority={rowData.priority} />
                    </Cell>
                </Grid>
            </Grid>

            <DialogContent className={classes.dialogContent}>
                <Grid container>
                    <Grid item xs={4}>
                        <Cell {...{ rowData, attr: "moderator", detailLabels }} />
                    </Grid>
                    <Grid item xs={8}>
                        <Cell {...{ rowData, attr: "status", detailLabels }} />
                    </Grid>
                </Grid>
                <Divider className={classes.divider} />
                <Grid container>
                    <Grid item xs={4}>
                        <Cell {...{ rowData, attr: "source", detailLabels }} />
                    </Grid>
                    <Grid item xs={4}>
                        <Cell {...{ rowData, attr: "inventoryType", detailLabels }} />
                    </Grid>
                    <Grid item xs={4}>
                        <Cell {...{ rowData, attr: "sourceID", detailLabels }} />
                    </Grid>
                </Grid>
                <Grid container>
                    <Grid item xs={4}>
                        <Cell {...{ rowData, attr: "language", detailLabels }} />
                    </Grid>
                    <Grid item xs={8}>
                        <Cell {...{ rowData, attr: "origin", detailLabels }} />
                    </Grid>
                </Grid>
                <Grid container>
                    <Grid item xs={4}>
                        <Cell {...{ attr: "url", detailLabels }}>
                            <Link href={rowData["url"]} target="_blank" rel="noreferrer">{rowData["url"]}</Link>
                        </Cell>
                    </Grid>
                </Grid>
            </DialogContent>
        </Dialog>
    )
}

interface ICellProps {
    detailLabels: TDetailLabels
    rowData?: TRowData,
    attr: keyof TDetails,
    variant?: TypographyProps["variant"],
    color?: TypographyProps["color"]
}
const Cell: React.FC<ICellProps> = props => {
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
