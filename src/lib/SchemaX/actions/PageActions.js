import createReduxAction, {
  _throw,
  ajaxOptionsBuilder,
  ajaxRequestWithAxios,
  regexTest
} from '@lib/SchemaX/utils'
import get from 'lodash/get'
import merge from 'lodash/merge'
import {
  actionSetQueryContext,
  getLoadActionList,
  handleReduxStoring
} from '@lib/SchemaX/actions/SourceActions'
import * as Types from '@lib/SchemaX/actions/ActionTypes'

// Redux state: page.pageData with payload
export const { actions: actionSetCurrentPageData, getUpdateState: getCurrentPageData } = createReduxAction({
  name: 'pageData',
  path: '',
  customName: '@@factory/SET_CURRENT_PAGE_DATA'
})

export const { actions: actionUpdateCurrentPageData, getUpdateState: getUpdatePageData } = createReduxAction({
  name: 'pageData',
  path: '@path',
  customName: '@@factory/UPDATE_CURRENT_PAGE_DATA'
})

// Redux state: page.sectionPath
export const { actions: actionSetSectionPath, getUpdateState: getSectionPath } = createReduxAction({
  name: 'sectionPath',
  path: '',
  customName: '@@factory/SET_CURRENT_SECTION_PATH'
})

// Redux state: page.pagesDict
export const { actions: actionSetNewPagesDictKey, getUpdateState: getNewPagesDictKey } = createReduxAction({
  name: 'pagesDict',
  path: '',
  customName: '@@factory/SET_NEW_PAGES_DICT_KEY'
})

export const { actions: actionUpdateCurrentPageDataFetching, getUpdateState: getUpdatePageDataFetching } = createReduxAction({
  name: 'isPageDataFetching',
  path: '',
  customName: '@@factory/UPDATE_PAGE_DATA_FETCHING'
})

/**
* @PERFORMS:
* 1. Resolves the pageMeta loadAction list and pushes the response to the redux store
*
* @param {String} serverURI - Server URI string (ex: http://localhost:9000)
* @param {Object} pageSchema - A page schema
* @return void
**/
export const getCommonPageData = (serverURI, pageSchema) => async (dispatch, getState) => {
  let pageLoadActionList = get(pageSchema, 'pageMeta.loadAction', '')
  pageLoadActionList = getLoadActionList(pageLoadActionList)
  if (!pageLoadActionList || !Array.isArray(pageLoadActionList) || !pageLoadActionList.some(loadAction => typeof loadAction.url === 'string' && loadAction.url.length > 0)) {
    dispatch(actionUpdateCurrentPageDataFetching.setIsPageDataFetching(false, 'isPageDataFetching'))
    return undefined
  }

  dispatch(actionUpdateCurrentPageDataFetching.setIsPageDataFetching(true, 'isPageDataFetching'))

  const state = getState()
  const {
    provider: { pageControllers },
    fullAppConfig: { appContextQueryParam }
  } = state._init

  const controllerPath = get(pageSchema, 'pageMeta.pageController', '')
  const controller = controllerPath && pageControllers[controllerPath]
  let pageLoadAction = {}
  let jobs = []
  await pageLoadActionList.map(async element => {
    if (element.url) {
      pageLoadAction = merge({}, element)
      jobs = [...jobs, ajaxRequestWithAxios(() => preOpCallback(pageLoadAction), successCallback, failureCallback)]
    }
  })

  await Promise.all(jobs)

  dispatch(actionUpdateCurrentPageDataFetching.setIsPageDataFetching(false, 'isPageDataFetching'))

  function preOpCallback (pageLoadAction) {
    if (pageLoadAction.url) {
      // whether to bypass serverURI as main provider server, and allow use of a 3rd party server.
      const url = !regexTest('^(?:https?://)', pageLoadAction.url) ? serverURI + pageLoadAction.url : pageLoadAction.url
      // TODO define payload as params in cachDebugger.json and load it from there
      const options = ajaxOptionsBuilder(url, pageLoadAction, state, appContextQueryParam, dispatch, {})

      return { options, args: { pageLoadAction } }
    }
  }

  function successCallback (response, { pageLoadAction }) {
    const resData = get(response, 'data', {})
    let massagedResData = resData
    // TODO retrieve pageKey from pagePath, fallback to pages[${pageKey}]
    const successHandler = get(pageLoadAction, 'onSuccess.successHandler', '')
    if (successHandler) {
      if (controller && controller[successHandler] && typeof controller[successHandler] === 'function') {
        // @override massagedResData
        massagedResData = controller[successHandler](resData, state)
      }
    }
    handleReduxStoring(dispatch, 'onSuccess', pageLoadAction, massagedResData)
    dispatch(actionUpdateCurrentPageDataFetching.setIsPageDataFetching(false, 'isPageDataFetching'))
  }

  function failureCallback (err, { pageLoadAction }) {
    const errData = get(err, 'response', {})
    const fallback = get(pageLoadAction, 'onFailure.fallback', undefined)
    if (fallback) {
      const newPageLoadAction = { ...pageLoadAction, ...fallback }
      delete newPageLoadAction.onFailure.fallback // to avoid recursive fallback call on the continious failure
      ajaxRequestWithAxios(() => preOpCallback(newPageLoadAction), successCallback, failureCallback)
    } else {
      const failureHandler = get(pageLoadAction, 'onFailure.failureHandler', '')
      const massagedErr = failureHandler && controller && controller[failureHandler] && typeof controller[failureHandler] === 'function'
        ? controller[failureHandler](errData, state) : errData
      handleReduxStoring(dispatch, 'onFailure', pageLoadAction, massagedErr)
      dispatch(actionUpdateCurrentPageDataFetching.setIsPageDataFetching(false, 'isPageDataFetching'))
      console.error('Error : ', massagedErr)
    }
  }
}

