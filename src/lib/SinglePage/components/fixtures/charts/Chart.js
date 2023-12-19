import React from 'react'
import PropTypes from 'prop-types'
import LineView from '@lib/SinglePage/components/fixtures/charts/LineView'
import BarView from '@lib/SinglePage/components/fixtures/charts/BarView'
import AreaView from '@lib/SinglePage/components/fixtures/charts/AreaView'
import PieView from '@lib/SinglePage/components/fixtures/charts/PieView'
import ScatterView from '@lib/SinglePage/components/fixtures/charts/ScatterView'
import SingleStatsView from '@lib/SinglePage/components/fixtures/charts/SingleStatsView'

const Chart = ({ chartSettings }) => (
  chartSettings.map((chartSetting, key) => {
    const CommonElement = {
      LINE: LineView,
      BAR: BarView,
      AREA: AreaView,
      PIE: PieView,
      SCATTER: ScatterView,
      SINGLESTATS: SingleStatsView
    }

    const ChartComponent = CommonElement[chartSetting.type]

    return (
      CommonElement[chartSetting.type] ? <ChartComponent chartSetting={chartSetting} key={key} /> : <br key={key} />
    )
  })
)

Chart.propTypes = {
  chartSettings: PropTypes.array
}

export default Chart
