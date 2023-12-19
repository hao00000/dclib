import { compose, branch, renderNothing } from 'recompose'
import { connect } from 'react-redux'
import { buildColumnProps, enhanceColumnProps, getVerticalData } from '@lib/SchemaX/utils'
import get from 'lodash/get'
import has from 'lodash/has'
import max from 'lodash/max'
import { isObject } from '@lib/utils'
import TableView from '@lib/SinglePage/components/fixtures/TableView'

const mapStateToProps = (state, { section, pageData, provider = {} }) => {
  return { state, section, pageData, provider }
}

const mapDispatchToProps = null

const mergeProps = (sProps, dProps, oProps) => {
  const { state, section, pageData, provider = {} } = sProps
  const { columns, data, tableSettings = {}, verticalHeader } = section
  const sortId = columns ? get((columns[0] || []), 'accessor', 'name') : 'name'
  const tableItems = data && Array.isArray(data) ? data : (typeof data === 'object') ? [data] : []
  const verticalHeaderFlag = !!verticalHeader
  const sectionData = verticalHeaderFlag ? getVerticalData(tableItems) : tableItems
  const showPagination = get(tableSettings, 'showPagination', (tableItems.length > 50))
  const defaultPageSize = get(tableSettings, 'defaultPageSize', Math.min(50, tableItems.length))

  let loadedTableSettings = {
    ...tableSettings,
    filterable: has(tableSettings, 'filterable') ? tableSettings.filterable : true,
    className: `${tableSettings ? tableSettings.classNames || tableSettings.className || '' : ''} ${verticalHeaderFlag ? 'table-with-vertical-header' : 'table-with-horizontal-header'}`,
    defaultFilterMethod: (filter, row, column) => {
      return String(row[filter.id]).toLowerCase().includes(filter.value.toLowerCase())
    },
    defaultSorted: [{
      id: sortId,
      desc: false
    }],
    showPagination,
    defaultPageSize
  }

  if (loadedTableSettings.showPagination) {
    loadedTableSettings.defaultPageSize = loadedTableSettings.defaultPageSize || 5
  } else {
    loadedTableSettings.defaultPageSize = verticalHeaderFlag
      ? tableItems.length < 1
        ? 0 : max(tableItems.map(tableItem => isObject(tableItem) ? Object.keys(tableItem).length : 0))
      : tableItems.length
  }

  /* PREPARE controllerFunctions
    Find controller based on pagePath
    Generate getTrProps and getTdProps with controller functions based on JSON configuration
   */
  const { pageControllers } = provider
  const pagePath = get(pageData, 'pageMeta.pageController', '')
  const controller = pagePath && pageControllers && pageControllers[pagePath]

  const controllerFunctions = !controller ? {} : {
    getTrProps: controller && section.onClickRow && controller[section.onClickRow],
    getTdProps: controller && section.onClickCell && controller[section.onClickCell]
  }
  /* END PREPARATION */

  /* APPEND into tableProps */
  const tableProps = {
    ...controllerFunctions,
    data: sectionData,
    columns: !columns ? buildColumnProps(data) : enhanceColumnProps(columns, controller, provider, section, state, sectionData, verticalHeaderFlag)
  }

  /* PREPARE loadedTableSettings, allow controller-driven tableSettings can be generated
   * APPEND to the mergedProps outcome */
  if (controller && tableSettings && typeof tableSettings === 'string' && typeof controller[tableSettings] === 'function') {
    loadedTableSettings = controller[tableSettings](provider, section, state)
  }

  return {
    tableProps,
    loadedTableSettings
  }
}

const nothingOr = branch(
  ({ tableProps }) => (!tableProps.data || Object.keys(tableProps.data).length < 1),
  renderNothing
)

const connector = connect(mapStateToProps, mapDispatchToProps, mergeProps)
const enhance = compose(connector, nothingOr)

export default enhance(TableView)
