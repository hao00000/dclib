import { connect } from 'react-redux'
import { compose, withStateHandlers } from 'recompose'
import UserInfo from '@lib/SchemaX/components/UserInfo'

const mapStateToProps = (state) => {
  const { _init: { fullAppConfig: { appContextQueryString }, provider: { changePage } }, user: { user } } = state
  return { appContextQueryString, changePage, user }
}
const addState = withStateHandlers(
  {
    currentTab: 'userName',
    show: false,
    intervalTime: localStorage.getItem('intervalTime')
  },
  {
    handleClose: (state) => () => {
      return { show : !state.show }
    },
    userAction: () => (event) => {
      event.preventDefault()
      const { name } = event.target
      let currentTab = name
      if (name === 'userName') {
        currentTab = name
      }
      return { currentTab }
    },
    setTimeInterval: (state, props) => (event) => {
      event.preventDefault()
      localStorage.setItem('intervalTime', state.intervalTime)
      props.changePage('?' + props.appContextQueryString)
    },
    changeIntervalTime: () => (event) => {
      const val = parseInt(event.target.value)
      const intervalTime = val * 1000
      if (val >= 5 && val <= 150) {
        return { intervalTime }
      }
    }
  }
)

const mapDispatchToProps = null
const connector = connect(mapStateToProps, mapDispatchToProps)
const enhance = compose(connector, addState)

export default enhance(UserInfo)
