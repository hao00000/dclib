import { connect } from 'react-redux'
import get from 'lodash/get'
import reduce from 'lodash/reduce'
import { compose, withStateHandlers } from 'recompose'
import NavBarWithTooltip from '@lib/SchemaX/components/fixtures/NavBarWithTooltip'

const mapStateToProps = (state, { navBarItems = [], contextLink }) => {
  const { _init: { fullAppConfig: { appContextQueryString, appContextQueryParam: appContext } }, source: { envs } } = state
  const envTypes = get(envs, 'environmentURLs', {})
  const environmentURLs = reduce(envTypes, (result, value) => ({ ...result, ...value }))
  const { sdEnvironment = undefined } = appContext
  const sdEnv = sdEnvironment || 'DEV01'
  const sdLink = environmentURLs ? `${environmentURLs[sdEnv]}` : ''

  return { navBarItems, appContextQueryString, appContext, contextLink, sdLink }
}

const mapDispatchToProps = null

const addState = withStateHandlers(
  {
    tooltipDict: {},
    dropdownOpen: false
  },
  {
    toggleDropdown: (state) => () => ({ dropdownOpen : !state.dropdownOpen }),
    toggleTooltip: ({ tooltipDict }) => (e, key) => {
      e.preventDefault()
      tooltipDict[key] = !tooltipDict[key] || false
      return tooltipDict
    },
    handleClick: (state, props) => (e, name, version) => {
      e.preventDefault()
      window.open(`?${props.appContextQueryString}#/servicedebugger/debug/${name}/${version}/index.html`, '_blank')
    }
  }
)

const connector = connect(mapStateToProps, mapDispatchToProps)

const enhance = compose(connector, addState)

export default enhance(NavBarWithTooltip)
