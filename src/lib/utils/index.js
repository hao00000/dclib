import React from 'react'
import Loadable from 'react-loadable'

export const DynamicImport = (LoaderComponent) => Loadable({
  loader: () => LoaderComponent,
  loading: () => (<div>Loading...</div>)
})

/**
 * @PERFORMS:
 *  Evaluate if the variable is an destructible object type, non-Array, not null, not undefined
 * @param {Any} val, the variable to be checked
 *
 * @return Boolean
 **/
export const isObject = (val) => !!val && val.constructor === Object

export const areObjectsEqual = (prevProps, nextProps) => JSON.stringify(prevProps) === JSON.stringify(nextProps)
