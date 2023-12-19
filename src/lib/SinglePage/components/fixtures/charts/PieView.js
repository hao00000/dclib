import React from 'react'
import PropTypes from 'prop-types'
import { PieChart, Pie } from 'recharts'
import './ChartView.scss'

const PieView = (props) => {
  const { chartSetting: { title, data, classNames, styles, pieSettings } } = props

  return (
    <div className={classNames}>
      <h2>{title}</h2>
      <PieChart {...styles}>
        <Pie data={data} {...pieSettings} />
      </PieChart>
    </div>
  )
}

PieView.propTypes = {
  chartSetting: PropTypes.object
}

export default PieView
