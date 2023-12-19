import { combineReducers } from 'redux'
import userReducer from './userReducer'
import pageReducer from './pageReducer'
import { rootReducer as appReducer } from '@lib/SchemaX/store/dataStore'
import initReducer from '@lib/SchemaX/reducers/initReducer'
import sourceReducer from '@lib/SchemaX/reducers/sourceReducer'
import errorReducer from '@lib/SchemaX/reducers/errorReducer'
import serviceInfoReducer from '@lib/SchemaX/reducers/serviceInfoReducer'

export default combineReducers({
  app: appReducer,
  page: pageReducer,
  user: userReducer,
  _init: initReducer,
  source: sourceReducer,
  error: errorReducer,
  serviceInfo: serviceInfoReducer
})
