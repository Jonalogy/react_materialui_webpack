import React from "react"
import { AppBar, Toolbar, Typography, Theme } from "@material-ui/core"
import { makeStylesWithAwesomeTheme } from "styles/theme"
import { styleContants } from "styles/constants"
import { ButtonPrimary } from "baseComponents/ButtonPrimary"
import { useFirebase } from "react-redux-firebase"
import { useHistory } from "react-router-dom"
import AwesomizeSVG from "images/AwesomizeSVG.svg"
import { useAuthContext } from "app/auth/useAuth"

const useAppBarStyles = makeStylesWithAwesomeTheme((theme: Theme) => {
    return {
        root: {
            width: `calc(100% - ${styleContants.drawerWidth}px)`,
            marginLeft: '80px',
            backgroundColor: theme.palette.background.paper,
            color: theme.palette.text.primary,
            height: theme.spacing(10)
        },
        toolbar: {
            height: "inherit",
            display: "flex",
            justifyContent: "space-between"
        }

    }
})

export const HeaderBar = () => {
    const classes = useAppBarStyles()
    const { signout } = useAuthContext()

    const logoutHandler = () => {
        signout(() => console.log("@Logout successful!"))
    }
    return (
        <AppBar position="fixed" className={classes.root} >
            <Toolbar className={classes.toolbar}>
                <img src={AwesomizeSVG} />
                <ButtonPrimary onClick={logoutHandler}>logout</ButtonPrimary>
            </Toolbar>
        </AppBar>
    )
}
