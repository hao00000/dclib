import React from 'react'
import ClipLoader from 'react-spinners/ClipLoader'
import PropTypes from 'prop-types'

const LoaderFactory = ({ loaderPosition = 'section-loader', closeLoader, showLoader }) => {
  return (
    <div className={`${loaderPosition} ${showLoader ? 'show-loader' : 'hide-loader'}`} >
      <ClipLoader
        sizeUnit={'px'}
        size={60}
        color={'#123abc'}
        loading
        Loader={'MoonLoader'}
      />
      <span className={'loader-close-icon'} onClick={closeLoader} >{'x'}</span>
    </div>
  )
}

LoaderFactory.propTypes = {
  loaderPosition: PropTypes.string,
  closeLoader: PropTypes.func,
  showLoader: PropTypes.bool
}

export default LoaderFactory
