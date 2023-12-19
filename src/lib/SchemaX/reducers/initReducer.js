import * as Types from '@lib/SchemaX/actions/ActionTypes'
import { factoryEvaluator } from '@lib/SchemaX/utils'
import get from 'lodash/get'
import { updateStateWithPageSection } from '@lib/SchemaX/actions/AppConfigActions'

const initialState = {
  provider: {},
  fullAppConfig: {}
}

export default function (state = initialState, action) {
  const newState = factoryEvaluator([updateStateWithPageSection])(state, action)
  if (newState) { return newState }

  // custom, hand-code evaluation
  const evaluators = {
    [Types.SET_APP_PROVIDER]: (state) => ({
      ...state,
      provider: action.payload
    }),
    [Types.SET_FULL_APP_CONFIG]: (state) => ({
      ...state,
      fullAppConfig: action.payload
    })
  }

  return action.type && get(evaluators, action.type) ? evaluators[action.type](state, action) : state
}
