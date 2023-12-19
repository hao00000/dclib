import createReduxAction, {
  _throw,
  ajaxOptionsBuilder,
  ajaxRequestWithAxios,
  regexTest,
  getDataField,
  parseUserURI,
  notifyMessage,
  getMassagedData
} from '@lib/SchemaX/utils'
import get from 'lodash/get'
import isEmpty from 'lodash/isEmpty'
import merge from 'lodash/merge'
import omit from 'lodash/omit'
import dcLibConfig from '@lib/SchemaX/config/dcLibConfig'
import dcLibController from '@lib/SchemaX/controllers/dcLibController'
import dcLibMockConfig from '@lib/SchemaX/config/dcLibMockConfig'

// Redux state: source.dataStore.${page-sourceDataStore}
export const { actions: actionSetSourceDataStore, getUpdateState: getSourceDataStore } = createReduxAction({
  name: 'dataStore',
  path: '',
  customName: '@@factory/SET_SOURCE_DATA_STORE',
  customField: true
})

// Redux state: source.dataStore.${page-sourceDataStore}.${section-sourceDataField}
export const { actions: actionSetSourceDataField, getUpdateState: getSourceDataField } = createReduxAction({
  name: 'dataField',
  path: '@path',
  customName: '@@factory/SET_SOURCE_DATA_FIELD',
  customField: true
})

// Redux state: error.dataStore.${page-sourceDataStore}
export const { actions: actionSetErrorDataStore, getUpdateState: getErrorDataStore } = createReduxAction({
  name: 'errorDataStore',
  path: '',
  customName: '@@factory/SET_ERROR_DATA_STORE',
  customField: true
})

// Redux state: error.dataStore.${page-sourceDataStore}.${section-sourceDataField}
export const { actions: actionSetErrorDataField, getUpdateState: getErrorDataField } = createReduxAction({
  name: 'errorDataField',
  path: '@path',
  customName: '@@factory/SET_ERROR_DATA_FIELD',
  customField: true
})

export const { actions: actionSetServiceInfoDataStore, getUpdateState: getServiceInfoDataStore } = createReduxAction({
  name: 'serviceInfoDataStore',
  path: '',
  customName: '@@factory/SET_SERVICE_INFO_DATA_STORE',
  customField: true
})

export const { actions: actionSetServiceInfoDataField, getUpdateState: getServiceInfoDataField } = createReduxAction({
  name: 'serviceInfoDataField',
  path: '@path',
  customName: '@@factory/SET_SERVICE_INFO_DATA_FIELD',
  customField: true
})

export const { actions: actionSetFormFieldData, getUpdateState: getFormFieldData } = createReduxAction({
  name: 'formFieldData',
  path: '@path',
  customName: '@@factory/SET_FORM_FIELD_DATA',
  customField: true
})

export const { actions: actionSetQueryContext, getUpdateState: getQueryContext } = createReduxAction({
  name: 'queryContext',
  path: '',
  customName: '@@factory/SET_QUERY_CONTEXT'
})

// Redux state: page.formData
export const { actions: actionSetInputForm, getUpdateState: getInputFormData } = createReduxAction({
  name: 'formData',
  path: '',
  customName: '@@factory/SET_INPUT_FORM_DATA'
})

// DEBUG createReduxAction

export const { actions: actionSetTestDataWithCustomPath, getUpdateState: getTestDataWithCustomPath } = createReduxAction({
  name: 'testData',
  path: '@path',
  customName: '@@factory/SET_TEST_DATA_WITH_CUSTOM_PATH',
  customField: true
})

export const { actions: actionSetTestDataWithFixedPath, getUpdateState: getTestDataWithFixedPath } = createReduxAction({
  name: 'testData',
  path: '',
  customName: '@@factory/SET_TEST_DATA_WITH_FIXED_PATH'
})

