import React from 'react'
import PropTypes from 'prop-types'

export const Collapsible = ({ toggle, show, children, label, labelClass }) => {
  return (
    <div>
      <div className={`menu-title ${labelClass}`} onClick={toggle}>{label}</div>
      <div className={show ? 'd-block' : 'd-none'}>
        {children}
      </div>
    </div>
  )
}

Collapsible.propTypes = {
  show: PropTypes.bool,
  children: PropTypes.any,
  label: PropTypes.any,
  labelClass: PropTypes.string,
  toggle: PropTypes.func
}

Collapsible.defaultProps = {
  show: false,
  label: 'Show/Hide',
  labelClass: ''
}

export default Collapsible
