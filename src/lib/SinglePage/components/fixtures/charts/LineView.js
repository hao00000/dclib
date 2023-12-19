import React from 'react'
import PropTypes from 'prop-types'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts'

const LineView = (props) => {
  const { chartSetting: { title, data, classNames, styles, strokeDasharray, projectile: { xAxis, yAxis = {} }, lines = [] } } = props

  return (
    <div className={classNames}>
      {title && <h4>{title}</h4>}
      <LineChart {...styles} data={data}>
        <XAxis {...xAxis} />
        <YAxis {...yAxis} />
        <CartesianGrid strokeDasharray={strokeDasharray} />
        <Tooltip />
        <Legend />
        {lines.map((line, key) => <Line {...line} key={key} />)}
      </LineChart>
    </div>
  )
}

LineView.propTypes = {
  chartSetting: PropTypes.object
}

export default LineView
