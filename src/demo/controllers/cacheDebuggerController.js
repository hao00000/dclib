import React from 'react'
import get from 'lodash/get'
import { Container, Row, Col } from 'reactstrap'
import { utils } from '@lib'
import PropType from 'prop-types'

const { queryStringBuilder, replaceString, isObject, getLayeredFormListData } = utils

// >>>>>>>>>>>>>>>>>>>> Table Controller <<<<<<<<<<<<<<<<<<<<
const onClickMyRow = (state, rowInfo, column, instance) => {
  return {
    onClick: (e, handleOriginal) => {
      e.preventDefault()
      console.log('>>>> onClickMyRow <<<<: ')
    }
  }
}

const onClickMyCell = (state, rowInfo, column, instance) => {
  return {
    onClick: (e, handleOriginal) => {
      e.preventDefault()
      console.log('>>>> onClickMyCell <<<<')
    }
  }
}

const onClickMyHeader = (state, rowInfo, column, instance) => {
  return {
    onClick: (e, handleOriginal) => {
      e.preventDefault()
      console.log('>>>> onClickMyHeader <<<<')
    }
  }
}

const onCellRenderer = (provider, section = {}, state = {}) => (row) => {
  const { original: item, column: { id: columnKey } } = row
  const { changePage, setPageData } = provider
  const { appContextQueryString } = state._init.fullAppConfig
  const path = '/DSS/Cache/cacheDebuggerLinkedPage:id'
  const href = replaceString(path, `:id`, item['id'])
  const onClick = (href, pageSource) => (e) => {
    e.preventDefault()
    setPageData({})
    const urlString = queryStringBuilder(href, appContextQueryString)
    changePage(urlString)
  }
  return <a key={columnKey} href={href} onClick={onClick(href)}>{item[columnKey]}</a>
}

const myTableSettings = () => {
  // We will add some classes to the selected rows and cells
  return {
    defaultPageSize: 3,
    defaultFilterMethod: (filter, row) => String(row[filter.id]).toLowerCase().includes(filter.value.toLowerCase())
  }
}

const mySourceDataHandler = (source) => {
  const data = get(source, 'cacheListing.cacheEntries')
  return {
    data,
    dataStore: 'cacheListing',
    dataField: 'cacheEntries'
  }
}

// >>>>>>>>>>>>>>>>>>>> Form Controller <<<<<<<<<<<<<<<<<<<<
const myPageSuccessHandler = (data) => {
  console.log('FormCtrl.myPageSuccessHandler triggered ', data)
  return data
}

const myPageFailureHandler = (err) => {
  console.log('FormCtrl.myPageFailureHandler triggered ', err)
  return err
}

const bindMyCustomFormFieldList = (props) => {
  const { formData, schema:{ properties } } = props
  return (
    <div className='form-field-list'>
      {
        Object.keys(formData).map((fieldPath, key1) => {
          const propData = get(properties, [fieldPath], '')
          const data = propData && fieldPath && getLayeredFormListData(formData, fieldPath.split('.'), 0)
          const title = get(propData, 'title', '')
          return (
            <ul key={key1}>
              <Container>
                <Row>
                  {<Col className='form-field-list-title'>{title}</Col>}
                  {data && <Col className={Array.isArray(data) ? 'form-field-list-body-array' : 'form-field-list-body-string'}>{
                    Array.isArray(data)
                      ? data.map((item, key2) => <li key={key2}>{JSON.stringify(item)}</li>)
                      : isObject(data)
                        ? JSON.stringify(data)
                        : data
                  }</Col>}
                </Row>
              </Container>
            </ul>
          )
        })}
    </div>
  )
}

const statisticsSuccessHandler = (source) => {
  const data = source.caches[Object.keys(source.caches)[0]]
  const arr = []
  Object.keys((data || {}).statistics || []).map(key => {
    arr.push({ ...data.statistics[key], 'period': key })
  })
  return { 'data': data, 'tableData': arr }
}

const flushStatusSuccessHandler = (source) => {
  return { 'data': source[Object.keys(source)[0]] }
}

const cacheEntrySuccessHandler = (source, state) => {
  const cacheName = source[Object.keys(source)[0]]
  const data = cacheName && (Object.keys(cacheName) || []).map(res => {
    const key = cacheName[res]
    return {
      'name': res,
      'created': key.created,
      'expiration': key.expiration,
      'expired': key.expired,
      'gcd': key.gcd,
      'hits': key.hits,
      'invalidationKeys': key.invalidationKeys
    }
  })
  return { 'data': cacheName, 'tableData': data }
}

bindMyCustomFormFieldList.propTypes = {
  formData: PropType.object,
  schema: PropType.object
}

export default {
  onClickMyRow,
  onClickMyCell,
  onClickMyHeader,
  myTableSettings,
  onCellRenderer,
  mySourceDataHandler,
  myPageSuccessHandler,
  myPageFailureHandler,
  bindMyCustomFormFieldList,
  statisticsSuccessHandler,
  flushStatusSuccessHandler,
  cacheEntrySuccessHandler
}
