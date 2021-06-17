import React from 'react'
import { useRouteMatch, Route, Switch } from 'react-router-dom'
import { ModerationDefault } from './Default'

export const Moderation: React.FC = props => {
    const { path } = useRouteMatch();

    return (
        <Switch>
            <Route exact path={path}>
                <ModerationDefault />
            </Route>
        </Switch>
    )
}
