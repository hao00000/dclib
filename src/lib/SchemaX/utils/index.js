import React from 'react'
import ReactDOMServer from 'react-dom/server'
import get from 'lodash/get'
import set from 'lodash/set'
import reduce from 'lodash/reduce'
import isEmpty from 'lodash/isEmpty'
import merge from 'lodash/merge'
import concat from 'lodash/concat'
import times from 'lodash/times'
import isNil from 'lodash/isNil'
import { compose } from 'recompose'
import axios from 'axios'
import moment from 'moment'
import { toast } from 'react-toastify'
import { renderVerticalTableCellValue } from '@lib/SchemaX/utils/fragments'
import matchSorter from 'match-sorter'
import has from 'lodash/has'
import { isObject } from '@lib/utils'

export const regex = (str) => new RegExp(str, 'gi')

/**
 * @PERFORMS:
 * Test/check if the string has such pattern.
 *
 * @param {String|RegExp} pattern
 * @param {String} st is the string which pattern is tested against
 *
 * @return {Boolean}
 **/
export const regexTest = (pattern, st) => (new RegExp(pattern, 'gi')).test(st)
// another use case is to test if url contains http or https, regex pattern is: ^(?:https?:\/\/)

/**
 * @PERFORMS:
 * Test/check if the entire string has a pattern and replace the matched values with new string.
 *
 * @param {String} str is the entire string, e.g. The brown fox
 * @param {String} oldStr means the value to be tested against, e.g. brown
 * @param {String} newStr means the value to be updated, e.g. orange
 *
 * @return {String} this method mutates the original string and returns the new version, e.g. the orange fox
 **/
export const replaceString = (str, oldStr, newStr) => typeof str === 'string' ? str.replace(regex(oldStr), newStr) : str

export const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1)

/**
 * @PERFORMS:
 * Escape and Sanitize the string to provide an dry version of it.
 *
 * @param {String} str is the entire string
 * Special characters involve ~!@#$%^&*()_|+\-=?;:'",.<>{}
 *
 * @return {String} this method mutates the original string and returns the new version containing no special chars.
 **/
