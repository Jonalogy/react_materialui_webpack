import React from 'react'
import { Container, TextField, Typography } from '@material-ui/core'
import { makeStylesWithAwesomeTheme } from 'styles/theme'
import { ButtonPrimary } from "baseComponents/ButtonPrimary"
import AwesomizeSVG from "images/AwesomizeSVG.svg"
import { useProvideAuth } from 'app/auth/useAuth'

const useStyles = makeStylesWithAwesomeTheme((theme) => ({
    root: {
        backgroundColor: theme.palette.background.paper,
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: "column",
        justifyContent: 'center'
    },
    form: {
        display: 'flex',
        flexDirection: "column",
        justifyContent: 'center',
        alignItems: "center",
        marginTop: theme.spacing(11)
    },
    formInputs: {
        width: "50%",
        marginBottom: theme.spacing(4)
    },
    companyLogo: {
        textAlign: "center",
        marginBottom: theme.spacing(7),
    },
}))

export const Login: React.FC = () => {
    const classes = useStyles()
    const { signin } = useProvideAuth()

    const onSubmitToLogin = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        signin({
            email: "user01@email.com",
            password: "user01"
        })
    }

    return (
        <Container className={classes.root}>
            <div className={classes.companyLogo}>
                <img src={AwesomizeSVG} />
            </div>

            <Typography variant="h3" align="center">
                Media Reporting<br />made intuitive.
            </Typography>

            <Container>
                <form className={classes.form} onSubmit={onSubmitToLogin}>
                    <TextField
                        className={classes.formInputs}
                        id="login-email"
                        label="Email"
                        type="email"
                        variant="outlined"
                    />
                    <TextField
                        className={classes.formInputs}
                        id="login-password"
                        label="Password"
                        type="password"
                        variant="outlined"
                    />
                    <ButtonPrimary type="submit">LOGIN</ButtonPrimary>
                </form>
            </Container>
        </Container>
    )
}
