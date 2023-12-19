import get from 'lodash/get'
import reduce from 'lodash/reduce'

const sdInvokerLink = (state) => {
  const { _init: { fullAppConfig: { appContextQueryParam: { serviceName, sdEnvironment } } }, source: { envs } } = state
  const envTypes = get(envs, 'environmentURLs', {})
  const environmentURLs = reduce(envTypes, (result, value) => ({ ...result, ...value }))
  const href = environmentURLs ? get(environmentURLs, sdEnvironment, environmentURLs['DEV01']) : ''
  return envs ? `${href}#/${serviceName}/invoker/body` : ''
}

const showIfPage0Bool = (state) => {
  return false
}

export default {
  sdInvokerLink,
  showIfPage0Bool
}
