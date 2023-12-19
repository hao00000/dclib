import React from 'react'
import PropTypes from 'prop-types'

const SectionFooter = ({ data, handleClick, sectionExpand }) => {
  return (
    <div className='section-footer'>
      {data && <p className='card-footer-content'>{data}</p>}
      <div className='card-footer-extend' onClick={handleClick}>
        <div>{ sectionExpand ? 'Show less content' : 'Show all content'}</div>
      </div>
    </div>
  )
}

SectionFooter.propTypes = {
  data: PropTypes.any,
  handleClick: PropTypes.func,
  sectionExpand: PropTypes.bool
}

export default SectionFooter
