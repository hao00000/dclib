import React, { memo } from 'react'
import Form from 'react-jsonschema-form'
import PropTypes from 'prop-types'
import { areObjectsEqual } from '@lib/utils'

const FormView = ({ formProps }) => {
  return (
    <Form className='form-wrapper' {...formProps} />
  )
}

FormView.propTypes = {
  section: PropTypes.object,
  formProps: PropTypes.object
}

export default memo(FormView, areObjectsEqual)
