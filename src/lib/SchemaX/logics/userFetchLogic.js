import { createLogic } from 'redux-logic'
import * as Types from '@lib/SchemaX/actions/ActionTypes'
import { userFetchFulfilled, userFetchRejected } from '@lib/SchemaX/actions/UserFetch'

const delay = 1 // 1s delay for interactive use of cancel/take latest
const userFetchLogic = createLogic({
  type: Types.USERS_FETCH,
  cancelType: Types.USERS_FETCH_CANCELLED,
  latest: true, // take latest only,

  processOptions: {
    dispatchReturn: true, // use returned promise and apply these types
    successType: userFetchFulfilled,
    failType: userFetchRejected
  },

  // use axios injected as httpClient from configureStore logic deps
  // we also have access to getState and action in the first argument
  // but they were not needed for this particular code
  async process ({ httpClient }) {
    // eslint-disable-next-line
    const list = await httpClient
      .get(`https://reqres.in/api/users?delay=${delay}`)
      .then(resp => resp.data.data) // use data property of payload
    return list
  }
})

export default userFetchLogic
