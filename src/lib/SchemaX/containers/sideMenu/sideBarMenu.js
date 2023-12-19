import { connect } from 'react-redux'
import { compose, withStateHandlers } from 'recompose'
import get from 'lodash/get'
import flatten from 'lodash/flatten'
import SideBarMenu from '@lib/SchemaX/components/sideMenu/SideBarMenu'
import { actionSetCurrentPageData, getPageData, openLinkedPage, actionUpdateCurrentPageDataFetching } from '@lib/SchemaX/actions/PageActions'
import { queryStringBuilder, setEnvColor, stringBuilderWithEncode } from '@lib/SchemaX/utils/index'

function mapStateToProps (state, appConfigDataFromProps) {
  const { appConfigData } = appConfigDataFromProps
  const {
    _init: { provider: { serverURI, pageSchemas }, fullAppConfig: { appContextQueryString, menu } },
    source: { dataStore, contextInfo },
    page: { pageData, pagePath }
  } = state

  const contextLayer = get(contextInfo, 'context.layer', '')
  const envColor = setEnvColor(contextLayer)

  return {
    state,
    serverURI,
    appContextQueryString,
    dataStore,
    pageData,
    pagePath,
    appConfigData,
    pageSchemas,
    menu,
    envColor
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getPageData: (pageSchemas, data, pageKey, path, serverURI) => dispatch(getPageData(pageSchemas, data, pageKey, path, serverURI)),
    onPageClickHandler: (page, appContextQueryString) => {
      if (page.type === 'LINK_PAGE' && page.viewType !== 'Iframe') {
        dispatch(openLinkedPage(page))
      } else {
        if (page.queryParams) {
          const queryParamsUrlString = stringBuilderWithEncode(page.queryParams)
          appContextQueryString = appContextQueryString ? appContextQueryString + '&' + queryParamsUrlString : queryParamsUrlString
        }

        const urlString = queryStringBuilder(page.path, appContextQueryString)

        // It is important to clear pageData before sending user to a new page
        dispatch(actionUpdateCurrentPageDataFetching.setIsPageDataFetching(true, 'isPageDataFetching'))
        dispatch(actionSetCurrentPageData.setPageData({}))

        // TODO: verify page data fully loaded before sending user to that page!
        if (window.location.hash.length > 2 && window.location.search.substring(1) !== appContextQueryString) {
          window.history.pushState({ path: urlString }, '', urlString)
        }

        window.location.href = urlString
      }
    }
  }
}

const mergeProps = (sProps, dProps, oProps) => {
  const { appContextQueryString, state } = sProps
  const { onPageClickHandler } = dProps
  const { _init: { provider: { appController } } } = state

  const onPageClick = (page) => {
    onPageClickHandler(page, appContextQueryString)
  }
  const pageShowOrHidden = (page) => {
    let pageShowIf = get(page, 'showIf', '')
    if (pageShowIf && appController && appController[pageShowIf] && typeof appController[pageShowIf] === 'function') {
      pageShowIf = appController[pageShowIf](state)
    }
    return pageShowIf
  }

  return {
    ...sProps,
    ...dProps,
    onPageClick,
    pageShowOrHidden,
    state
  }
}

const addState = withStateHandlers(
  (props) => {
    const activeSubMenuPaths = props.menu.map((val, mKey) => val.subMenu.map((subMenu, sKey) => `menu[${mKey}].subMenu[${sKey}]`))
    const activeMenuPaths = props.menu.map((val, mKey) => `menu[${mKey}]`)
    return {
      activeSubMenuPaths: flatten(activeSubMenuPaths),
      activeMenuPaths: flatten(activeMenuPaths)
    }
  },
  {
    toggleSubMenu: (state) => (e, mKey, sKey) => {
      e.preventDefault()
      const subMenuPath = `menu[${mKey}].subMenu[${sKey}]`
      const active = state.activeSubMenuPaths.includes(subMenuPath)
      const newPaths = [...state.activeSubMenuPaths]
      active ? newPaths.splice(state.activeSubMenuPaths.indexOf(subMenuPath), 1) : newPaths.push(subMenuPath)
      return ({
        ...state,
        activeSubMenuPaths: newPaths
      })
    },
    toggleMenu: (state) => (e, mKey) => {
      e.preventDefault()
      const menuPath = `menu[${mKey}]`
      const active = state.activeMenuPaths.includes(menuPath)
      const newPaths = [...state.activeMenuPaths]
      active ? newPaths.splice(state.activeMenuPaths.indexOf(menuPath), 1) : newPaths.push(menuPath)
      return ({
        ...state,
        activeMenuPaths: newPaths
      })
    },
    handleClick: (state, props) => (e, page) => {
      e.preventDefault()
      props.onPageClick(page)
    }
  }
)

const connector = connect(mapStateToProps, mapDispatchToProps, mergeProps)

const enhance = compose(connector, addState)

export default enhance(SideBarMenu)
