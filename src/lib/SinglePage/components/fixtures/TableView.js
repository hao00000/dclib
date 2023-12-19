import React from 'react'
import PropTypes from 'prop-types'
import ReactTable from 'react-table'
import 'react-table/react-table.css'
import '@lib/SchemaX/vertical.scss'

const TableView = ({ tableProps, loadedTableSettings }) => {
  const tableType = loadedTableSettings ? loadedTableSettings.className : ''
  return (
    <div className='table-view-container'>
      <ReactTable {...tableProps} {...loadedTableSettings} className={`${tableType} -striped -highlight`} />
    </div>
  )
}

TableView.propTypes = {
  tableProps: PropTypes.object,
  loadedTableSettings: PropTypes.object
}

export default TableView
