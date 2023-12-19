import React from 'react'
import PropTypes from 'prop-types'
import ReactTable from 'react-table'
import 'react-table/react-table.css'

const SampleTableRenderer = ({ tableProps }) => {
  return (
    <ReactTable {...tableProps} />
  )
}

SampleTableRenderer.propTypes = {
  tableProps: PropTypes.object
}

export default SampleTableRenderer
