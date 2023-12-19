import React from 'react'
import PropTypes from 'prop-types'
import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts'
import './ChartView.scss'

const ScatterView = (props) => {
  const { chartSetting: { title, data, classNames, styles, projectile: { xAxis, yAxis }, dotColor } } = props

  return (
    <div className={classNames}>
      <h2>{title}</h2>
      <ScatterChart {...styles}>
        <CartesianGrid />
        <XAxis {...xAxis} />
        <YAxis {...yAxis} />
        <Scatter data={data} fill={dotColor} />
        <Tooltip />
      </ScatterChart>
    </div>
  )
}

ScatterView.propTypes = {
  chartSetting: PropTypes.object
}

export default ScatterView