export const handleReduxStoring = (dispatch, context, loadAction, payload, targetStore = 'source') => {
  const { dataField, targetDataStore, targetDataField } = ((context === 'onFailure' && !getDataField(loadAction, context).targetDataStore) ? getDataField(loadAction, 'onSuccess') : getDataField(loadAction, context))
  if (!targetDataStore) {
    return undefined
  }

  if (['serviceInfo', 'error'].includes(targetStore)) {
    const field = context === 'onSuccess' ? 'metricData' : 'error'
    if (!targetDataField || !dataField || dataField === targetDataStore) {
      dispatch(actionSetServiceInfoDataStore.setServiceInfoDataStore(payload, 'serviceInfoDataStore', `${targetDataStore}.${field}`))
    } else {
      dispatch(actionSetServiceInfoDataField.setServiceInfoDataField(payload, `${targetDataStore}`, field))
    }
  } else {
    if (!targetDataField || !dataField || dataField === targetDataStore) {
      dispatch(actionSetSourceDataStore.setDataStore((context === 'onSuccess' ? payload : {}), 'dataStore', targetDataStore))
      dispatch(actionSetErrorDataStore.setErrorDataStore((context === 'onSuccess' ? {} : payload), 'dataStore', targetDataStore))
    } else {
      dispatch(actionSetSourceDataField.setDataField((context === 'onSuccess' ? payload : {}), `${targetDataStore}`, dataField))
      dispatch(actionSetErrorDataField.setErrorDataField((context === 'onSuccess' ? {} : payload), `${targetDataStore}`, dataField))
    }
  }
}

export const { actions: actionSetAlertModal, getUpdateState: getAlertModal } = createReduxAction({
  name: 'modalBoxDisplay',
  path: '',
  customName: '@@factory/SET_ALERT_MODAL'
})

export const getLoadActionList = (loadActionList) => {
  if (loadActionList && !Array.isArray(loadActionList)) loadActionList = [loadActionList]
  return loadActionList && loadActionList.length > 0 && loadActionList
}

export const getServiceInfoData = (serverURI) => async (dispatch, getState) => {
  const state = getState()
  const { isDcLib } = state._init.provider
  const appConfigData = {}

  // Need to remove this mockFile "dcLibConfig" while refactoring
  let appLoadActionList = get(isDcLib ? dcLibMockConfig : dcLibConfig, 'serviceInfo.loadAction', '')
  appLoadActionList = getLoadActionList(appLoadActionList)
  if (!appLoadActionList) { return undefined }
  let appLoadAction = {}
  const newMetricsAPI = appLoadActionList.find(val => val.data.method === 'getApplicationRuntimeInfo')
  const oldMetricsAPI = appLoadActionList.filter(val => ['extendedInfo', 'getMBeans'].includes(val.data.method))
  if (newMetricsAPI && newMetricsAPI.url) {
    appLoadAction = merge({}, newMetricsAPI)
    await ajaxRequestWithAxios(preOpCallback, successCallback, failureCallback)
  }

  function preOpCallback () {
    if (appLoadAction.url) {
      // TODO define payload as params in cachDebugger.json and load it from there
      // const payload = { 'method': 'dump' }

      // whether to bypass serverURI as main provider server, and allow use of a 3rd party server.
      const url = !regexTest('^(?:https?://)', appLoadAction.url) ? serverURI + appLoadAction.url : appLoadAction.url

      const options = ajaxOptionsBuilder(url, appLoadAction, state, {}, dispatch, {})

      return { options, args: { appLoadAction } }
    }
  }
  function successCallback (response, { appLoadAction }) {
    const resData = get(response, 'data', {})
    const massagedResData = resData
    let massagedData = {}
    const dataField = getDataField(appLoadAction, 'onFailure').dataField || getDataField(appLoadAction, 'onFailure').targetDataStore
    const newState = { ...getState() }
    // To omit the previous error
    const massagedErr = omit(get(newState, 'serviceInfo.metrics.error', {}), [dataField]) || {}
    handleReduxStoring(dispatch, 'onFailure', appLoadAction, massagedErr, 'error')
    massagedData = getMassagedData(newState, appLoadAction, 'onSuccess', 'metricData', massagedResData)
    handleReduxStoring(dispatch, 'onSuccess', appLoadAction, massagedData, 'serviceInfo')
  }

  async function newMetricsFallback () {
    await oldMetricsAPI.map(element => {
      if (element.url) {
        appLoadAction = merge({}, element)
        ajaxRequestWithAxios(preOpCallback, successCallback, failureCallback)
      }
    })
  }

  function failureCallback (err, { appLoadAction }) {
    if (appLoadAction.data.method === 'getApplicationRuntimeInfo') newMetricsFallback()
    else {
      const massagedErr = err
      const newState = { ...getState() }
      let massagedError = {}
      massagedError = getMassagedData(newState, appLoadAction, 'onFailure', 'error', massagedErr)
      handleReduxStoring(dispatch, 'onFailure', appLoadAction, massagedError, 'serviceInfo')
      _throw(massagedErr)
    }
  }
  return appConfigData
}

