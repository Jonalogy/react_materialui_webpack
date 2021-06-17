import React, { MouseEventHandler } from 'react'
import { Button, Theme } from "@material-ui/core"
import { makeStylesWithAwesomeTheme } from 'styles/theme'

const useStyles = makeStylesWithAwesomeTheme((theme: Theme) => {
    return {
        primaryButton: {
            height: "36px",
            minWidth: "102px"
        }
    }
})

interface IButton {
    type?: React.ComponentProps<typeof Button>["type"];
    size?: React.ComponentProps<typeof Button>["size"];
    onClick?: MouseEventHandler;
}

export const ButtonPrimary: React.FC<IButton> = props => {
    if (typeof props.children !== "string") {
        throw Error("Button labels can only be string!")
    }
    const classes = useStyles()
    
    return (
        <Button
            className={classes.primaryButton}
            onClick={props.onClick}
            variant="contained"
            color="primary"
            type={props.type}
            size={props.size}
        >
            {props.children}
        </Button>
    )
}
