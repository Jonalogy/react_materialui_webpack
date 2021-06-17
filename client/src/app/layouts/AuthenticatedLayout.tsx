import React from "react"
import { Toolbar, Theme } from "@material-ui/core"
import { HeaderBar } from "app/layouts/HeaderBar"
import { SideNav } from "app/layouts/SideNavBar"
import { makeStylesWithAwesomeTheme } from "styles/theme"
import { useAppSelector } from "hooks"
import { isEmpty } from "react-redux-firebase"
import { selectFirebaseAuth } from "firebase/slice"

const useStyles = makeStylesWithAwesomeTheme((theme: Theme) => {
    const toolbarSpacing = theme.spacing(10)
    const contentFrameTopMargin = theme.spacing(3)

    return {
        root: {
            display: 'flex',
            height: "100%",
            padding: 0
        },
        toolbarSpacerToMatchTheOneInHeaderBar: {
            height: toolbarSpacing
        },
        contentFrame: {
            flexGrow: 1,
            padding: `0 ${contentFrameTopMargin}px`,
            height: `calc(100% - ${toolbarSpacing}px - ${contentFrameTopMargin}px)`
        },
        content: {
            marginTop: theme.spacing(3),
            height: "100%"
        }
    }
})

export const AuthenticatedLayout: React.FC = props => {
    const classes = useStyles()
    const auth = useAppSelector(selectFirebaseAuth)

    return isEmpty(auth) ? null : (
        <div className={classes.root}>
            <SideNav />
            <HeaderBar />
            <div className={classes.contentFrame}>
                <Toolbar className={classes.toolbarSpacerToMatchTheOneInHeaderBar} />
                <div className={classes.content}>
                    {props.children}
                </div>
            </div>
        </div>
    )
}
