import React from 'react'
import PropTypes from 'prop-types'
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts'
import './ChartView.scss'

const AreaView = (props) => {
  const { chartSetting: { title, data, classNames, styles, strokeDasharray, projectile: { xAxis, yAxis = {} }, areas = [] } } = props

  return (
    <div className={classNames}>
      <h2>{title}</h2>
      <AreaChart {...styles} data={data}>
        <CartesianGrid strokeDasharray={strokeDasharray} />
        <XAxis {...xAxis} />
        <YAxis {...yAxis} />
        <Tooltip />
        {areas && areas.length > 0 && areas.map((area, key) => <Area {...area} key={key} />)}
      </AreaChart>
    </div>
  )
}

AreaView.propTypes = {
  chartSetting: PropTypes.object
}

export default AreaView
