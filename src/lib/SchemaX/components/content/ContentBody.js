import React from 'react'
import PropTypes from 'prop-types'
import get from 'lodash/get'
import { SinglePage } from '@lib/SinglePage'
// import { DynamicImport } from '@lib/utils'
import IframePage from '@lib/IframePage'
import { renderCustomPageContainer } from '@lib/SchemaX/utils/fragments'
import { getLinkedPageUrl } from '@lib/SchemaX/actions/PageActions'

const renderRight = (state, pageData, pageContainers, routerContext) => {
  // console.log('pageData.type & pageData >>>>>> ', pageData.type, pageData)
  switch (pageData.type) {
    case 'SCHEMA_PAGE':
      return <SinglePage pageData={pageData} routerContext={routerContext} />

    case 'CUSTOM_PAGE':
      // Render a component locally hosted
      // const path = 'src/mockData/pages/PageContainer'

      // Render a component hosted elsewhere
      // const path = `${serverURI}/src/mockData/pages/PageContainer`
      return renderCustomPageContainer(state, pageData, pageContainers)

    case 'LINK_PAGE':
      const options = get(pageData, 'options', {})
      const pageLink = getLinkedPageUrl(pageData, state)
      if (pageData.viewType === 'Iframe') {
        return <IframePage pageLink={pageLink} options={options} />
      } else {
        return <span />
      }

    default:
      return <span />
  }
}

const ContentBody = ({ state, pageData, pageContainers, routerContext }) => renderRight(state, pageData, pageContainers, routerContext)

ContentBody.propTypes = {
  pageData: PropTypes.any,
  pageContainers: PropTypes.object,
  state: PropTypes.object
}

export default ContentBody