/**
* @PERFORMS:
* 1. Sets current page path to redux store (page.pagePath)
* 2. Sets curret page schema json to redux store (page.pageData)
* 3. dispatches getCommonPageData to resolve the pageMeta xhr calls and store in redux
*
* @param {Object} pageSchemas - Object of all the individual page schema JSON
* @param {Object} pageData - A Page object from appConfig.json
* @param {String|undefined} path - Current menu path (ex: menu[0].subMenu[0].pages[0]). undefined if the current page is from dependents
* @param {String} serverURI - Server URI string (ex: http://localhost:9000)
* @return void | _throw(error)
**/
export const getPageData = (pageSchemas, pageData, path, serverURI) => async (dispatch, getState) => {
  dispatch({ type: Types.SET_CURRENT_PAGE_PATH, payload: path })
  try {
    const res = { data: pageSchemas[pageData.pageSource] }
    const resData = get(res, 'data', {})
    const pageSchema = { ...pageData, ...resData }
    await dispatch(getCommonPageData(serverURI, pageSchema))
    const state = getState()
    const isPageDataFetching = get(state, 'page.isPageDataFetching', true)
    if (!isPageDataFetching) {
      await dispatch(actionSetCurrentPageData.setPageData(pageSchema))
    }
  } catch (err) {
    console.error('Error : ', err)
    _throw(err)
  }
}

/**
* @PERFORMS
* 1. Each loadAction in the page schema sections is resolved and the response pushes to redux store
* 2. Sets current section path to redux store (page.sectionPath) if the page is not from dependents
*
* @param {String} serverURI - Server URI string (ex: http://localhost:9000)
* @param {String|undefined} path - Current menu path (ex: menu[0].subMenu[0].pages[0]). undefined if the current page is from dependents
* @param {Object} pageSchema - A page schema
* @param {Object} section - A single section from the page schema
* @param {String} key - Index of the section in page schema
* @return {Object} sectionData - XHR Call response
**/
export const getSectionData = (serverURI, pagePath, pageSchema, section, key) => async (dispatch, getState) => {
  let sectionLoadActionList = get(section, 'loadAction', '')
  sectionLoadActionList = getLoadActionList(sectionLoadActionList)
  if (!sectionLoadActionList) {
    return undefined
  }
  let sectionData = { ...section }
  const state = getState()
  const {
    provider: { pageControllers },
    fullAppConfig: { appContextQueryParam }
  } = state._init
  const controllerPath = get(pageSchema, 'pageMeta.pageController', '')
  const controller = controllerPath && pageControllers[controllerPath]

  let sectionLoadAction = {}
  await sectionLoadActionList.map(element => {
    if (element.url) {
      sectionLoadAction = merge({}, element)
      ajaxRequestWithAxios(() => preOpCallback(sectionLoadAction), successCallback, failureCallback)
    } else {
      return sectionData
    }
  })

  function preOpCallback (sectionLoadAction) {
    if (pagePath && key) {
      const sectionPath = `${pagePath}.sections[${key}]`
      dispatch(actionSetSectionPath.setSectionPath(sectionPath))
    }

    if (sectionLoadAction.url) {
      // TODO define payload as params in cachDebugger.json and load it from there
      // const payload = { 'method': 'dump' }
      // whether to bypass serverURI as main provider server, and allow use of a 3rd party server.
      const url = !regexTest('^(?:https?://)', sectionLoadAction.url) ? serverURI + sectionLoadAction.url : sectionLoadAction.url
      const options = ajaxOptionsBuilder(url, sectionLoadAction, state, appContextQueryParam, dispatch, {})
      return { options, args: { sectionLoadAction } }
    }
  }

  function successCallback (response, { sectionLoadAction }) {
    const resData = get(response, 'data', {})
    const successHandler = get(sectionLoadAction, 'onSuccess.successHandler', '')
    const massagedResData = successHandler && controller && controller[successHandler] ? controller[successHandler](resData, state) : resData
    sectionData = { ...sectionData, ...massagedResData }
    handleReduxStoring(dispatch, 'onSuccess', sectionLoadAction, massagedResData)
  }

  function failureCallback (err, { sectionLoadAction }) {
    const errData = get(err, 'response', {})
    const fallback = get(sectionLoadAction, 'onFailure.fallback', undefined)
    if (fallback) {
      const newSubmitLoadAction = { ...sectionLoadAction, ...fallback }
      delete newSubmitLoadAction.onFailure.fallback // to avoid recursive fallback call on the continious failure
      ajaxRequestWithAxios(() => preOpCallback(newSubmitLoadAction), successCallback, failureCallback)
    } else {
      const failureHandler = get(sectionLoadAction, 'onFailure.failureHandler', '')
      const massagedErr = failureHandler && controller && controller[failureHandler] ? controller[failureHandler](errData, state) : errData
      handleReduxStoring(dispatch, 'onFailure', sectionLoadAction, massagedErr)
      console.error('Error : ', massagedErr)
    }
  }

  return sectionData
}

