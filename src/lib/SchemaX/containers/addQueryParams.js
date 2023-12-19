import { compose, withStateHandlers } from 'recompose'
import AddQueryParams from '@lib/SchemaX/components/AddQueryParams'
import { queryStringBuilder, getQueryParams } from '../utils'

const { host: queryHost, port: queryPort, serviceName: queryServiceName, sdEnvironment: querySdEnvironment } = getQueryParams()

const addState = withStateHandlers(
  {
    serviceName: queryServiceName || '',
    host: queryHost || '',
    port: queryPort || '',
    sdEnvironment: querySdEnvironment || ''
  },
  {
    onSubmit: (state, props) => (e) => {
      e.preventDefault()
      const queryString = { serviceName: state.serviceName, host: state.host, port: state.port, sdEnvironment: state.sdEnvironment }
      const queryUrl = queryStringBuilder('/', queryString)
      window.location.href = queryUrl
    },
    onChangeServiceName: (state) => (e) => {
      return { serviceName : e.target.value }
    },
    onChangeHost: (state) => (e) => {
      return { host : e.target.value }
    },
    onChangePort: (state) => (e) => {
      return { port : e.target.value }
    },
    onChangeSdEnvironment: (state) => (e) => {
      return { sdEnvironment : e.target.value }
    }
  }
)

const enhance = compose(addState)

export default enhance(AddQueryParams)
