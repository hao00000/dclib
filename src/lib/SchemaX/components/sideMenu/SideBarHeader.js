import React from 'react'
import DclibNotification from '@lib/SchemaX/components/fixtures/DclibNotification'
import { queryStringBuilder } from '@lib/SchemaX/utils'
import PropTypes from 'prop-types'
import ModalBox from '@lib/SchemaX/components/fixtures/ModalBox'

const SideBarHeader = ({ appContextQueryParam, homeQueryString, contextLayer, envColor, appContextQueryString, modalBoxDisplay, setModalBoxDisplay }) => {
  const urlString = queryStringBuilder('/', appContextQueryString)
  const { isOpen = false, data = {} } = modalBoxDisplay || {}

  const toggle = (payload) => () => setModalBoxDisplay({ isOpen: payload, data })
  return (
    <header>
      <div className='sidebar'>
        <div className={`brand ${envColor}`}>
          <div className='brand-container'>
            <span className='logo'>
              <span className='apple-logo'><i className='fa fa-apple apple-icon' /></span>
              <span className='service-name' onClick={() => { window.location.href = urlString }}>{appContextQueryParam.serviceName}</span>
              {contextLayer && <div className='config-layer' onClick={() => { window.location.href = urlString }}>({contextLayer})</div>}
            </span>
          </div>
        </div>
      </div>
      <ModalBox show={isOpen} data={data} close={toggle(false)} backdrop />
      <DclibNotification notificationType='popup' />
    </header>
  )
}

SideBarHeader.propTypes = {
  appContextQueryParam: PropTypes.object,
  appContextQueryString: PropTypes.string,
  homeQueryString: PropTypes.string,
  contextLayer: PropTypes.string,
  envColor: PropTypes.string,
  modalBoxDisplay: PropTypes.object,
  setModalBoxDisplay: PropTypes.func
}

export default SideBarHeader
