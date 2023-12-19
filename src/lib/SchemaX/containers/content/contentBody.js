import React from 'react'
import { branch, compose, lifecycle, renderComponent } from 'recompose'
import { connect } from 'react-redux'
import ContentBody from '@lib/SchemaX/components/content/ContentBody'
import { parseSharedLink } from '@lib/SchemaX/utils'
import { actionSetCurrentPageData, actionUpdateCurrentPageDataFetching, getPageData } from '@lib/SchemaX/actions/PageActions'
import LoaderFactory from '@lib/SinglePage/containers/fixtures/loaderFactory'

const mapStateToProps = (state, { routerContext }) => {
  const { page: { pageData, pagesDict, isPageDataFetching }, _init: { provider: { serverURI, pageContainers, pageSchemas }, fullAppConfig: { menu, homePath } } } = state
  return { pageSchemas, routerContext, pageData, pagesDict, serverURI, pageContainers, menu, state, isPageDataFetching, homePath }
}
const mapDispatchToProps = dispatch => {
  return {
    getPageData: (pageSchemas, data, pageKey, path, serverURI) => dispatch(getPageData(pageSchemas, data, pageKey, path, serverURI)),
    setPageData: (payload) => dispatch(actionSetCurrentPageData.setPageData(payload)),
    setPageFetching: () => dispatch(actionUpdateCurrentPageDataFetching.setIsPageDataFetching(true, 'isPageDataFetching'))

  }
}

const addLife = lifecycle({
  async componentDidMount () {
    const { serverURI, menu, pagesDict, pageSchemas, homePath } = this.props
    const hashPath = window.location.hash.replace('#', '')
    if (Object.keys(pagesDict).length > 0) {
      const { page = {}, path } = parseSharedLink(menu, hashPath, pagesDict, homePath)
      this.props.setPageFetching()
      this.props.setPageData({})
      this.props.getPageData(pageSchemas, page, path, serverURI)
    }
  }
})

const renderAppLoaderComponent = () => <LoaderFactory loaderPosition={'page-loader'} />

const whenNothing = branch(({ isPageDataFetching }) => isPageDataFetching, renderComponent(renderAppLoaderComponent))

const connector = connect(mapStateToProps, mapDispatchToProps)

const enhance = compose(connector, addLife, whenNothing)

export default enhance(ContentBody)
