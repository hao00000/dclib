import * as Types from '@lib/SchemaX/actions/ActionTypes'
import get from 'lodash/get'
import { factoryEvaluator } from '@lib/SchemaX/utils'
import {
  getCurrentPageData,
  getNewPagesDictKey,
  getSectionPath,
  getUpdatePageData,
  getUpdatePageDataFetching
} from '@lib/SchemaX/actions/PageActions'

const initialState = {
  pageData: {},
  pagesDict: {},
  isPageDataFetching: true
}

export default function (state = initialState, action) {
  // When using the Factory to perform evaluation, it set out a newState.
  // Current pattern encourages the use of factoryEvaluator.
  // and for manual Redux action, the evaluators object can be used.
  const newState = factoryEvaluator([getCurrentPageData, getSectionPath, getUpdatePageData, getNewPagesDictKey, getUpdatePageDataFetching])(state, action)
  if (newState) { return newState }

  // custom, hand-code evaluation
  const evaluators = {
    [Types.SET_CURRENT_PAGE_PATH]: (state) => ({
      ...state,
      pagePath: action.payload
    })
  }

  return action.type && get(evaluators, action.type) ? evaluators[action.type](state, action) : state
}
