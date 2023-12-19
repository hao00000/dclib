import { factoryEvaluator } from '@lib/SchemaX/utils'
import get from 'lodash/get'
import {
  getSourceDataStore,
  getSourceDataField,
  getFormFieldData,
  getQueryContext,
  getInputFormData,
  getTestDataWithCustomPath,
  getTestDataWithFixedPath,
  getAlertModal
} from '@lib/SchemaX/actions/SourceActions'
import * as Types from '@lib/SchemaX/actions/ActionTypes'

const initialState = {
  isAppDataFetching: true
}

export default function (state = initialState, action) {
  const newState = factoryEvaluator([getSourceDataStore, getInputFormData, getSourceDataField, getFormFieldData, getQueryContext, getTestDataWithCustomPath, getTestDataWithFixedPath, getAlertModal])(state, action)
  if (newState) { return newState }

  const evaluators = {
    [Types.ROUTER_LOCATION_CHANGE]: (state) => ({
      ...state,
      route: action.payload
    })
  }

  return action.type && get(evaluators, action.type) ? evaluators[action.type](state, action) : state
}
