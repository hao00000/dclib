import Iframe from 'react-iframe'
import React from 'react'
import PropTypes from 'prop-types'

const IframePage = ({ pageLink, options }) => {
  return (
    <Iframe url={pageLink} {...options} />
  )
}

IframePage.propTypes = {
  pageLink: PropTypes.string,
  options: PropTypes.object
}

export default IframePage
