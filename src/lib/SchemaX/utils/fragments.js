/* this file was created intentionally to house all JSX Fragments code and components necessary for reusing
Think of it like utils file but for the reusable DOMs.
 */

import React from 'react'
import get from 'lodash/get'
import last from 'lodash/last'
import isReact from 'is-react'
import { Alert } from 'reactstrap'

// the default, sample ListRenderer template.
export const ListRenderer = (data, section) => {
  const CommonElement = { ul: 'ul', ol: 'ol' }
  const ListComponent = CommonElement[section.listType || 'ul']
  return (
    <ListComponent>
      {
        data.map((ele, key) => {
          const Element = 'li'
          const props = { className: 'text-italic' }
          return <Element {...props} key={key}>{ele}</Element>
        })
      }
    </ListComponent>
  )
}

export const renderVerticalTableCellValue = (val, key) => <span className={'vertical-table-cell-value'} key={key}>{val}</span>

export const renderCustomPageContainer = (state, pageData, pageContainers) => {
  const containerPath = get(pageData, 'pageContainer', '')
  if (!containerPath || !pageContainers[containerPath]) {
    return <Alert color='danger'>Container Path declared for custom page is invalid</Alert>
  }

  const ContainerName = last(containerPath.split('/'))

  if (!ContainerName) {
    return <Alert color='danger'>Container Path declared for custom page is invalid</Alert>
  }

  const PageContainer = pageContainers[containerPath][ContainerName]

  if (!isReact.compatible(PageContainer) || (!isReact.component(PageContainer) && !isReact.element(PageContainer))) {
    return <Alert color='danger'>Not a valid comp</Alert>
  }

  if (isReact.element(PageContainer)) {
    return (
      <div className={ContainerName} data-state={state}>
        { PageContainer }
      </div>
    )
  }

  return <PageContainer data-state={state} />
}
