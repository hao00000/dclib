import React from 'react'
import { ConnectedRouter } from 'react-router-redux'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import store, { history } from './store/configureStore'
import Layout from './Layout'
// load application.properties
import applicationProperties from '../../../package.json'

console.log('DCLib library version', applicationProperties.version)

const AOSDebugApplication = (props) => (
  <BrowserRouter>
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <Layout {...props} />
      </ConnectedRouter>
    </Provider>
  </BrowserRouter>
)

AOSDebugApplication.propTypes = {}

export { AOSDebugApplication }
