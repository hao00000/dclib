import React from 'react'
import PropTypes from 'prop-types'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts'
import './ChartView.scss'

const BarView = (props) => {
  const { chartSetting: { title, data, classNames, styles, strokeDasharray, projectile: { xAxis, yAxis = {} }, bars = [] } } = props

  return (
    <div className={classNames}>
      <h2>{title}</h2>
      <BarChart {...styles} data={data}>
        <CartesianGrid strokeDasharray={strokeDasharray} />
        <XAxis {...xAxis} />
        <YAxis {...yAxis} />
        <Tooltip />
        {bars && bars.length > 0 && bars.map((bar, key) => <Bar {...bar} key={key} />)}
      </BarChart>
    </div>
  )
}

BarView.propTypes = {
  chartSetting: PropTypes.object
}

export default BarView
