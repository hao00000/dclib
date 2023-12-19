import { factoryEvaluator } from '@lib/SchemaX/utils'
import get from 'lodash/get'
import {
  getErrorDataStore,
  getErrorDataField
} from '@lib/SchemaX/actions/SourceActions'
// import * as Types from '@lib/SchemaX/actions/ActionTypes'

const initialState = {}

export default function (state = initialState, action) {
  const newState = factoryEvaluator([getErrorDataStore, getErrorDataField])(state, action)
  if (newState) { return newState }

  const evaluators = {}

  return action.type && get(evaluators, action.type) ? evaluators[action.type](state, action) : state
}