export const sanitizeSpecialChars = (str) => str.replace(/[`~!@#$%^&*()_|+\-=?;:'",.<>{}\[\]\\\/]/gi, '') // eslint-disable-line

export const genActionType = (str) => str && str.split(/(?=[A-Z])/).join('_').toUpperCase()

/**
 * @PERFORMS:
 * Throw an Error for exception handling, debugging and alerting for developer user.
 *
 * @param {String} msg is the Error message
 *
 * @return void
 **/
export const _throw = (msg) => { throw new Error(msg) }

/**
 * @PERFORMS:
 * It is a StringBuilder
 *
 * @param {Object} params is the dictionary object of all params
 *
 * @return {String} a concatenated string serializing the params with = and & for building a querystring
 * This function is usually invoked and used together with querystringBuilder
 **/
export const stringBuilder = params => Object.keys(params).map(key => key + '=' + params[key]).join('&')
export const stringBuilderWithEncode = params => Object.keys(params).map(key => key + '=' + encodeURIComponent(params[key])).join('&')

/**
 * @PERFORMS:
 * Take an object that has props being other objects nested inside to flatten with all of the props of the child objects.
 *    Example: obj = { a: { fn1: () => {}, fn2: () => {} }, b: { x: 11, y: 22 }, c: { fn3: () => {}, fn4: () => {} }
 *    Outcome: outcomeObj = { fn1: () => {}, fn2: () => {}, x: 11, y: 22, fn3: () => {}, fn4: () => {} }
 * @param {Object} obj, the initial input object
 *
 * @return {Object} the output
 **/
export const getFlattenObj = (obj = {}) => reduce(obj, (result, ele) => ele && isObject(ele) ? { ...result, ...ele } : result, {})

/**
 * @PERFORMS:
 * show ModalBox with some data
 *
 * @param {Object} data object
 * @param {Object} state object, the Redux state
 *
 * @return void
 **/
export const openModal = (data, state) => {
  const { _init: { provider: { setModalBoxDisplay } } } = state
  setModalBoxDisplay({
    isOpen: true,
    data: data
  })
}

export const onClickChangePage = (e, href, state, pageSource) => {
  e.preventDefault()
  const {
    _init: {
      provider: {
        changePage, setPagesDict, setPageData
      },
      fullAppConfig: {
        appContextQueryString
      }
    },
    page: {
      pagesDict
    }
  } = state

  const data = { type: 'SCHEMA_PAGE', pageSource: pageSource }

  const urlString = queryStringBuilder(href, appContextQueryString)

  setPageData({})
  // TODO: review and simplify this function as dependents feature is added, this setPagesDict may no longer be needed.
  setPagesDict(merge(pagesDict, {
    [href]: {
      [href]: data
    }
  }))

  changePage(urlString)
}

/**
 * @PERFORMs:
 * build and provide an enhanced version with query-strings payload
 * @param {String} oldQueryString
 * @param {String | Object} payload
 * @return {String} new querystring
 **/
export const queryStringBuilder = (oldQueryString, payload) => {
  if (!payload || typeof payload === 'number' || typeof payload === 'boolean' || Array.isArray(payload)) {
    return oldQueryString
  }

  const builtString = (typeof payload === 'string') ? payload : stringBuilder(payload)
  if (oldQueryString.includes(builtString)) {
    return oldQueryString
  }

  const query = builtString.length > 0
    ? oldQueryString.includes('?')
      ? `&${builtString}` : `?${builtString}`
    : ''
  return `${query}#${oldQueryString}`
}

export const getQueryParams = () => {
  const search = window.location.search.startsWith('?') ? window.location.search.substring(1) : ''
  return (search && !(search.includes('#')) && JSON.parse(
    `{"${search.replace(/&/g, '","').replace(/=/g, '":"')}"}`,
    (key, value) => {
      return key === '' ? value : decodeURIComponent(value)
    }
  )) || ''
}

export const recursiveCheckEmpty = (checkData) => {
  if (isEmpty(checkData)) return true
  if (typeof checkData !== 'object') return false
  if (Array.isArray(checkData)) {
    return checkData.length === 0
  }
  for (const key in checkData) {
    if (!recursiveCheckEmpty(checkData[key])) return false
  }
  return true
}

export const getErrorMessage = (errorData) => {
  if (typeof errorData === 'string') {
    return errorData
  }
  const status = get(errorData, 'status', '')
  const statusText = () => {
    switch (status) {
      case 403:
        return 'You are not authorized to access this section'
      case 404:
        return 'No Data Found'
      case 400:
        return 'Bad Request'
      default:
        return get(errorData, 'statusText', '')
    }
  }
  const renderError = (
    <div>
      {status && <strong>Error {status} - {statusText()}</strong>}
      <p>{JSON.stringify(errorData, null, 4)}</p>
    </div>
  )
  const htmlString = ` ${ReactDOMServer.renderToStaticMarkup(renderError)}`
  return htmlString.replace(/,/g, '')
}

// args = (action, controller, state, section)
export const actionObjBuilder = (...args) => {
  const argmts = Array.from(args)
  const action = argmts[0]

  // carry over all args
  return merge({}, action, {
    config: configBuilder(...args)
  })
}

const configBuilder = (...args) => {
  const argmts = Array.from(args)
  const action = argmts[0]
  const config = argmts[0].config
  const state = argmts[2]

  if (action.type === 'BUTTON') {
    return merge({}, config, {
      events: eventsInjector(...args)
    })
  }

  if (action.type === 'LINK') {
    const qs = parseUserURI()
    return merge({}, config, {
      targetURL: ajaxURIBuilder(config.targetURL, qs, state)
    })
  }

  if (action.type === 'DIRECT_PATH') {
    return merge({}, config, {
      events: directPathInjector(...args)
    })
  }

  return config
}

const directPathInjector = (action, controller, state, section) => {
  const events = get(action, 'config.events')
  if (!events.onClick) {
    const qs = parseUserURI()
    const targetURL = ajaxURIBuilder(events.targeturl, qs, state)
    events.onClick = e => onClickChangePage(e, targetURL, state, events.pagesource)
  } else if (controller[events.onClick] && typeof controller[events.onClick] === 'function') {
    events.onClick = e => controller[events.onClick](e, state, section)
  }
  return events
}

const eventsInjector = (action, controller, state, section) => reduce(action.config.events, (result, ele, key) => {
  if (!ele) {
    return result
  }

  if (key.includes('on') && controller[ele] && typeof controller[ele] === 'function') {
    return { ...result, [key]: (e) => controller[ele](e, state, section) }
  }

  return result
}, {})

export const urlBuilder = url => {
  // eslint-disable-next-line
  const matches = url.match(/^(?:https?:\/\/)?(?:[^@/\n]+@)?(?:www\.)?([^/?\n]+)/gim)
  return matches ? matches[0] : ''
}

export const MapToArrayList = (data) => reduce(data, (results, ele, k) => ele ? [...results, ele] : results, [])

export const MapDictToArrayList = (data) => reduce(data, (results, ele, k) => ele ? [...results, { [k]: ele }] : results, [])

const getFieldName = (configFieldName, configName, actionFieldName) => {
  const hasCustomName = configFieldName

  return (hasCustomName) ? actionFieldName : configName
}

const getPath = (configPath, actionPath) => {
  const idx = configPath.indexOf('@path')
  const hasActionPath = idx > -1 && actionPath
  return hasActionPath
    ? `${configPath.slice(0, idx)}${actionPath}`
    : configPath.slice(0, 6) === 'state.'
      ? configPath.slice(6)
      : configPath
}

// Redux Factory (Redux Action and Evaluator Factory)
// @@normalAction
//    can take 3 params:
//      payload<any>,
//      @path<optional, dynamic String>,
//      @customField<optional, dynamic String>,
// @@ajaxAction
//    can take 3 params:
//      path<required String>,
//      xhr<optional, dynamic Object>,
//      @customField <optional, dynamic String>
export const createReduxAction = (
  config = {
    name: 'SOMETHING',
    path: 'state.app.item',
    customName: '',
    customField: false,
    xhr: {
      url: '',
      method: 'GET',
      data: {},
      body: {},
      params: {},
      headers: {},
      auth: {},
      timeout: 0,
      withCredentials: false,
      responseType: 'json',
      proxy: {}
    },
    success: 'data',
    failure: 'error'
  }
) => {
  const isAjax = config.xhr && (config.xhr.url || config.xhr === '@xhr')
  config.customField = config.customField || false
  const ACTION_TYPE = config.customName ? config.customName : `@@factory/SET_${genActionType(config.name)}`
  const actions = {}
  const normalAction = (payload, path = '', fieldName = '') => ({
    type: ACTION_TYPE,
    payload,
    path,
    fieldName
  })

  // for ajax thunk
  let actionName = ''
  let actionTypes = {
    request: '',
    success: '',
    failure: ''
  }
  let ajaxAction = (path = '', xhr = {}, fieldName = '') => {}
  if (isAjax) {
    actionName = `${config.customName || genActionType(config.name)}`
    actionTypes = {
      request: `FETCH_${actionName}_REQUEST`,
      success: `FETCH_${actionName}_SUCCESS`,
      failure: `FETCH_${actionName}_FAILURE`
    }

    ajaxAction = (path = '', xhr = {}, fieldName = '') => async (dispatch, getState) => {
      /*
      // Temporary exclusion
        let state
        if (path) {
          state = get(getState(), path)
        }
      */

      const xhrOptions = xhr.url ? { ...xhr, method: xhr.method || 'GET' } : config.xhr

      await fetchMethod(dispatch, getFieldName(config.customField, config.name, fieldName), xhrOptions)
    }
  }

  const method = `set${compose(sanitizeSpecialChars, capitalize)(config.name)}`

  actions[method] = (isAjax) ? ajaxAction : normalAction

  const getUpdateState = (state, action) => {
    if (!isAjax) {
      if (action.type === ACTION_TYPE) {
        const { payload } = action
        const path = getPath(config.path, action.path)
        const fieldName = getFieldName(config.customField, config.name, action.fieldName)

        const newState = { ...state }
        let fullPath

        const locus = path ? `${path}.` : ''
        if (!fieldName || path.includes(fieldName)) {
          fullPath = path
        } else {
          fullPath = `${locus}${fieldName}`
        }

        return set(newState, fullPath, payload)
      }
    } else {
      if (action.type === actionTypes.request) {
        const path = getPath(config.path, action.path)
        const fieldName = getFieldName(config.customField, config.name, action.fieldName)

        const newState = { ...state }

        const locus = path ? `${path}.` : ''
        set(newState, `${locus}isFetching`, true)
        set(newState, `${locus}${fieldName}`, [])
        set(newState, `${locus}error`, undefined)
        return newState
      }

      if (action.type === actionTypes.failure) {
        const path = getPath(config.path, action.path)
        const newState = { ...state }

        const locus = path ? `${path}.` : ''
        set(newState, `${locus}isFetching`, false)
        set(newState, `${locus}error`, get(action.error, config.error))
        return newState
      }

      if (action.type === actionTypes.success) {
        const path = getPath(config.path, action.path)
        const fieldName = getFieldName(config.customField, config.name, action.fieldName)

        const newState = { ...state }

        const locus = path ? `${path}.` : ''
        set(newState, `${locus}isFetching`, false)
        set(newState, `${locus}${fieldName}`, get(action.payload, config.success))
        set(newState, `${locus}error`, undefined)

        return newState
      }
    }

    return false
  }

  return { actions, getUpdateState }
}

export const factoryEvaluator = (funcs = []) => (state, action) => {
  let outcome = false
  if (Array.isArray(funcs) && funcs.length > 0) {
    funcs.some(fn => {
      const instance = fn(state, action)
      if (instance) outcome = instance
    })
  }
  return outcome
}

export const fetchMethod = async (dispatch, action = 'SOMETHING', options = {
  url: '',
  method: 'GET',
  data: {},
  body: {},
  params: {},
  headers: {},
  auth: {},
  timeout: 0,
  withCredentials: false,
  responseType: 'json',
  proxy: {}
}) => {
  let actions = action
  if (typeof action === 'string') {
    actions = {
      request: `FETCH_${action}_REQUEST`,
      success: `FETCH_${action}_SUCCESS`,
      failure: `FETCH_${action}_FAILURE`
    }
  }
  dispatch({ type: actions.request, options })
  try {
    const response = await axios(options)
    if (response.status < 200 || response.status > 299) {
      console.error(`Error ${actions.failure}`, options)
      dispatch({ type: actions.failure, error: `Error ${actions.failure}` })
    } else {
      dispatch({ type: actions.success, payload: response })
    }
    return response
  } catch (error) {
    dispatch({ type: actions.failure, error })
    return undefined
  }
}

export const enhanceAppConfigData = (oData) => {
  if (!oData) {
    return {}
  }

  const data = { ...oData, slug: 'app' }
  // substitute appContext in here with getAppContext
  data.appContextQueryParam = getAppContext(data.appContext)

  // const slimAppContextQueryParam = omit(appContextQueryParam, [fields])
  // const builtString = stringBuilder(slimAppContextQueryParam)
  const builtString = stringBuilder(data.appContextQueryParam)

  data.appContextQueryString = builtString && builtString.length > 0 ? builtString : ''

  const menu = oData.menu.reduce(
    (results, ele, indx) => {
      const subMenu = ele.subMenu.reduce((subMenus, el, idx) => {
        const pages = !el.pages ? [] : el.pages.reduce((aggregator, e, id) =>
          Object.keys(e).length > 0 ? [...aggregator, { ...e, slug: `pages[${id}]` }] : aggregator,
        [])
        const newPages = { ...el, pages }
        return Object.keys(el).length > 0 ? [...subMenus, { ...newPages, slug: `subMenu[${idx}]` }] : subMenus
      }, [])
      const newMenu = { ...ele, subMenu }
      return Object.keys(ele).length > 0 ? [...results, { ...newMenu, slug: `menu[${indx}]` }] : results
    },
    []
  )

  return { ...data, menu }
}

export const pagesDictionaryBuilder = (menu, dependents) => {
  const menuDictionary = reduce(menu, (result, aMenu, key1) => {
    const subMenus = get(aMenu, 'subMenu', [])
    return reduce(subMenus, (resul, subMenu, key2) => {
      const { pages = [] } = subMenu
      const reducedSubMenu = reduce(pages, (res, page, key3) => {
        return { ...res, [page.path]: { key1, key2, key3, [page.path]: page } }
      }, {})
      return merge(result, reducedSubMenu)
    }, {})
  },
  {})
  const dependentsDictionary = reduce(dependents, (acc, cur) => {
    return { ...acc, [cur.path]: { [cur.path]: cur } }
  }, {})
  return merge(menuDictionary, dependentsDictionary)
}

export const parseSharedLink = (menu, pagePath, pagesDict, homePath) => {
  try {
    if (!menu) {
      console.error('Error menu: ', menu)
    }
    if (!pagesDict || Object.keys(pagesDict).length < 1) {
      console.error('Error pagesDict: ', pagesDict)
    }
    if (!pagePath) {
      console.error('Error pagePath: ', pagePath)
    }
    const newPagePath = (pagePath === '/') ? (homePath || '/') : pagePath
    const obj = pagesDict[newPagePath] || {}
    if (!obj || Object.keys(obj).length < 1) {
      console.error('Error obj: ', obj)
    }

    const path = obj.key1 !== undefined ? `menu[${obj.key1}].subMenu[${obj.key2}].pages[${obj.key3}]` : undefined
    return { page: obj[newPagePath], pageKey: obj.key3, path: path }
  } catch (err) {
    _throw(err)
  }
}

// default support
export const getVerticalData = (data = []) => {
  if (data.length < 1) {
    return []
  }

  let outcome = []

  data.map(obj => {
    Object.keys(obj).map(field => {
      const found = outcome.filter(o => o['@title'] === field)[0]
      const value = obj[field]

      !found
        ? (outcome = concat(outcome, [{ '@title': field, value: [value] }]))
        : (found.value = concat(found.value, [value]))
    })
  })

  return outcome
}

const defaultTableFilterExactMatch = (column) => (filter, row) =>
  row[filter.id].startsWith(filter.value) &&
  row[filter.id].endsWith(filter.value)

const defaultTableFilterRelativeMatch = (column) => (filter, rows = []) => {
  return matchSorter(rows, filter.value, { keys: [column.accessor] })
}

// For columns array, add proper Cell controller to columns of interest.
// tableSortMethods object is used in enhanceColumnProps function.
const tableSortMethods = {
  'default': (a, b) => {
    return a - b
  },
  'number': (a, b) => {
    if (isNaN(a)) return -1
    if (isNaN(b)) return 1
    return parseFloat(a) - parseFloat(b)
  }
}
export const enhanceColumnProps = (columns, controller, provider, section, state, data, verticalHeaderFlag) => {
  if (!controller || columns.length < 1 || !data) {
    return columns
  }

  if (!verticalHeaderFlag) {
    return columns.map((column) => {
      let aColumn = column.Cell ? { ...column, Cell: typeof controller[column.Cell] === 'function' ? controller[column.Cell](provider, section, state) : '-' } : column
      aColumn = column.filterMethod
        ? {
          ...aColumn,
          filterMethod: controller && controller[column.filterMethod] && typeof controller[column.filterMethod] === 'function'
            ? controller[column.filterMethod] : null
        } : aColumn

      if (column.filterOption) {
        if (column.filterOption === 'exactMatch') {
          aColumn.filterMethod = defaultTableFilterExactMatch(column)
        } else {
          aColumn.filterMethod = defaultTableFilterRelativeMatch(column)
          aColumn.filterAll = true
        }
      }
      if (column.sortMethod && typeof get(aColumn, 'sortMethod', '') !== 'function') {
        if (typeof get(controller, column.sortMethod, '') === 'function') {
          aColumn.sortMethod = controller[column.sortMethod]
        } else {
          aColumn.sortMethod = get(tableSortMethods, column.sortMethod, tableSortMethods['default'])
        }
      }

      return aColumn
    })
  }

  const renderCell = (i) => (row) => {
    if (!row || !row.value) {
      return renderVerticalTableCellValue('')
    }

    return renderVerticalTableCellValue(i !== undefined ? row.value[i] : row.value)
  }

  const maxValue = reduce(data, (result, ele) => {
    if (!ele.value || !Array.isArray(ele.value)) {
      return result
    }

    return result < ele.value.length ? ele.value.length : result
  }, 0)

  const enhancedColumns = [
    {
      accessor: '@title',
      Cell: renderCell()
    }
  ]

  times(maxValue, (i) => enhancedColumns.push({
    accessor: 'value',
    Cell: renderCell(i)
  }))

  return enhancedColumns
}

// For plain data object, build columns prop with many set of accessor and Header.
export const buildColumnProps = (data, controller = undefined) => {
  if (!data || data.length < 1 || Array.isArray(data[0]) || typeof data[0] !== 'object') {
    return []
  }

  return Object.keys(data[0]).map(key => ({ accessor: key, Header: key }))
}

/**
 * @PERFORMS:
 * Perform AJAX request with pre-defined pattern of callbacks for simplicity and reusability
 *
 * @param {Function} preOpCallback()
 *    a function that returns an object containing options and extra args
 *
 * @param {Function} successCallback(response, args)
 *    a void, optional function
 *
 * @param {Function} failureCallback(err, args)
 *    a void, optional function
 *
 * @return void
 **/
export const ajaxRequestWithAxios = async (preOpCallback, successCallback, failureCallback) => {
  if (preOpCallback()) {
    const { options, args = {} } = preOpCallback()
    try {
      if (!options) {
        console.error('Error: options not provided for axios AJAX operation', options)
        return
      }

      const response = await axios(options)
      if (response.status < 200 || response.status > 299) {
        console.error('Error status', response.status, 'Options', options)

        return { ...response, resolvingStatus: 'FAILURE' }
      } else {
        successCallback && successCallback(response, args)

        return { ...response, resolvingStatus: 'SUCCESS' }
      }
    } catch (err) {
      failureCallback && failureCallback(err, args)

      return { ...err, resolvingStatus: 'FAILURE' }
    }
  }
}

export const getAppContext = (appContextConfig) => {
  if (!appContextConfig || !Array.isArray(appContextConfig) || appContextConfig.length < 1) {
    console.error('Error: Invalid appContext configuration in appConfig.json! Since DCLib v0.3.10 appContext is an array of contextField and valueResolver')
    return {}
  }

  let appContextsExist = true

  const queryValues = parseUserURI()
  const appContextQueryParam = appContextConfig.reduce(
    (result, ele) => {
      if (ele.required) { appContextsExist = has(queryValues, ele.contextField) }
      if (!ele.contextField) { return result }
      return {
        ...result,
        [ele.contextField]: queryValues[replaceString(ele.contextField, ':query.', '')] || ele.defaultValue
      }
    },
    {}
  )

  if (!appContextsExist) {
    notifyMessage('', 'Missing URL querystrings to match the required configuration of appContext in appConfig.json', 'error', 'top-center')
    return {}
  }

  return appContextQueryParam
}

const ajaxURIBuilder = (url, qs, state, dispatch, actions) => {
  const queryRegex = /:query.\w*/gm
  const sourceRegex = /:source(\.[^(.[,\])]\w*(\[\d*])*)*/gm
  const appContextRegex = /:appContext.\w*/gm
  // :source(\.[^(.|,|\[|\])]\w*(\[\d*\])*)*

  const queryMatches = url.match(queryRegex)
  const sourceMatches = url.match(sourceRegex)
  const appContextMatches = url.match(appContextRegex)

  if (dispatch && actions) {
    // TODO (optional) Should any change, dispatch an action to update queryContext into Redux source object, source.queryContext
    const queryContext = queryMatches && queryMatches.reduce((result, ele) => ({ ...result, [replaceString(ele, ':query.', '')]: qs[replaceString(ele, ':query.', '')] || '' }), {})
    queryContext && actions.setQueryContext && dispatch(actions.setQueryContext(queryContext))
  }

  const queryDict = queryMatches && queryMatches.reduce((result, ele) => ({ ...result, [ele]: qs[replaceString(ele, ':query.', '')] }), {})
  const sourceDict = sourceMatches && sourceMatches.reduce((result, ele) => ({ ...result, [ele]: get(state.source, replaceString(ele, ':source.', ''), '') }), {})
  const appContextQueryParam = get(state, '_init.fullAppConfig.appContextQueryParam')
  const appContextDict = appContextMatches && appContextMatches.reduce((result, ele) => ({ ...result, [ele]: get(appContextQueryParam, replaceString(ele, ':appContext.', ''), '') }), {})
  let ajaxURI = url
  if (sourceDict && Object.keys(sourceDict).length > 0) {
    Object.keys(sourceDict).map(sourceKey => {
      ajaxURI = replaceString(ajaxURI, sourceKey, sourceDict[sourceKey])
    })
  }

  if (queryDict && Object.keys(queryDict).length > 0) {
    Object.keys(queryDict).map(key => {
      ajaxURI = replaceString(ajaxURI, key, queryDict[key])
    }, '')
  }

  if (appContextDict && Object.keys(appContextDict).length > 0) {
    Object.keys(appContextDict).map(key => {
      ajaxURI = replaceString(ajaxURI, key, appContextDict[key])
    }, '')
  }
  return ajaxURI
}

export const parseUserURI = () => {
  // location.search starts with '?'
  const search = location.search.substring(1)
  const qs = (!(search.includes('#')) && search && JSON.parse(
    `{"${search.replace(/&/g, '","').replace(/=/g, '":"')}"}`,
    (key, value) => {
      return key === '' ? value : decodeURIComponent(value)
    }
  )) || {}
  return qs
}

export const pageTitleRender = (pagetitle) => {
  const queryContextObj = parseUserURI() || {}
  const currField = replaceString(pagetitle, ':query.', '')
  return queryContextObj[currField]
}

export const ajaxOptionsBuilder = (url, currentLoadAction, state, appContextQueryParam, dispatch, actions = {}, ...args) => {
  const queryContextObj = parseUserURI() || {}
  const ajaxURI = ajaxURIBuilder(url, queryContextObj, state, dispatch, actions)
  const requestBody = requestBodyBuilder(currentLoadAction, queryContextObj, ...args)

  const options = { url: ajaxURI, method: currentLoadAction.method || 'GET' }

  function requestBodyBuilder (currentLoadAction, queryContextObj, ...args) {
    let payload = {}

    currentLoadAction.data && Object.keys(currentLoadAction.data).length > 0 && Object.keys(currentLoadAction.data).map((key) => {
      if (currentLoadAction.data[key].includes && currentLoadAction.data[key].includes(':query.')) {
        const currentKey = currentLoadAction.data[key]
        const queryValues = currentKey.match(/(?<names>:query.[a-zA-Z0-9]+)+/g)
        const queryObj = {}
        queryValues.forEach(val => {
          queryObj[val] = replaceString(val, ':query.', '')
        })
        let value = currentLoadAction.data[key]
        Object.keys(queryObj).forEach(val => {
          const re = new RegExp(`${val}`, 'g')
          value = value.replace(re, queryContextObj[queryObj[val]])
        })
        payload = { ...payload, [key]: value }
      } else if (currentLoadAction.data[key].includes && (currentLoadAction.data[key].includes(':appContext.')) && appContextQueryParam) {
        const currField = replaceString(currentLoadAction.data[key], ':appContext.', '')
        payload = { ...payload, [key]: appContextQueryParam[currField] || '' }
      } else if (currentLoadAction.data[key].includes && currentLoadAction.data[key].includes(':source.')) {
        const currField = replaceString(currentLoadAction.data[key], ':source.', '')
        payload = { ...payload, [key]: get(state.source, currField) }
      } else {
        payload = { ...payload, [key]: currentLoadAction.data[key] }
      }
    })
    Array.from(args).map(obj => {
      Object.keys(obj).map(val => {
        payload = { ...payload, [val]: obj[val] }
      })
    })

    return payload
  }

  return Object.keys(requestBody).length > 0 ? { ...options, data: requestBody } : options
}

export const timestampToHours = (timestamp) => {
  const uptimeObj = moment.duration(parseInt(timestamp), 'seconds')
  const { _data: dateObj } = uptimeObj
  const days = dateObj.days
  const hours = dateObj.hours
  const minutes = dateObj.minutes
  const seconds = dateObj.seconds
  const formattedTime = `${days}d ${hours}h ${minutes}m ${seconds}s`
  return formattedTime || ''
}

export const formatBytes = (a, b) => {
  if (a === 0) { return '0 Bytes' }
  const c = 1024
  const d = b || 2
  const e = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']
  const f = Math.floor(Math.log(a) / Math.log(c))
  return parseFloat((a / Math.pow(c, f)).toFixed(d)) + ' ' + e[f]
}

export const notifyMessage = (err, defaultMessage, type, position) => {
  const message = err || defaultMessage
  toast[type](message, {
    position,
    autoClose: 5000,
    closeOnClick: true,
    pauseOnHover: true,
    hideProgressBar: true
  })
}

export const getDataField = (loadAction, context) => {
  const targetDataStore = get(loadAction, `${context}.targetDataStore`, '')
  const targetDataField = get(loadAction, `${context}.targetDataField`, '')
  return {
    dataField: replaceString(targetDataField, `${targetDataStore}.`, ''),
    targetDataStore,
    targetDataField
  }
}

export const getMassagedData = (newState, appLoadAction, context, resType, massagedResData) => {
  const dataField = getDataField(appLoadAction, context).dataField || getDataField(appLoadAction, context).targetDataStore
  return {
    ...get(newState, `serviceInfo.metrics.${resType}`, {}),
    [dataField]: massagedResData
  }
}

export const setEnvColor = (context) => {
  if (!context) return 'default-bg-color'
  if (context.includes('all.dev')) return 'dev-bg-color'
  if (context.includes('all.test')) return 'test-bg-color'
  if (context.includes('all.prod')) return 'prod-bg-color'
}

export const setHealthStatusColor = (clrClass) => {
  let statusColor = 'bdg-default'
  switch (clrClass) {
    case 'OK':
      statusColor = 'bdg-success'
      return statusColor
    case 'ERROR':
      statusColor = 'bdg-error'
      return statusColor
    case 'WARN':
      statusColor = 'bdg-warning'
      return statusColor
    default:
      return statusColor
  }
}

export const ensureFormDataHasEmpties = (formData) => {
  return reduce(formData, (result, ele, key) => {
    const newVal = isNil(ele) ? '' : ele
    return { ...result, [key]: newVal }
  }, {})
}

export async function SerialReduceFlow (jobs) {
  if (!Array.isArray(jobs) || !jobs.every(job => job instanceof Promise)) {
    _throw('ERROR: jobs is not an array of all Promises')
  }

  const outcome = {
    response: {},
    error: {},
    total: 0,
    totalSuccess: 0,
    totalFailure: 0,
    numberOfJobs: jobs.length
  }

  return merge(outcome, await jobs.reduce(async (result, job, idx) => {
    outcome.total++
    const res = await job

    if (res.resolvingStatus === 'SUCCESS') {
      outcome.totalSuccess++
      if (res) {
        outcome.response[idx] = res
      }
    } else {
      outcome.totalFailure++
      if (res.error) {
        outcome.error[idx] = res.error
      }
    }
    return outcome
  }, {}))
}

export default createReduxAction
