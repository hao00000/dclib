import React from 'react'
import { ToastContainer } from 'react-toastify'
import PropTypes from 'prop-types'
import { UncontrolledAlert } from 'reactstrap'
import renderHTML from 'react-render-html'
import 'react-toastify/dist/ReactToastify.css'

const Notification = ({ notificationType, error }) => {
  if (notificationType === 'inline' && error) {
    return (
      <UncontrolledAlert color='danger'>{renderHTML(error)}</UncontrolledAlert>
    )
  } else {
    return (
      <ToastContainer />
    )
  }
}

Notification.propTypes = {
  notificationType: PropTypes.string,
  error: PropTypes.string
}

export default Notification
