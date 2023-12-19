import React from 'react'
import PropTypes from 'prop-types'

const UserInfo = ({
  changePage,
  user,
  currentTab,
  show,
  setTimeInterval,
  changeIntervalTime,
  userAction,
  handleClose
}) => {
  const fullName = user && (user.firstName || user.lastName)
    ? (
      <span>
        <li>First Name: {user.firstName}</li>
        <li className='divider' />
        <li>Last Name: {user.lastName}</li>
      </span>
    )
    : <span className='unknown'>UNKNOWN</span>

  const logOut = () => {
    localStorage.removeItem('intervalTime')
    changePage('/servicedebugger/logout')
  }

  const userContent = currentTab === 'userName'
    ? fullName : (
      <form onSubmit={setTimeInterval}>
        Status Refresh Interval (sec) :
        <input type='number' name='quantity' min='5' max='150' onChange={changeIntervalTime}
          className='set-interval-input'
          defaultValue={localStorage.getItem('intervalTime') / 1000}
          placeholder='Enter timeout here' />
      </form>
    )

  const logOutLinks = (
    <div className='user-logout'>
      <li className='user-info'>
        <a href='javascript:void(0)' className='dropdown-toggle' tabIndex='-1' data-toggle='dropdown'>
          <i className='fa fa-user-circle-o' aria-hidden='true' />
        </a>
        <ul className='dropdown-menu'>
          <li><a onClick={handleClose} href='javascript:void(0)'>UserInfo</a></li>
          <li className='divider' />
          <li><a onClick={logOut} href='javascript:void(0)'>Logout</a></li>
        </ul>
      </li>
    </div>
  )

  return (
    <div className='user-info-container'>
      {logOutLinks}
      { show && (
        <div className='modal' tabIndex='-1' role='dialog' aria-labelledby='exampleModalLabel' aria-hidden='true'>
          <div className='modal-dialog' role='document'>
            <div className='modal-content'>
              <div className='modal-header'>
                <span className='user-span'>
                  <a onClick={userAction} className={currentTab === 'userName' ? 'btn-sm btn-primary' : ''} name='userName' href='javascript:void(0)'>UserInfo</a>
                </span>
                <span className='preference-span'>
                  <a onClick={userAction} className={currentTab === 'Preference' ? 'btn-sm btn-primary' : ''} name='Preference' href='javascript:void(0)'>Preference</a>
                </span>
                <button type='button' className='close' data-dismiss='modal' onClick={handleClose} aria-label='Close'>
                  <span aria-hidden='true'>&times;</span>
                </button>
              </div>
              <div className='modal-body'>
                <ul >
                  {userContent}
                </ul>
              </div>
              <div className='modal-footer'>
                <button type='button' className='btn-sm btn-cancel btn-default' onClick={handleClose} data-dismiss='modal'>Cancel</button>
                <button type='button' onClick={setTimeInterval} className='btn-sm btn-save btn-default'>Save</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

UserInfo.propTypes = {
  changePage: PropTypes.func,
  user: PropTypes.any,
  currentTab: PropTypes.string,
  setTimeInterval: PropTypes.func,
  changeIntervalTime: PropTypes.func,
  userAction: PropTypes.func,
  handleClose: PropTypes.func,
  show: PropTypes.bool
}

export default UserInfo
