import React, { Fragment } from 'react'
import get from 'lodash/get'
import { utils } from '@lib'
const { timestampToHours } = utils

// Mbeans Data Handler
const mbeansDataHandler = (result, state) => {
  const mbeans = get(result, 'mbeans', {})
  return { mbeanArguments: mbeans || [] }
}

// PS Data Handler
const psDataHandler = (result, state) => {
  const { uptime } = result
  result.uptime = timestampToHours(uptime)
  if (result.hasOwnProperty('mainBundle')) {
    const { mainBundle } = result
    result.path = mainBundle
  } else {
    const args = result.arguments
    const position = args.findIndex(el => el.includes('DWOLocalRootDirectory'))
    const mainBundle = args[position].replace(/-DWOLocalRootDirectory=/, '')
    result.path = mainBundle
  }
  return result
}

// Configuration Context Data Handler
const configDataHandler = (response) => {
  const orderArr = ['disableRemoteConfiguration', 'port', 'host', 'user', 'webFramework', 'container', 'app', 'format', 'channel', 'language', 'region', 'segment', 'dc', 'podType', 'revmode', 'layer', 'toolkitCompatibilityVersion', 'tlsSupportVersion', 'masterApp', 'old-app-group', 'partition']
  const requiredResponse = orderArr.map(x => {
    return {
      name: x,
      status: get(response.context, x, '')
    }
  })
  return requiredResponse
}

const appInfoTitleRenderFunction = () => {
  return (
    <Fragment>
      <h3> Configuration Context </h3>
      <span className='subtitle-text'>(In priority order, most specific to least)</span>
    </Fragment>
  )
}

export default {
  mbeansDataHandler,
  psDataHandler,
  configDataHandler,
  appInfoTitleRenderFunction
}
