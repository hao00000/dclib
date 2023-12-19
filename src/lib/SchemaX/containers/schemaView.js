import React from 'react'
import { lifecycle, compose, renderComponent, branch, withStateHandlers } from 'recompose'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { actions as appActions } from '@lib/SchemaX/store/dataStore'
import SchemaView from '@lib/SchemaX/components/SchemaView'
import * as Types from '@lib/SchemaX/actions/ActionTypes'
import { pagesDictionaryBuilder, enhanceAppConfigData, setEnvColor, getFlattenObj, getQueryParams } from '@lib/SchemaX/utils'
import {
  actionSetCurrentPageData,
  actionSetNewPagesDictKey,
  getPageData,
  getSectionData
} from '@lib/SchemaX/actions/PageActions'
import { actionSetSourceDataStore, getAppData, getServiceInfoData, actionSetAlertModal } from '@lib/SchemaX/actions/SourceActions'
import { isObject } from '@lib/utils'
import concat from 'lodash/concat'
import merge from 'lodash/merge'
import get from 'lodash/get'
import find from 'lodash/find'
import LoaderFactory from '@lib/SinglePage/containers/fixtures/loaderFactory'
import AddQueryParams from '@lib/SchemaX/containers/addQueryParams'

const mapStateToProps = ({ app: { item: loadedAppData }, _init: { fullAppConfig }, page: { pagesDict }, source: { isAppDataFetching, contextInfo }, serviceInfo }, { appConfig, provider }) => {
  const appConfigData = appConfig
  const contextLayer = get(contextInfo, 'context.layer', '')
  const envColor = setEnvColor(contextLayer)
  return { appConfigData, loadedAppData, pagesDict, fullAppConfig, appConfig, provider, envColor, isAppDataFetching }
}
const mapDispatchToProps = (dispatch) => bindActionCreators({
  ...appActions,
  setAppProvider: payload => ({ type: Types.SET_APP_PROVIDER, payload }),
  setFullAppConfig: payload => ({ type: Types.SET_FULL_APP_CONFIG, payload }),
  setPagesDict: payload => actionSetNewPagesDictKey.setPagesDict(payload),
  setPageData: payload => actionSetCurrentPageData.setPageData(payload),
  getSectionData,
  getAppData,
  getServiceInfoData,
  getPageData,
  setDataStore: actionSetSourceDataStore.setDataStore,
  setModalBoxDisplay: actionSetAlertModal.setModalBoxDisplay
}, dispatch)

const mergeProps = (sProps, dProps, oProps) => {
  const { provider: appProvider, fullAppConfig } = sProps
  const { serverURI, modules = [] } = appProvider
  const { appConfig } = oProps

  let provider = merge({}, appProvider)

  // extend the current app's appConfig with menu and dependents from every of the modules
  // extend the current app's provider with moduleProvider
  modules.forEach(module => {
    const moduleProvider = get(module, 'moduleProvider', {})
    provider = merge(provider, moduleProvider)
    provider.appCompatibility = get(provider, 'appCompatibility', get(module, 'toolkitCompatibility', ''))
    provider.appName = get(provider, 'appName', get(module, 'name', ''))

    if (isObject(appConfig)) {
      const moduleMenu = get(module, 'moduleConfig.menu', [])
      const moduleDependentPages = get(module, 'moduleConfig.dependents', [])
      const appDependents = get(appConfig, 'dependents', [])

      if (!moduleMenu.some(mMenu => find(appConfig.menu, mMenu))) {
        appConfig.menu = concat(appConfig.menu, moduleMenu)
      }

      if (!moduleDependentPages.some(mDependentPage => find(appDependents, mDependentPage))) {
        appConfig.dependents = concat(appDependents, moduleDependentPages)
      }

      if (!appConfig.homePath) {
        appConfig.homePath = get(module, 'moduleConfig.homePath', '/')
      }
    }
  })

  provider.appController = getFlattenObj(provider.appControllers)
  /*
  * Perhaps, omit unused modules
  *
  * modules.map(module => {
  *   return omit(module, ['moduleProvider', 'moduleConfig'])
  * });
  *
  * */

  return {
    ...sProps,
    ...dProps,
    appConfig,
    provider,
    getSectionData: async (pagePath, pageData, currentSection, sectionKey) => dProps.getSectionData(serverURI, pagePath, pageData, currentSection, sectionKey),
    getAppData: async () => dProps.getAppData(serverURI, fullAppConfig),
    getServiceInfoData: async () => dProps.getServiceInfoData(serverURI),
    changePage: (payload) => {
      window.history.pushState({ path: payload }, '', payload)
      window.location.href = payload
    }
  }
}

