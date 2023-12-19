import React from 'react'
import PropTypes from 'prop-types'
import NavBarWithTooltip from '@lib/SchemaX/containers/fixtures/navBarWithTooltip'
import UserInfo from '@lib/SchemaX/containers/userInfo'
import { Nav, NavLink } from 'reactstrap'

const SecondNavBarSection = ({ appContext,
  sdLink,
  contextLink,
  navBarItems
}) => {
  return (
    <div className='service-user-nav'>
      <Nav >
        <NavBarWithTooltip navBarItems={navBarItems} />
        <NavLink href={contextLink} target='_blank' className={'nav-item nav-links-hide'}>
          <span className='link-text'>{appContext.serviceName}</span>
        </NavLink>
        <NavLink href={sdLink} target='_blank' className={'nav-item'}>
          <span className='link-text'>Service Debugger</span>
        </NavLink>
      </Nav>
      <UserInfo />
    </div>
  )
}

SecondNavBarSection.propTypes = {
  appContext: PropTypes.object,
  contextLink: PropTypes.string,
  navBarItems: PropTypes.array,
  sdLink: PropTypes.string
}

SecondNavBarSection.defaultProps = {
  navBarItems: []
}

export default SecondNavBarSection
