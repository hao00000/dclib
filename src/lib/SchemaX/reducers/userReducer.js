import * as Types from '../actions/ActionTypes'
const initialState = {
  isFetching: false,
  error: undefined,
  userList: undefined,
  user: {}
}

export default function (state = initialState, action) {
  switch (action.type) {
    case 'FETCH_USERS_REQUEST':
      return {
        ...state,
        isFetching: true,
        error: undefined
      }

    case 'FETCH_USERS_SUCCESS':
      return {
        ...state,
        isFetching: false,
        userList: action.payload
      }

    case 'FETCH_USERS_FAILURE':
      return {
        ...state,
        isFetching: false,
        error: action.error
      }

    case Types.USER_FETCH_FULFILLED:
      return {
        ...state,
        user: action.payload
      }
    default:
      return state
  }
}
