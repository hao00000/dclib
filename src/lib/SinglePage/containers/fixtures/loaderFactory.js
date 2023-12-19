import { connect } from 'react-redux'
import { compose, withStateHandlers } from 'recompose'
import LoaderFactory from '@lib/SinglePage/components/fixtures/loader/LoaderFactory'
import { actionSetSourceDataField } from '@lib/SchemaX/actions/SourceActions'
import { actionUpdateCurrentPageDataFetching } from '@lib/SchemaX/actions/PageActions'

const mapStateToProps = ({ source: { isAppDataFetching, isPageDataFetching } }) => {
  return {
    isAppDataFetching,
    isPageDataFetching
  }
}

const mapDispatchToProps = (dispatch) => {
  const closeLoader = () => {
    dispatch(actionSetSourceDataField.setDataField(false, 'isAppDataFetching'))
    dispatch(actionUpdateCurrentPageDataFetching.setIsPageDataFetching(false, 'isPageDataFetching'))
  }
  return { closeLoader }
}

const addSatae = withStateHandlers(
  () => ({ showLoader: true }),
  {
    closeLoader: (state, props) => (showLoader) => {
      props.closeLoader()
      return { showLoader: false }
    }
  }
)

const connector = connect(mapStateToProps, mapDispatchToProps)
const enhance = compose(connector, addSatae)
export default enhance(LoaderFactory)
