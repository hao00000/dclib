import React from 'react'
import { Switch, Route } from 'react-router-dom'
import ContentBody from '@lib/SchemaX/containers/content/contentBody'

const Routes = () => (
  <main>
    <Switch>
      <Route exact path='/*' component={(routerContext) => <ContentBody routerContext={routerContext} />} />
    </Switch>
  </main>
)

Routes.propTypes = {}

export default Routes
