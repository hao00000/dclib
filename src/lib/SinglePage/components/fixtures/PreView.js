import React from 'react'
import PropTypes from 'prop-types'
import renderHTML from 'react-render-html'

// TODO: Fix htmlString for urlDocumentation, fix errors and warnings on invalid HTML tags.
const PreView = ({ htmlString }) => {
  return (
    <div className='pre-view'>
      {
        htmlString
          ? <pre>{renderHTML(htmlString)}</pre>
          : <h4>Error: No data or wrong data type</h4>
      }
    </div>
  )
}

PreView.propTypes = {
  htmlString: PropTypes.any
}

export default PreView
