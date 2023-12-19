import React from 'react'
import PropTypes from 'prop-types'
import SideBarMenu from '@lib/SchemaX/containers/sideMenu/sideBarMenu'
import SideBarHeader from '@lib/SchemaX/containers/sideMenu/sideBarHeader'
import ContentHeader from '@lib/SchemaX/containers/content/contentHeader'
import RouterOutlet from '@lib/SchemaX/routes/Routes'
import { Row } from 'reactstrap'

const SchemaView = props => {
  const { sideBarActive, handleSideBar, fullAppConfig, appConfigData, envColor } = props
  const { appContextQueryParam } = fullAppConfig
  const bodySize = sideBarActive ? 'sidebar-visible' : 'sidebar-hide'
  const showCurrentYear = () => { return new Date().getFullYear() }

  return (
    <div className='app-container'>
      <div className={`wrapper ${bodySize}-wrapper`}>
        <div id='sidebar' className={`${bodySize} ${envColor}`}>
          <SideBarHeader appContextQueryParam={appContextQueryParam} />
          <SideBarMenu appConfigData={appConfigData} />
        </div>
        <div id='content'>
          <ContentHeader handleSideBar={handleSideBar} bodySize={bodySize} />
          <RouterOutlet />
        </div>
      </div>
      <Row id='footer' className='footer-wrapper'>
        <p className='footer-text'>
          <span className='pull-left'>Apple Confidential. For internal use only.</span>
          <span className='pull-right'>Copyright © {showCurrentYear()} Apple Inc. All rights reserved.
            <a target='_blank' href='https://storedev-tools.corp.apple.com/confluence/display/platform/Platform+debug+pages' className='radar-link'><i className='fa fa-question radar-icon' /></a>
            <a href='rdar://new/problem' className='radar-link'><i className='fa fa-bug radar-icon' /></a>
          </span>
        </p>
      </Row>
    </div>
  )
}

SchemaView.propTypes = {
  fullAppConfig: PropTypes.object,
  sideBarActive: PropTypes.bool,
  handleSideBar: PropTypes.func,
  appConfigData: PropTypes.object,
  envColor: PropTypes.string
}

export default SchemaView
