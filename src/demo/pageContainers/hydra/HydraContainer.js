// this is a sample component for PageContainer loading use case
// PageContainer can be hooked with an actual Redux container too.
import React, { Fragment } from 'react'
import { JsonView, TableView, FormView, PreView, ListView, ChartView } from '@lib'
import { jsonSection, tableSection, formSection, preSection, listSection, chartSection } from './sampleSectionData'
import './HydraContainer.scss'
// import PropTypes from 'prop-types'

const HydraContainer = (props) => {
  const parentState = props['data-state'] // eslint-disable-line

  return (
    <Fragment>
      <div className='page-title'>HydraContainer Page</div>
      <div className='single-page'>
        <div className='hydra-view'>
          <p>
            This is a sample page employing many flexible sections for rendition, so called it: the Hydra.
          </p>
          <p>
            This page is loaded through PageContainer setting, see demo/index.js and appConfig.json
          </p>
          <h4>JSON</h4>
          <JsonView section={jsonSection} />
          <h4>TABLE</h4>
          <TableView section={tableSection} />
          <h4>FORM</h4>
          <FormView section={formSection} />
          <h4>PRE</h4>
          <PreView section={preSection} />
          <h4>LIST</h4>
          <ListView section={listSection} />
          <h4>CHART</h4>
          <ChartView section={chartSection} />
        </div>
      </div>
    </Fragment>
  )
}

export default { HydraContainer }
