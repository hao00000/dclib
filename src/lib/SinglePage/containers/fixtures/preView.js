import { compose, branch, renderNothing } from 'recompose'
import PreView from '@lib/SinglePage/components/fixtures/PreView'
import { connect } from 'react-redux'
import get from 'lodash/get'

const mapStateToProps = (state, { section, pageData, provider = {} }) => {
  return { section, pageData, provider, state }
}

const mergeProps = (sProps, dProps, oProps) => {
  const { section, pageData, provider: { pageControllers }, state } = sProps
  const pagePath = get(pageData, 'pageMeta.pageController', '')
  const controller = pagePath && pageControllers[pagePath]
  const renderHandler = controller && section.renderHandler && controller[section.renderHandler]
  let htmlString = renderHandler && section.data ? renderHandler(section.data, state) : section.data
  htmlString = typeof (htmlString) === 'string' ? htmlString : !htmlString || Object.keys(htmlString).length < 1 ? '' : JSON.stringify(htmlString, null, 4)

  return {
    section,
    htmlString
  }
}

const nothingOr = branch(
  ({ htmlString }) => (!htmlString),
  renderNothing
)

const connector = connect(mapStateToProps, null, mergeProps)
const enhance = compose(connector, nothingOr)
export default enhance(PreView)