/* add the following method to the provider object

@Provider
{
  getSectionData: fn(currentSection, sectionKey)
}
*/

const addLife = lifecycle({
  async componentDidMount () {
    this.props.setAppProvider({
      ...this.props.provider,

      /**
       * @PERFORMS:
       *  Take the user to another page in the same tab
       * @param {String} payload, the URL to navigate user
       *
       * @return void
       *
       * Example: changePage(urlString)
       **/
      changePage: this.props.changePage,

      /**
       * @PERFORMS:
       *  Toggle ModalBox with an object having boolean flag isOpen and data
       * @param {Object} an object having boolean flag isOpen and data
       *
       * @return void
       *
       * Example: setModalBoxDisplay({ isOpen: payload, data })
       **/
      setModalBoxDisplay: this.props.setModalBoxDisplay,

      /**
       * @PERFORMS:
       *  Store an object of many pagesDict into Redux store for pagesDict
       *  pagesDict is a dictionary responsible for page referencing and rendering when the user click on the left SideBar menu
       *
       * @param {Object} an object of pages
       *
       * @return void
       *
       * Example: setPagesDict(merge(pagesDict, {
       *               [href]: {
       *                   [href]: data
       *               }
       *          }))
       **/
      setPagesDict: this.props.setPagesDict,

      /**
       * @PERFORMS:
       *  Store an object of pageData into Redux store for page.pageData
       *  This is contingent upon the page that the user chooses to view
       *
       * @param {Object} an object of pageData, which is the entire object loaded from pageSchema.json
       *
       * @return void
       *
       * Example: setPageData(pageSchema)
       **/
      setPageData: this.props.setPageData,

      getSectionData: this.props.getSectionData,

      /**
       * @PERFORMS:
       *  Store data into the Redux source
       * @param {Any} payload
       * @param {String} store, e.g. 'store'
       * @param {String} path reference to the store, similar to ${dataStore}.${dataField}, e.g. cachesPage.cacheStatisticResponse
       *
       * @return void
       *
       * Example: setDataStore(payload, 'store', 'cachesPage.cacheStatisticResponse')
       **/
      setDataStore: this.props.setDataStore,

      getPageData: this.props.getPageData
    })

    const appData = this.props.appConfigData

    const enhancedAppData = enhanceAppConfigData(appData)
    await this.props.setFullAppConfig(enhancedAppData)
    if (Object.keys(this.props.pagesDict).length < 1) {
      // pagesDictionaryBuilder
      // const { menu } = this.props.fullAppConfig
      const { menu } = enhancedAppData
      const { dependents = {} } = appData
      this.props.setPagesDict(pagesDictionaryBuilder(menu, dependents))
    }

    await this.props.getAppData()
    await this.props.getServiceInfoData()
  }
})

const addState = withStateHandlers(
  {
    sideBarActive: true,
    showLink: false
  },
  {
    handleSideBar: ({ sideBarActive }) => () => ({ sideBarActive: !sideBarActive })
  }
)

const renderAppLoaderComponent = () => <LoaderFactory loaderPosition={'app-loader'} />

const whenNothing = branch(({ fullAppConfig, pagesDict, isAppDataFetching }) => (!fullAppConfig || Object.keys(fullAppConfig).length < 1 || Object.keys(pagesDict).length < 1 || isAppDataFetching), renderComponent(renderAppLoaderComponent))

const renderAddQueryParams = () => <AddQueryParams />

const { host, port, serviceName, sdEnvironment } = getQueryParams()

const whenNoQueryParams = branch(() => (!getQueryParams() || !host || !port || !serviceName || !sdEnvironment), renderComponent(renderAddQueryParams))

const connector = connect(mapStateToProps, mapDispatchToProps, mergeProps)

const enhance = compose(connector, addLife, addState, whenNoQueryParams, whenNothing)

export default enhance(SchemaView)
