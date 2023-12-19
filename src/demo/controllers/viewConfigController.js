import React from 'react'
import { utils } from '@lib'
const { ajaxRequestWithAxios, ajaxOptionsBuilder } = utils

const onConfigResponseLoaded = response => {
  return response
}

const onConfigContextResponseLoaded = response => {
  return response
}

const onclickFilename = async (filename, appContextQueryParam, e) => {
  const { port, host, serviceName } = appContextQueryParam
  let res = {}
  e.preventDefault()
  const api = {
    type: 'xhr',
    method: 'POST',
    url: `/servicedebugger/send/${serviceName}/${host}/${port}/config`,
    data: {
      'method': 'getPackagedFileContents',
      'filename': filename
    }
  }
  await ajaxRequestWithAxios(preOpCallback, successCallback, failureCallback)
  function preOpCallback () {
    if (api.url) {
      const options = ajaxOptionsBuilder(api.url, api)
      return { options }
    }
  }

  function successCallback (response) {
    res = response
  }

  function failureCallback (err) {
    console.error('Error : ', err)
  }
  const fileContent = res.data.result
  function hexToString (hex) {
    let string = ''
    for (let i = 0; i < hex.length; i += 2) {
      string += String.fromCharCode(parseInt(hex.substr(i, 2), 16))
    }
    return string
  }
  alert(hexToString(fileContent))
}

const resourcesListRenderer = (data, section, state) => {
  const { _init: { fullAppConfig: { appContextQueryParam } } } = state
  return data.map((ele, idx) => {
    const Element = 'div'
    const props = { className: 'text-italic' }
    return (
      <Element key={idx} {...props}>
        <button className='filenameLink' onClick={e => onclickFilename(ele.encryptedFilename, appContextQueryParam, e)}>{`Location: ${ele.location.path} filename: ${ele.filename}`}</button>
      </Element>
    )
  })
}

const onBlurViewConfigContextForm = (field, val) => {}

export default {
  onConfigResponseLoaded,
  onConfigContextResponseLoaded,
  onBlurViewConfigContextForm,
  resourcesListRenderer
}
