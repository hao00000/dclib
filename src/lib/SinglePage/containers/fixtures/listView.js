import { branch, compose, renderNothing } from 'recompose'
import ListView from '@lib/SinglePage/components/fixtures/ListView'
import get from 'lodash/get'
import { MapToArrayList } from '@lib/SchemaX/utils'
import { connect } from 'react-redux'

const mapStateToProps = (state) => {
  return { state }
}

const mergeProps = (sProps, dProps, oProps) => {
  const state = get(sProps, 'state', {})
  const section = get(oProps, 'section', {})

  const title = get(section, 'title', '')
  const data = get(section, 'data', [])

  const listItems = data && Array.isArray(data)
    ? data : typeof data === 'object'
      ? MapToArrayList(data) : []

  const pagePath = get(state, 'page.pageData.pageMeta.pageController', '')
  const pageControllers = get(state, '_init.provider.pageControllers', {})
  const controller = pagePath && pageControllers[pagePath]
  const renderHandlerRef = get(section, 'renderHandler', '')

  const renderHandler = controller[renderHandlerRef] && typeof controller[renderHandlerRef] === 'function' && controller[renderHandlerRef]

  return ({
    ...sProps,
    ...oProps,
    title,
    listItems,
    section,
    renderHandler,
    state
  })
}

const nothingOr = branch(
  ({ listItems }) => (listItems.length < 1),
  renderNothing
)

const connector = connect(mapStateToProps, null, mergeProps)
const enhance = compose(connector, nothingOr)
export default enhance(ListView)
