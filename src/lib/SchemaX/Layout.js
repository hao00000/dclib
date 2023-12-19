import React from 'react'
import SchemaView from '@lib/SchemaX/containers/schemaView'
import PropTypes from 'prop-types'
import { isObject } from '@lib/utils'
import get from 'lodash/get'
// import UserFetch from '@lib/SchemaX/containers/userFetch'
import DataTestSuite from '@lib/Button/DataTestSuite'

import 'bootstrap/dist/css/bootstrap.min.css'
import 'font-awesome/css/font-awesome.min.css'
import { urlBuilder } from '@lib/SchemaX/utils'

const Layout = (props) => {
  const { appConfig } = props
  const appConfigURI = isObject(appConfig) ? '' : appConfig
  // default to an empty serverURI if not defined/overwritten in provider for testing on DCLib
  let serverURI = get(props.provider, 'serverURI', '')

  if (serverURI === 'urlBuilder') {
    serverURI = urlBuilder(appConfigURI)
  }

  const provider = { ...props.provider, serverURI, appConfigURI }
  return (
    <div className={'schemaX'}>
      {/* <UserFetch /> */}
      <SchemaView appConfig={appConfig} provider={provider} />
      <DataTestSuite />
    </div>
  )
}

Layout.propTypes = {
  appConfig: PropTypes.any,
  provider: PropTypes.any
}

export default Layout