/**
* @PERFORMS
* 1. Resolves the FORM section loadAction list and pushes the response to the redux store
*
* @param {String} serverURI - Server URI string (ex: http://localhost:9000)
* @param {Object} formData - Each form field values which is specified in the FORM section
* @param {Object} pageSchema - A page schema
* @param {Object} section - A FROM section from the page schema
* @return void
**/
export const postFormData = (serverURI, formData, pageSchema, section) => async (dispatch, getState) => {
  const state = getState()
  const {
    provider: { pageControllers },
    fullAppConfig: { appContextQueryParam }
  } = state._init
  const controllerPath = get(pageSchema, 'pageMeta.pageController', '')
  const controller = controllerPath && pageControllers[controllerPath]

  let submitLoadActionList = get(section, 'onSubmit.loadAction', {})
  submitLoadActionList = getLoadActionList(submitLoadActionList)
  if (!submitLoadActionList) {
    return undefined
  }

  let submitLoadAction = {}
  await submitLoadActionList.map(element => {
    if (element.url) {
      submitLoadAction = merge({}, element)
      ajaxRequestWithAxios(() => preOpCallback(submitLoadAction), successCallback, failureCallback)
    }
  })

  function preOpCallback (submitLoadAction) {
    if (submitLoadAction.url) {
      // whether to bypass serverURI as main provider server, and allow use of a 3rd party server.
      // Test URL: http://localhost:1234/DSS/Cache/page1Demo?hostName=xyz.apple.com&port=6000&vehicleName=Audi&favTeam=Manchester
      const url = !regexTest('^(?:https?://)', submitLoadAction.url) ? serverURI + submitLoadAction.url : submitLoadAction.url
      const actions = { setQueryContext: actionSetQueryContext.setQueryContext }
      formData = formData || {}
      const options = ajaxOptionsBuilder(url, submitLoadAction, state, appContextQueryParam, dispatch, actions, formData)

      return { options, args: { submitLoadAction } }
    }
  }

  function successCallback (response, { submitLoadAction }) {
    const resData = get(response, 'data', {})
    const successHandler = get(submitLoadAction, 'onSuccess.successHandler', '')
    const massagedResData = successHandler && controller && controller[successHandler] ? controller[successHandler](resData, state) : resData
    handleReduxStoring(dispatch, 'onSuccess', submitLoadAction, massagedResData)

    return { ...resData, ...massagedResData }
  }

  function failureCallback (err, { submitLoadAction }) {
    const fallback = get(submitLoadAction, 'onFailure.fallback', undefined)
    if (fallback) {
      const newSubmitLoadAction = { ...submitLoadAction, ...fallback }
      delete newSubmitLoadAction.onFailure.fallback // to avoid recursive fallback call on the continious failure
      ajaxRequestWithAxios(() => preOpCallback(newSubmitLoadAction), successCallback, failureCallback)
    } else {
      const failureHandler = get(submitLoadAction, 'onFailure.failureHandler', '')
      const massagedErr = failureHandler && controller && controller[failureHandler] ? controller[failureHandler](err, state) : err
      handleReduxStoring(dispatch, 'onFailure', submitLoadAction, massagedErr)
      console.error('Error : ', massagedErr)
      _throw(massagedErr)
      return undefined
    }
  }
}

export const getLinkedPageUrl = (pageData, state) => {
  let pageLink = get(pageData, 'pageLink', '')
  const { _init: { provider: { appController } } } = state
  if (pageLink && appController && appController[pageLink] && typeof appController[pageLink] === 'function') {
    pageLink = appController[pageLink](state)
  }

  return pageLink
}

export const openLinkedPage = (pageData) => async (dispatch, getState) => {
  const state = getState()
  const pageLink = getLinkedPageUrl(pageData, state)
  return window.open(pageLink, '_blank')
}
