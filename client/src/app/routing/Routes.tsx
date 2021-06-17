import React from "react";
import { Redirect, Route } from "react-router-dom";
import { TRoute } from "app/routing/routeConfig";
import { selectFirebaseAuth } from "firebase/slice";
import { useAppSelector } from "hooks";

export const PublicRoute: React.FC<TRoute> = (props) => {
    const { uid, isLoaded, isEmpty } = useAppSelector(selectFirebaseAuth)
    const isAuthenticated = isLoaded && !isEmpty && uid

    return (
        <Route
            exact
            path={props.path}
        >
            {
                isAuthenticated ?
                    <Redirect to="/dashboard" /> :
                    <props.layout>
                        <props.component />
                    </props.layout>
            }
        </Route>
    );
}
export const PrivateRoute: React.FC<TRoute> = (props) => {
    const { uid, isLoaded, isEmpty } = useAppSelector(selectFirebaseAuth)
    const notAuthenticated = isEmpty || !isLoaded || !uid

    return (
        <Route
            path={props.path}
            render={() => notAuthenticated ?
                <Redirect to="/" /> :
                <props.layout>
                    <props.component />
                </props.layout>}
        />
    );
}
