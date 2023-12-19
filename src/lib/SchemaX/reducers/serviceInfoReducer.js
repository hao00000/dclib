import { factoryEvaluator } from '@lib/SchemaX/utils'
import get from 'lodash/get'
import {
  getServiceInfoDataStore,
  getServiceInfoDataField
} from '@lib/SchemaX/actions/SourceActions'

const initialState = {}

export default function (state = initialState, action) {
  const newState = factoryEvaluator([getServiceInfoDataStore, getServiceInfoDataField])(state, action)
  if (newState) { return newState }

  // custom, hand-code evaluation
  const evaluators = {}
  return action.type && get(evaluators, action.type) ? evaluators[action.type](state, action) : state
}
