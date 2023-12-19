// fieldPath is similar to java package com.appl.toolkit

import React from 'react'
import PropTypes from 'prop-types'
import get from 'lodash/get'
import { Container, Row, Col } from 'reactstrap'
import { getLayeredFormListData } from '@lib/SinglePage/utils'
import { isObject } from '@lib/utils'

const FormFieldList = (props) => {
  const { formData, schema:{ properties } } = props
  return (
    <div className='form-field-list'>
      {
        Object.keys(formData).map((fieldPath, key1) => {
          const propData = get(properties, [fieldPath], '')
          const data = propData && fieldPath && getLayeredFormListData(formData, fieldPath.split('.'), 0)
          const title = get(propData, 'title', '')
          return (
            <ul key={key1}>
              <Container>
                <Row>
                  {<Col className='form-field-list-title'>{title}</Col>}
                  {data && <Col className={Array.isArray(data) ? 'form-field-list-body-array' : 'form-field-list-body-string'}>{
                    Array.isArray(data)
                      ? data.map((item, key2) => <li key={key2}>{JSON.stringify(item)}</li>)
                      : isObject(data)
                        ? JSON.stringify(data)
                        : data
                  }</Col>}
                </Row>
              </Container>
            </ul>
          )
        })}
    </div>
  )
}

FormFieldList.propTypes = {
  formData: PropTypes.any,
  schema: PropTypes.any
}

export default FormFieldList
