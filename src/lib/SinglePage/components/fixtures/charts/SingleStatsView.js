import React from 'react'
import { Col, Row } from 'reactstrap'
import PropTypes from 'prop-types'
import './ChartView.scss'

const SingleStatsView = (props) => {
  const { chartSetting: { title, data, classNames } } = props

  const displayitems = data.map((item, index) => {
    return (<Col className='single-stats' xs={2} key={index}>
      <span className='stats-text'>{item.name}</span>
      <div className='stats'>{item.pv}</div>
    </Col>)
  })
  return (
    <div className={`${classNames}`}>
      <h2>{title}</h2>
      <Row className={classNames}>{displayitems}</Row>
    </div>
  )
}

SingleStatsView.propTypes = {
  chartSetting: PropTypes.object
}

export default SingleStatsView
