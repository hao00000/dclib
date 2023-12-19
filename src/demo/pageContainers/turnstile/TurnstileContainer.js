// this is a sample component for PageContainer loading use case
// PageContainer can be hooked with an actual Redux container too.
import React from 'react'
// import PropTypes from 'prop-types'

const TurnstileContainer = (props) => {
  const parentState = props['data-state'] // eslint-disable-line

  return (
    <div className='form-view'>
      <p>
        This is a sample page for CUSTOM_PAGE type.
      </p>
      <p>
        This page is loaded through PageContainer setting, see demo/index.js and appConfig.json
      </p>
    </div>
  )
}

export default { TurnstileContainer }
