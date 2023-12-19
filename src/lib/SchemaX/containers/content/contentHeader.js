import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { lifecycle, compose } from 'recompose'
import ContentHeader from '@lib/SchemaX/components/content/ContentHeader'
import get from 'lodash/get'
import reduce from 'lodash/reduce'
import merge from 'lodash/merge'
import { fetchUserDetails } from '@lib/SchemaX/actions/UserFetch'
import isEmpty from 'lodash/isEmpty'
import { getServiceInfoData } from '@lib/SchemaX/actions/SourceActions'
import { setEnvColor, parseUserURI, stringBuilder } from '@lib/SchemaX/utils'

const mapStateToProps = (state, { handleSideBar, bodySize }) => {
  const { _init: { fullAppConfig, provider: { serverURI, appCompatibility, appName } }, serviceInfo: { metrics }, page: { pagesDict, pageData }, source: { versions = [], envs = {}, contextInfo = {}, peerInfo = {} } } = state
  const { appContextQueryParam: appContext, appContextQueryString } = fullAppConfig
  const appInfoError = get(metrics, 'error', {})
  const errorMessage = Object.keys(appInfoError).join(', ')
  let summaryInfo = {}, threadCountInfo = {}, appInfo = {}, allInfo = {}
  if (!get(metrics, 'metricData.serviceInfo._error', '') && get(metrics, 'metricData.serviceInfo', '')) {
    appInfo = get(metrics, 'metricData.serviceInfo', {})
  } else {
    summaryInfo = get(metrics, 'metricData.summaryInfo', {})
    threadCountInfo = get(metrics, 'metricData.threadCountInfo', {})
  }
  let contentHeaderProps = { handleSideBar }
  const peersList = get(peerInfo, 'peerList.result', [])
  const appContextValues = {
    host: appContext.host,
    adminPort: appContext.port
  }
  const totalPeersList = [ ...peersList, appContextValues ]
  const selectedPagePath = get(pageData, 'path', '')
  if (!isEmpty(summaryInfo) && !isEmpty(threadCountInfo)) {
    allInfo = merge({}, summaryInfo, threadCountInfo, contextInfo)
    appInfo = {
      'container': get(allInfo, 'context.container', '-'),
      'toolkitCompatibilityVersion': get(allInfo, 'context.toolkitCompatibilityVersion', '-'),
      'partition': get(allInfo, 'host.configContextInfo.partition', '-'),
      'totalMemory': get(allInfo, 'host.totalMemory', 0),
      'healthStatus': get(allInfo, 'healthStatus', '-'),
      'threadCount': get(allInfo, 'mbeans["java.lang:type=Threading"].ThreadCount', '-'),
      'freeMemory': get(allInfo, 'host.freeMemory', 0),
      'uptime': get(allInfo, 'host.uptime', 0)
    }
  }
  const contextLayer = get(contextInfo, 'context.layer', '')
  const envColor = setEnvColor(contextLayer)
  contentHeaderProps = merge({}, contentHeaderProps, { appInfo, appContext })
  return { contentHeaderProps, versions, envs, appCompatibility, appName, fullAppConfig, serverURI, appContextQueryString, pagesDict, envColor, appInfoError, errorMessage, peersList: totalPeersList, selectedPagePath, bodySize, contextLayer }
}

const buildDebugVersionLink = (version, envs, appContext) => {
  const envTypes = get(envs, 'environmentURLs', {})
  const environmentURLs = reduce(envTypes, (result, value) => ({ ...result, ...value }))
  const sdEnvironment = get(appContext, 'sdEnvironment', undefined)
  const sdEnv = sdEnvironment || 'DEV01'
  const sdLink = environmentURLs ? `${environmentURLs[sdEnv]}` : ''
  let link = sdLink.replace('/index.html', `/debug/${get(appContext, 'serviceName', '')}/version/${version}/index.html`)
  const searchObj = parseUserURI()
  const search = stringBuilder(searchObj)
  link += '?' + search + window.location.hash
  return link
}

const mapDispatchToProps = (dispatch) => bindActionCreators({
  getServiceInfoData,
  fetchUserDetails
}, dispatch)

const mergeProps = (sProps, dProps, oProps) => {
  const { fullAppConfig, serverURI, envs, contentHeaderProps: { appContext } } = sProps
  return {
    ...sProps,
    ...dProps,
    getServiceInfoData: async () => dProps.getServiceInfoData(serverURI, fullAppConfig),
    buildDebugVersionLink: (version) => buildDebugVersionLink(version, envs, appContext)
  }
}

const addLife = lifecycle({
  async componentDidMount () {
    this.props.fetchUserDetails()
    if (!localStorage.getItem('intervalTime')) {
      localStorage.setItem('intervalTime', 5000)
    }
    setInterval(this.props.getServiceInfoData, localStorage.getItem('intervalTime'))
  }
})

const connector = connect(mapStateToProps, mapDispatchToProps, mergeProps)

const enhance = compose(connector, addLife)
export default enhance(ContentHeader)
