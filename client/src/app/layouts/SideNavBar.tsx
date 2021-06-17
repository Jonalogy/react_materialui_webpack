import React from "react"
import { Drawer, IconButton, Theme, Toolbar } from "@material-ui/core"
import { useHistory } from "react-router-dom"
import { styleContants } from "styles/constants"
import { makeStylesWithAwesomeTheme } from 'styles/theme';
import { StarSVG } from "icons/StarSVG"
import { ActivitySVG } from "icons/ActivitySVG";
import { EditSquareSVG } from "icons/EditSVG";

const useSideNavBarStyles = makeStylesWithAwesomeTheme((theme: Theme) => {
    const toolbarSpacing = theme.spacing(10)
    return {
        drawer: {
            width: styleContants.drawerWidth,
            flexShrink: 0,
        },
        drawerPaper: {
            width: styleContants.drawerWidth,
            backgroundColor: theme.palette.primary.dark,
            color: 'white'
        },
        sideBarIcons: {
            color: 'white',
            display: "flex",
            flexDirection: "column"
        },
        toolbarSpacerToMatchTheOneInHeaderBar: {
            height: toolbarSpacing
        },
    }
})

interface ISideNav { }

export const SideNav = (props: ISideNav) => {
    const classes = useSideNavBarStyles()
    const history = useHistory()
    return (
        <Drawer
            className={classes.drawer}
            classes={{
                paper: classes.drawerPaper
            }}
            variant="permanent"
            anchor='left'
        >
            <Toolbar className={classes.toolbarSpacerToMatchTheOneInHeaderBar} />
            <IconButton className={classes.sideBarIcons} onClick={() => history.push("/dashboard")} >
                <ActivitySVG />
            </IconButton>
            <IconButton className={classes.sideBarIcons} onClick={() => history.push("/discovery")}>
                <StarSVG />
            </IconButton>
            <IconButton className={classes.sideBarIcons} onClick={() => history.push("/moderation")} >
                <EditSquareSVG htmlColor="white" />
                {/* <img src={EditIcon} style={{ color: "white" }} /> */}
            </IconButton>
        </Drawer >
    )
}