export const getAppData = (serverURI, appConfig) => async (dispatch, getState) => {
  const state = getState()
  const { appController: controller, isDcLib } = state._init.provider
  let dcLoadActionList = get(isDcLib ? dcLibMockConfig : dcLibConfig, 'appMeta.loadAction', '')
  let appLoadActionList = get(appConfig, 'appMeta.loadAction', '')
  appLoadActionList = getLoadActionList(appLoadActionList) || []
  dcLoadActionList = getLoadActionList(dcLoadActionList) || []
  const loadActionList = [...appLoadActionList, ...dcLoadActionList]
  if (!appLoadActionList || !dcLoadActionList) {
    dispatch(actionSetSourceDataField.setDataField(false, 'isAppDataFetching'))
    return undefined
  }

  let appConfigData = { ...appConfig }

  let appLoadAction = {}
  const queryContextObj = parseUserURI() || {}
  if (isEmpty(queryContextObj)) {
    notifyMessage('', 'Host name, port and service name are not specified', 'error', 'top-center')
    return
  }

  await loadActionList.map(async element => {
    if (element.url) {
      appLoadAction = merge({}, element)
      ajaxRequestWithAxios(() => preOpCallback(appLoadAction), successCallback, failureCallback)
    } else {
      return appConfigData
    }
  })

  function preOpCallback (appLoadAction) {
    if (appLoadAction.url) {
      // TODO define payload as params in cachDebugger.json and load it from there
      // const payload = { 'method': 'dump' }

      // whether to bypass serverURI as main provider server, and allow use of a 3rd party server.
      const url = !regexTest('^(?:https?://)', appLoadAction.url) ? serverURI + appLoadAction.url : appLoadAction.url

      const options = ajaxOptionsBuilder(url, appLoadAction, state, {}, dispatch, {})

      return { options, args: { appLoadAction } }
    }
  }
  function successCallback (response, { appLoadAction }) {
    const resData = get(response, 'data', {})
    const successHandler = get(appLoadAction, 'onSuccess.successHandler', '')
    const massagedResData = successHandler && controller && controller[successHandler]
      ? controller[successHandler](resData, state)
      : (successHandler && dcLibController && dcLibController[successHandler]
        ? dcLibController[successHandler](resData, state)
        : resData)
    appConfigData = { ...appConfigData, ...massagedResData }
    handleReduxStoring(dispatch, 'onSuccess', appLoadAction, massagedResData)
    dispatch(actionSetSourceDataField.setDataField(false, 'isAppDataFetching'))
  }

  function failureCallback (err, { appLoadAction }) {
    const fallback = get(appLoadAction, 'onFailure.fallback', undefined)
    if (fallback) {
      const newPageLoadAction = { ...appLoadAction, ...fallback }
      delete newPageLoadAction.onFailure.fallback // to avoid recursive fallback call on the continious failure
      ajaxRequestWithAxios(() => preOpCallback(newPageLoadAction), successCallback, failureCallback)
    } else {
      const failureHandler = get(appLoadAction, 'onFailure.failureHandler', '')
      const massagedErr = failureHandler && controller && controller[failureHandler] ? controller[failureHandler](err, state) : err
      handleReduxStoring(dispatch, 'onFailure', appLoadAction, massagedErr)
      dispatch(actionSetSourceDataField.setDataField(false, 'isAppDataFetching'))
      _throw(massagedErr)
    }
  }

  return appConfigData
}
