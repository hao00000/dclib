import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import map from 'lodash/map'
import get from 'lodash/get'
import some from 'lodash/some'
import { Nav, NavItem, NavLink } from 'reactstrap'
import Collapsible from '@lib/SchemaX/components/fixtures/Collapsible'
import { getLinkedPageUrl } from '@lib/SchemaX/actions/PageActions'

const SideBarMenu = ({ appConfigData: { menu }, handleClick, activeSubMenuPaths, activeMenuPaths, toggleSubMenu, toggleMenu, envColor, pagePath, initialMenuUpdate, initialSubMenuUpdate, pageShowOrHidden, state }) => {
  const onClick = (page) => (e) => handleClick(e, page)
  const onToggleSubMenu = (mKey, sKey) => e => toggleSubMenu(e, mKey, sKey)
  const onToggleMenu = (mKey) => e => toggleMenu(e, mKey)

  const renderMenu = (menuCat, mKey) => {
    const menuPath = `menu[${mKey}]`
    const show = activeMenuPaths.includes(menuPath)
    const icon = menuCat.icon ? <i aria-hidden='true' className={`menu-icon ${menuCat.icon}`} /> : ''
    const showMenu = get(menuCat, 'showMenu', false)
    if (showMenu) {
      return (
        <NavItem role='listitem' className={`nav-item-subMenu has-sub-menu ${show ? 'active expanded' : ''}`} key={mKey}>
          <Collapsible
            toggle={onToggleMenu(mKey)}
            label={<NavLink aria-expanded={show} role='button' href='#'>{icon}{menuCat.title}</NavLink>}
            show={show}
            children={renderSubMenu(menuCat, mKey)}
          />
        </NavItem>
      )
    } else {
      return renderSubMenu(menuCat, mKey)
    }
  }

  const renderSubMenu = (menuCat, mKey) => {
    return (
      <Fragment>
        <ul>
          {menuCat.subMenu && map(menuCat.subMenu, (subMenuCat, sKey) => {
            const subMenuPath = `menu[${mKey}].subMenu[${sKey}]`
            const show = activeSubMenuPaths.includes(subMenuPath)
            const icon = subMenuCat.icon ? <i aria-hidden='true' className={`subMenu-icon ${subMenuCat.icon}`} /> : ''
            // Not display when pages exist, but none of these pages show due to showIf condition
            const display = subMenuCat.pages && subMenuCat.pages.length > 0 ? some(subMenuCat.pages, (page) => {
              const pageDisplay = page.showIf !== undefined ? pageShowOrHidden(page) : true
              return pageDisplay
            }) : true
            return (
              display &&
              <NavItem role='listitem' className={`nav-item-subMenu has-sub-menu ${show ? 'active expanded' : ''}`} key={sKey}>
                <Collapsible
                  toggle={onToggleSubMenu(mKey, sKey)}
                  label={subMenuCat && <NavLink aria-expanded={show} role='button' href='#'>{icon}{subMenuCat.title}</NavLink>}
                  show={show}
                  children={subMenuCat.pages && subMenuCat.pages.length > 0 && renderPages(subMenuCat, mKey, sKey)}
                />
              </NavItem>

            )
          })
          }
        </ul>
      </Fragment>
    )
  }

  const renderPages = (subMenuCat, mKey, sKey) => {
    return (
      <ul>
        {subMenuCat &&
          map(subMenuCat.pages, (page, pKey) => {
            const pageLink = getLinkedPageUrl(page, state)
            const currentPagePath = `menu[${mKey}].subMenu[${sKey}].pages[${pKey}]`
            const active = pagePath === currentPagePath
            const display = page.showIf !== undefined ? pageShowOrHidden(page) : true
            return (
              display &&
              <NavItem role='listitem' className={`nav-item-page ${active ? 'active' : ''}`} key={pKey}>
                <NavLink
                  aria-current={active ? 'page' : null}
                  onClick={onClick(page)}
                  href={pageLink || '#'}>
                  {page.title}
                </NavLink>
              </NavItem>
            )
          })
        }
      </ul>
    )
  }

  return (
    <nav role='navigation' aria-label='Main' className={`sticky-top ${envColor}`}>
      <Nav role='list' >
        {
          menu.map((menuCat, mKey) => {
            if (menuCat && menuCat.title && menuCat.subMenu && menuCat.subMenu.length > 0) {
              return (
                <Fragment key={mKey}>
                  {renderMenu(menuCat, mKey)}
                </Fragment>
              )
            }
          })
        }
      </Nav>
    </nav>
  )
}

SideBarMenu.propTypes = {
  appConfigData: PropTypes.any,
  handleClick: PropTypes.func,
  toggleSubMenu: PropTypes.func,
  toggleMenu: PropTypes.func,
  envColor: PropTypes.string,
  activeSubMenuPaths: PropTypes.array,
  activeMenuPaths: PropTypes.array,
  pagePath: PropTypes.string,
  initialMenuUpdate: PropTypes.bool,
  initialSubMenuUpdate: PropTypes.bool,
  pageShowOrHidden: PropTypes.func,
  state: PropTypes.object
}

export default SideBarMenu
