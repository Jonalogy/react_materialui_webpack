import React from "react"
import { Theme, Grid } from "@material-ui/core"
import { makeStylesWithAwesomeTheme } from "styles/theme"
import { LoginPageImageComponent } from "images/LoginPageImage"

const useStyles = makeStylesWithAwesomeTheme((theme: Theme) => ({
    root: { height: "100%" },
    item: { height: "100%" }
}))

export const PublicLayout: React.FC = props => {
    const classes = useStyles()

    return (
        <Grid container direction="row" spacing={0} className={classes.root} alignItems="stretch">
            <Grid item xs={6}>{props.children}</Grid>
            <Grid item xs={6}>
                <LoginPageImageComponent />
            </Grid>
        </Grid>
    )
}
