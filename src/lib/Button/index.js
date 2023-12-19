import React from 'react'
import '../styles/index.scss'
import PropTypes from 'prop-types'

const Button = ({ text }) => <div className={'ui-section'}>
  <button className={'btn-olive'} style={{ 'height':'50px', 'width':'100px' }}>{text}</button>
</div>

Button.propTypes = {
  text: PropTypes.any
}

export { Button }
