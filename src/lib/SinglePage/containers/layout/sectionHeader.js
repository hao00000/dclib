import { compose } from 'recompose'
import SectionHeader from '@lib/SinglePage/components/layout/SectionHeader'
import { connect } from 'react-redux'

const mapStateToProps = (state, { section, pageData, provider, handleCollapse, children, isCollapsible }) => {
  return { section, pageData, provider, handleCollapse, children, isCollapsible, state }
}

const mapDispatchToProps = null

const connector = connect(mapStateToProps, mapDispatchToProps)
const enhance = compose(connector)
export default enhance(SectionHeader)
