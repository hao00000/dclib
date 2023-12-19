import React, { Fragment } from 'react'
import ReactDOMServer from 'react-dom/server'
import tail from 'lodash/tail'
import { utils } from '@lib'
import './page2Demo.scss'
const { queryStringBuilder, openModal } = utils

const myClickHandlerFunction = (e, state, section) => {
  e.preventDefault()
  const { _init: { provider: { getSectionData, setDataStore } }, page: { pagePath, pageData } } = state

  // TEST setDataStore
  const testObj = { name: 'johndoe' }
  setDataStore(testObj, 'dataStore', 'testSource')

  getSectionData(pagePath, pageData, section, 1)
}

const myAreaChartDataHandler = (data) => {
  console.log('page2 myClickHandlerFunction >>>')
  return tail(data)
}

const employeeListRenderer = (data, section, state) => {
  return data.map((ele, ind) => {
    const renderEle0 = (
      <div>
        <div>{ele}</div>
        <ol>
          <li>List Item 1</li>
          <li>List Item 2</li>
          <li>List Item 3...</li>
        </ol>
      </div>
    )

    const renderEle1 = (
      <div>
        <div>{ele}</div>
        <ul>
          <li>Adaptor 1</li>
          <li>Adaptor 2</li>
          <li>Adaptor 3...</li>
        </ul>
      </div>
    )

    const renderEle2 = (
      <div>
        <div>{ele}</div>
        <ul>
          <li>
            <a href='https://www.site1.com' target='_blank'>Site1</a>
          </li>
          <li>
            <a href='https://www.site2.com' target='_blank'>Site2</a>
          </li>
        </ul>
      </div>
    )

    const htmlString = ind === 0
      ? ` ${ReactDOMServer.renderToStaticMarkup(renderEle0)}`
      : ind === 1 ? ` ${ReactDOMServer.renderToStaticMarkup(renderEle1)}`
        : ` ${ReactDOMServer.renderToStaticMarkup(renderEle2)}`

    const data = {
      title: 'customized title',
      children: htmlString
    }
    return (
      <div key={ind}>
        <button onClick={(e) => {
          e.preventDefault()
          openModal(data, state)
        }}> {ele} </button>
      </div>
    )
  })
}
const myTitleRenderFunction = (state) => {
  const { _init: { provider: { changePage, setPageData }, fullAppConfig } } = state
  const label1 = 'getLocalConfigHashStructured'
  const targeturl1 = '/DSS/Cache/page1Demo'
  const pagesource1 = '/src/mockData/schemas/page1/pageSchemas/page1Demo.json'
  const label2 = 'getLocalConfigHashUnstructured'
  const targeturl2 = '/DSS/Cache/page1Demo'
  const pagesource2 = '/src/mockData/schemas/page1/pageSchemas/page1Demo.json'
  const { appContextQueryString } = fullAppConfig
  const onClick = (targeturl1, pageSource) => (e) => {
    e.preventDefault()
    setPageData({})
    const urlString = queryStringBuilder(targeturl1, appContextQueryString)
    changePage(urlString)
  }
  const onClick1 = onClick(targeturl1, pagesource1)
  const onClick2 = onClick(targeturl2, pagesource2)

  return (
    <Fragment>
      <h3> employee table </h3>
      <div className='subtitle-text'> my section subtitle</div>
      <span className='hash-link-style'>See also: <a key={label1} href={targeturl1} onClick={onClick1} >{label1}</a> or <a key={label2} href={targeturl2} onClick={onClick2} >{label2}</a></span>
      <hr key={1} />
    </Fragment>
  )
}

export default {
  myClickHandlerFunction,
  myAreaChartDataHandler,
  myTitleRenderFunction,
  employeeListRenderer
}
