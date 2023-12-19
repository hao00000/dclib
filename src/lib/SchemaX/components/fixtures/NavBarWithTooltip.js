import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import { Tooltip, NavItem, NavLink, DropdownItem, Dropdown, DropdownToggle, DropdownMenu } from 'reactstrap'

const NavBarWithTooltip = ({ handleClick, dropdownOpen, toggleDropdown, toggleTooltip, tooltipDict, sdEnv, contextLink, appContextQueryString, sdLink, navBarItems }) => {
  const renderOtherItems = (items) => {
    return (
      <Dropdown nav isOpen={dropdownOpen} toggle={toggleDropdown}>
        <DropdownToggle tag='a' className='nav-link' caret>
          <span className='link-text'>More</span>
        </DropdownToggle>
        <DropdownMenu className={'dropdown-menu'}>
          {items.map((item, key) => {
            const currentKey = key + 2
            return (
              <Fragment key={key}>
                <DropdownItem className={'dropdown-item'}>
                  <NavItem>
                    <NavLink onClick={(e) => handleClick(e, item.name, item.tooltip)} id={'Tooltip-' + (currentKey)}>
                      <span className='link-text'>{item.name}</span>
                    </NavLink>
                    <Tooltip className='tooltip-text' placement='bottom' isOpen={tooltipDict[currentKey]} toggle={e => toggleTooltip(e, currentKey)} target={'Tooltip-' + (currentKey)}>{item.tooltip || '-'}</Tooltip>
                  </NavItem>
                </DropdownItem>
                {key !== items.length - 1 && <DropdownItem divider />}
              </Fragment>
            )
          })}
        </DropdownMenu>
      </Dropdown>
    )
  }

  return (
    <Fragment>
      {navBarItems.slice(0, 2).map((item, key) => {
        return (<NavItem key={key} className={'nav-item nav-links-hide'}>
          <NavLink href={`${sdLink}/${item.name}/${item.tooltip ? item.tooltip + '/' : ''}index.html?${appContextQueryString}&sdEnv=${sdEnv}`} target='_blank' id={'Tooltip-' + key}>
            <span className='link-text'>{item.name}</span>
          </NavLink>
          <Tooltip className='tooltip-text' placement='bottom' isOpen={tooltipDict[key]} toggle={e => toggleTooltip(e, key)} target={'Tooltip-' + key}>{item.tooltip || '-'}</Tooltip>
        </NavItem>)
      })}
      {navBarItems.length > 2 &&
        renderOtherItems(navBarItems.slice(2, navBarItems.length))
      }
    </Fragment>
  )
}

NavBarWithTooltip.propTypes = {
  appContextQueryString: PropTypes.string,
  contextLink: PropTypes.string,
  dropdownOpen: PropTypes.bool,
  handleClick: PropTypes.func,
  navBarItems: PropTypes.array,
  sdEnv: PropTypes.string,
  sdLink: PropTypes.string,
  toggleDropdown: PropTypes.func,
  toggleTooltip: PropTypes.func,
  tooltipDict: PropTypes.object
}

export default NavBarWithTooltip
