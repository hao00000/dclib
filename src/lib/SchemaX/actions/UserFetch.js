import * as Types from './ActionTypes'
import {
  ajaxRequestWithAxios
} from '@lib/SchemaX/utils'

export const userFetch = (payload) => ({
  type: Types.USERS_FETCH,
  payload
})

export const userFetchCancel = () => ({ type: Types.USERS_FETCH_CANCELLED })
export const userFetchFulfilled = (payload) => ({ type: Types.USER_FETCH_FULFILLED, payload })
export const userFetchRejected = (payload) => ({ type: Types.USERS_FETCH_REJECTED, payload, error: true })

export const fetchUserDetails = () => async (dispatch) => {
  const preOpCallback = () => {
    return {
      options: {
        url: '/servicedebugger/user/info'
      }
    }
  }

  await ajaxRequestWithAxios(preOpCallback, response => {
    dispatch({
      type: Types.USER_FETCH_FULFILLED,
      payload: response.data
    })
  }, (err) => {
    console.log('err', err)
  })
}
