import { connect } from 'react-redux'
import get from 'lodash/get'
import reduce from 'lodash/reduce'
import SecondNavBarSection from '@lib/SchemaX/components/SecondNavBarSection'

const mapStateToProps = (state) => {
  const { _init: { fullAppConfig: { appContextQueryString, appContextQueryParam: appContext } }, source: { envs } } = state
  const envTypes = get(envs, 'environmentURLs', {})
  const environmentURLs = reduce(envTypes, (result, value) => ({ ...result, ...value }))
  const { sdEnvironment = undefined } = appContext
  const sdEnv = sdEnvironment || 'DEV01'
  const sdLink = environmentURLs ? `${environmentURLs[sdEnv]}` : ''

  const contextLink = `?serviceName=${appContext.serviceName}&host=${appContext.host}&port=${appContext.port}&sdEnv=${sdEnv}#/servicedebugger/${appContext.serviceName}/debug/index.html`
  return { appContextQueryString, appContext, contextLink, navBarItems: [], sdLink, sdEnv }
}

const mapDispatchToProps = null
const connector = connect(mapStateToProps, mapDispatchToProps)

export default connector(SecondNavBarSection)
