import React from "react"
import { hot } from "react-hot-loader";
import CssBaseline from '@material-ui/core/CssBaseline';
import { ThemeProvider } from "@material-ui/core";
import { Route, Switch } from "react-router-dom";
import { AwesomeTheme } from "styles/theme";
import { PublicLayout } from "app/layouts/PublicLayout";
import { PrivateRoutes, PublicRoutes } from "app/routing/routeConfig";
import { PrivateRoute, PublicRoute } from "app/routing/Routes";

const App: React.FC = () => {
    return (
        <ThemeProvider theme={AwesomeTheme}>
            <CssBaseline />
            <Switch>
                {
                    PrivateRoutes.map((route, idx) => (
                        <PrivateRoute {...route} key={`${idx}-${route.name}-authorised`} />
                    ))
                }
                {
                    PublicRoutes.map((route, idx) => (
                        <PublicRoute {...route} key={`${idx}-${route.name}-public`} />
                    ))
                }
                {/* No match route is not working */}
                <Route>
                    <PublicLayout>
                        {() => <h1>No Match</h1>}
                    </PublicLayout>
                </Route>

            </Switch>
        </ThemeProvider>
    );
}

export default hot(module)(App)
