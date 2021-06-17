import React from 'react'
import { Route, Switch, useRouteMatch } from 'react-router-dom'
import { DiscoveryDefault } from 'app/domains/discovery/Default';
import { UploadNewBatchFlow } from 'app/domains/discovery/UploadNewBatch'

export const Discovery: React.FC = props => {
    const { path } = useRouteMatch();

    return (
        <Switch>
            <Route exact path={path}>
                <DiscoveryDefault />
            </Route>
            <Route exact path={`${path}/upload`}>
                <UploadNewBatchFlow />
            </Route>
        </Switch>
    )
}
