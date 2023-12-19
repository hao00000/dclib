import { connect } from 'react-redux'
import SideBarHeader from '@lib/SchemaX/components/sideMenu/SideBarHeader'
import get from 'lodash/get'
import { setEnvColor } from '@lib/SchemaX/utils'

function mapStateToProps (state, { appConfigData }) {
  const {
    _init: {
      fullAppConfig: { appContextQueryString },
      provider: { setModalBoxDisplay }
    },
    source: {
      modalBoxDisplay,
      contextInfo
    }
  } = state
  const contextLayer = get(contextInfo, 'context.layer', '')
  const envColor = setEnvColor(contextLayer)
  return {
    appConfigData,
    homeQueryString: appContextQueryString.length > 0 ? `?${appContextQueryString}` : '',
    contextLayer,
    envColor,
    appContextQueryString,
    modalBoxDisplay,
    setModalBoxDisplay
  }
}
const connector = connect(
  mapStateToProps,
  {}
)

export default connector(SideBarHeader)
