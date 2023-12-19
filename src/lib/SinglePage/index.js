import React, { Fragment } from 'react'
import '../styles/index.scss'
import PropTypes from 'prop-types'
import GenericViewContainer from '@lib/SinglePage/containers/layout/genericView'
import get from 'lodash/get'
import { pageTitleRender } from '@lib/SchemaX/utils'

// this is for test only. todo to be removed from library. This is typically done in the actual implem
// import 'src/mockData/controllers/cacheDebuggerController.js'

const SinglePage = ({ pageData, routerContext }) => {
  const sections = get(pageData, 'sections', [])
  // todo resolve page controller before passing to view
  const pageTitle = get(pageData, 'title', '')
  const updatePageTitle = pageTitle.includes(':query.') ? pageTitleRender(pageTitle) : pageTitle
  return (
    <Fragment>
      <div className='page-title'>{updatePageTitle}</div>
      {
        pageData && sections.length > 0 && sections.map((section, key) => (
          <section key={key} className='single-page'>
            <GenericViewContainer pageData={pageData} section={section} sectionKey={key} routerContext={routerContext} />
          </section>
        ))
      }
    </Fragment>
  )
}

SinglePage.propTypes = {
  pageData: PropTypes.any,
  routerContext: PropTypes.object
}

export { SinglePage }
