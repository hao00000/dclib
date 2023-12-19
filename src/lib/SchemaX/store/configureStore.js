import { createHashHistory } from 'history'
import { routerMiddleware } from 'react-router-redux'
import thunk from 'redux-thunk'
import rootReducer from '@lib/SchemaX/reducers'
import { applyMiddleware, compose, createStore } from 'redux'
import { logger } from 'redux-logger'
import { createLogicMiddleware } from 'redux-logic'
import logics from '@lib/SchemaX/logics'
import axios from 'axios'

const initialState = {}

export const history = createHashHistory()
const deps = { httpClient: axios }
const logicMiddleware = createLogicMiddleware(logics, deps)

const middleware = [thunk, logicMiddleware, routerMiddleware(history), logger]

const composeEnhancers =
  typeof window === 'object' &&
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
      // Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
    }) : compose

const store = createStore(
  rootReducer,
  initialState,
  composeEnhancers(applyMiddleware(...middleware))
)

export default store
