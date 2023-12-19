import React from 'react'
import PropTypes from 'prop-types'
import SectionHeader from '@lib/SinglePage/containers/layout/sectionHeader.js'
import SectionFooter from '@lib/SinglePage/containers/layout/sectionFooter.js'
import DclibNotification from '@lib/SchemaX/components/fixtures/DclibNotification.js'
import * as Fixtures from '@lib/SinglePage/containers/fixtures'
import get from 'lodash/get'
import isEmpty from 'lodash/isEmpty'
import startCase from 'lodash/startCase'

const GenericView = ({ state, section, pageData, routerContext, sectionExpand, handleClick, handleCollapse, collapseSection }) => {
  const { _init: { provider } } = state
  const viewProps = {
    section,
    pageData,
    provider
  }
  const pagePath = get(pageData, 'pageMeta.pageController', '')
  const { pageControllers } = provider
  const controller = pagePath && pageControllers && pageControllers[pagePath]
  const hasShowIfFunction = section.showIf && controller && controller[section.showIf] && typeof controller[section.showIf] === 'function'
  const display = hasShowIfFunction ? controller[section.showIf](state, section) : true
  const children = renderChildren(section, sectionExpand, handleClick, viewProps, collapseSection)
  const isCollapsible = section.className === 'toggle-collapsible'
  return (
    display &&
    <div className='card-section' id={`section-${section.sectionKey}`}>
      <SectionHeader handleCollapse={handleCollapse} section={section} pageData={pageData} provider={provider} isCollapsible={isCollapsible} children={children} collapseSection={collapseSection} />
      {!isCollapsible && children}
    </div>
  )
}

const renderChildren = (section, sectionExpand, handleClick, viewProps, collapseSection) => {
  const componentView = `${startCase(section.type.toLowerCase())}View`
  const hasSection = section.type && Fixtures[componentView]
  const CommonElement = Fixtures[componentView]
  return (
    <div>
      <div className={`
        card-body
        ${section.type.toLowerCase()}-view${sectionExpand ? '-expand' : ''}
        section-body${sectionExpand ? '-expand' : ''}
        ${section.classNames || ''}
      `}>
        { hasSection && <CommonElement {...viewProps} /> }
        {
          hasSection && !isEmpty(section.errorMessage) && <DclibNotification notificationType='inline' error={section.errorMessage} />
        }
      </div>
      <SectionFooter sectionExpand={sectionExpand} handleClick={handleClick} data={section.footer} />
    </div >
  )
}

GenericView.propTypes = {
  state: PropTypes.object,
  section: PropTypes.object,
  pageData: PropTypes.object,
  routerContext: PropTypes.object,
  sectionExpand: PropTypes.bool,
  handleClick: PropTypes.func
}

export default GenericView
