import React from 'react'
import PropTypes from 'prop-types'

const UserFetch = ({ users, fetchStatus, onFetch, userFetchCancel }) => (
  <div>
    <div>
      Note: response is artificially delayed to allow interactive cancelling
    </div>
    <div>Status: {fetchStatus}</div>
    <button onClick={onFetch}>Fetch users</button>
    <button onClick={userFetchCancel}>Cancel</button>
    <ul>
      {users && users.map(user => (
        <li key={user.id}>
          {user.first_name} {user.last_name}
        </li>
      ))}
    </ul>
  </div>
)

UserFetch.propTypes = {
  users: PropTypes.any,
  fetchStatus: PropTypes.any,
  onFetch: PropTypes.any,
  userFetchCancel: PropTypes.any
}

export default UserFetch
