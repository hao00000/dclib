import { lifecycle, compose, withStateHandlers } from 'recompose'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as Types from '@lib/SchemaX/actions/ActionTypes'
import get from 'lodash/get'
import { getSectionData } from '@lib/SchemaX/actions/PageActions'
import { replaceString, getErrorMessage, recursiveCheckEmpty } from '@lib/SchemaX/utils'
import GenericView from '@lib/SinglePage/components/layout/GenericView'

const mapStateToProps = (state, { routerContext }) => {
  return { state, routerContext }
}

const mapDispatchToProps = (dispatch) => bindActionCreators({
  updateAppConfig: payload => ({ type: Types.SET_APP_CONFIG_WITH_LATEST_SECTION_DATA, payload }),
  getSectionData
}, dispatch)

const mergeProps = (sProps, dProps, oProps) => {
  const { _init: { provider: { serverURI } }, page: { pagePath }, source, error } = sProps.state
  const { pageData, section: currentSection, sectionKey } = oProps

  const sourceDataStore = get(currentSection, 'sourceDataStore', 'formData')
  const sourceDataField = get(currentSection, 'sourceDataField', '')
  const dataField = replaceString(sourceDataField, `${sourceDataStore}.`, '')
  const sourcingSection = (dataField && dataField !== sourceDataStore) ? `${sourceDataStore}.${dataField}` : sourceDataStore

  const errorData = get(error, sourcingSection, {})

  const errorMessage = recursiveCheckEmpty(errorData) ? '' : getErrorMessage(errorData)

  const data = (!errorMessage) ? get(source, sourcingSection, undefined) : ''

  const section = errorMessage ? { ...currentSection, errorMessage } : data ? { ...currentSection, data } : currentSection

  section.sectionKey = sectionKey

  return {
    ...sProps,
    ...dProps,
    section,
    sectionData: data,
    pageData,
    getSectionData: async () => dProps.getSectionData(serverURI, pagePath, pageData, currentSection, sectionKey)
  }
}

const addComponentDidMount = lifecycle({
  async componentDidMount () {
    const { section: { sectionKey, type } } = this.props
    const cardSection = document.getElementById(`section-${sectionKey}`)
    const sectionBody = cardSection && cardSection.querySelector('.section-body')
    const maxHeight = sectionBody && (getComputedStyle(sectionBody) || {}).maxHeight
    const scrollHeight = (sectionBody || {}).scrollHeight
    const isHidden = scrollHeight <= parseInt(maxHeight) && type !== 'TABLE'
    if (cardSection) {
      cardSection.querySelector('.card-footer-extend').hidden = isHidden
    }
    await this.props.getSectionData()
  }
})

const addComponentUDidUpdate = lifecycle({
  async componentDidUpdate () {
    const { section: { sectionKey, type } } = this.props
    const cardSection = document.getElementById(`section-${sectionKey}`)
    const sectionBody = cardSection && cardSection.querySelector('.section-body')
    const maxHeight = sectionBody && (getComputedStyle(sectionBody) || {}).maxHeight
    const scrollHeight = (sectionBody || {}).scrollHeight
    const isHidden = scrollHeight <= parseInt(maxHeight) && type !== 'TABLE'
    if (cardSection) {
      cardSection.querySelector('.card-footer-extend').hidden = isHidden
    }
  }
})

const addState = withStateHandlers(
  ({ section }) => ({
    sectionExpand: section.type === 'TABLE' || get(section, 'showAllContent', true),
    collapseSection: false
  }),
  {
    handleClick: (state) => () => {
      return ({ sectionExpand: !state.sectionExpand })
    },
    handleCollapse: (state) => () => {
      return ({
        collapseSection: !state.collapseSection
      })
    }
  }
)

// const whenNothing = branch(({ sectionData }) => !sectionData || sectionData.length < 1 || Object.keys(sectionData).length < 1, renderNothing)

const connector = connect(mapStateToProps, mapDispatchToProps, mergeProps)

const enhance = compose(connector, addComponentDidMount, addComponentUDidUpdate, addState)

export default enhance(GenericView)
