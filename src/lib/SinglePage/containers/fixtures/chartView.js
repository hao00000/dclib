import { branch, compose, renderNothing } from 'recompose'
import Chart from '@lib/SinglePage/components/fixtures/charts/Chart'
import { connect } from 'react-redux'
import get from 'lodash/get'

const styleDict = {
  // default line styles object, see recharts docs for more
  LINE: {
    'width': 700,
    'height': 300,
    'marginTop': 5,
    'marginRight': 30,
    'marginBottom': 5,
    'marginLeft': 20
  },
  // default bar styles object
  BAR: {
    'width': 500,
    'height': 300,
    'marginTop': 5,
    'marginRight': 30,
    'marginBottom': 5,
    'marginLeft': 20
  },
  // default area styles object
  AREA: {
    'width': 500,
    'height': 300,
    'marginTop': 10,
    'marginRight': 30,
    'marginBottom': 0,
    'marginLeft': 0
  },
  // default pie styles object
  PIE: {
    'width': 500,
    'height': 300
  },
  // default scatter styles object
  SCATTER: {
    'width': 400,
    'height': 400,
    'marginTop': 20,
    'marginRight': 20,
    'marginBottom': 20,
    'marginLeft': 20
  }
}

const mapStateToProps = ({ source }, { section, pageData, provider = {} }) => {
  return { section, pageData, provider, source }
}

const mapDispatchToProps = null

const mergeProps = (sProps, dProps, oProps) => {
  const { section, pageData, provider: { pageControllers } } = sProps

  const pagePath = get(pageData, 'pageMeta.pageController', '')
  const controller = pagePath && pageControllers[pagePath]

  let { chartSettings = [] } = section
  const sectionData = get(section, 'data', [])

  chartSettings = chartSettings.map(singleChart => {
    const { dataHandler, projectile = {} } = singleChart

    let data = sectionData.length > 0 ? sectionData : get(singleChart, 'data', [])

    if (projectile.yAxis && projectile.yAxis.tickFormatter) {
      const { yAxis } = projectile
      const tickFormatter = controller[yAxis.tickFormatter] && typeof controller[yAxis.tickFormatter] === 'function' ? controller[yAxis.tickFormatter] : ''
      singleChart = { ...singleChart, projectile: { ...projectile, yAxis: { ...yAxis, tickFormatter } } }
    }

    if (projectile.xAxis && projectile.xAxis.tickFormatter) {
      const { xAxis } = projectile
      const tickFormatter = controller[xAxis.tickFormatter] && typeof controller[xAxis.tickFormatter] === 'function' ? controller[xAxis.tickFormatter] : ''
      singleChart = { ...singleChart, projectile: { ...projectile, xAxis: { ...xAxis, tickFormatter } } }
    }

    if (dataHandler && !dataHandler.includes('UNUSED') && controller[dataHandler] && typeof controller[dataHandler] === 'function') {
      data = controller[dataHandler](data)
    }

    const defaultStyles = styleDict[singleChart.type]
    const styles = { ...defaultStyles, ...singleChart.styles }

    // regexTest(/ui-[^(-.[,\])]\w*-[c^(-.[,\])]hart/gm, singleChart.className)
    return {
      ...singleChart,
      styles,
      data
    }
  })

  return { chartSettings }
}

const nothingOr = branch(
  ({ chartSettings }) => (chartSettings.some(d => d.data.length < 1)),
  renderNothing
)

const connector = connect(mapStateToProps, mapDispatchToProps, mergeProps)
const enhance = compose(connector, nothingOr)
export default enhance(Chart)
