// >>>>>>>>>>>>>>>>>>>> For CustomFieldTemplate <<<<<<<<<<<<<<<<<<<<
import React, { Fragment } from 'react'
import { Col, Container, Row } from 'reactstrap'
import PropTypes from 'prop-types'

const CustomFieldTemplate = (props) => {
  const { id, label, help, required, description, errors, children } = props
  return (
    <Container className='form-input-container'>
      <Row className='form-input-row'>
        {id !== 'root' && label && <Col className='form-input-title'>
          <label htmlFor={id}>{label}{required ? '*' : null}</label>
        </Col>}
        <Col className='form-input'>
          {children}
          {description}
          <span style={{ color: 'red' }}>{errors}</span>
          <i style={{ color: 'grey' }}>{help}</i>
        </Col>
      </Row>
    </Container>
  )
}

const myTitleRenderFunction = () => {
  return (
    <Fragment>
      <h3> Application Information </h3>
      <span className='subtitle-text'>(In priority order, most specific to least)</span>
    </Fragment>
  )
}

CustomFieldTemplate.propTypes = {
  id: PropTypes.any,
  label: PropTypes.any,
  help: PropTypes.any,
  required: PropTypes.any,
  description: PropTypes.any,
  errors: PropTypes.any,
  children: PropTypes.any
}
// __________________END CustomFieldTemplate component_______________

// >>>>>>>>>>>>>>>>>>>> Form Controller <<<<<<<<<<<<<<<<<<<<

const myOnChange = (prev, next) => {
  console.log('>>>>>>> onChange <<<<<<<<', prev, next, 'next is seen as undefined!')
}
const myOnSubmit = (data) => {
  console.log('>>>>>>> onSubmit page1Demo <<<<<<<<: ', data)
}
const myOnError = () => {
  console.log('>>>>>>> onError <<<<<<<<')
}

const myOnBlur = (field, val) => {
  console.log('>>>>>>> onBlur page1Demo <<<<<<<< $field:', field, '$val', val)
  // return { val: newMassagedVal }
}
// do we need to put schema inhere???
const mySchema = () => {
  console.log('>>>>>>> mySchema <<<<<<<<')
}

const mySectionSuccessHandler = (data) => {
  const outcome = { ...data, a: 1, b: 2 }
  console.log('FormCtrl.mySectionSuccessHandler triggered ', outcome)
  return outcome
}

const mySectionFailureHandler = (err) => {
  console.log('FormCtrl.mySectionFailureHandler triggered ', err)
  return err
}

const myPageSuccessHandler = (data) => {
  console.log('FormCtrl.myPageSuccessHandler triggered ', data)
  return data
}

const myPageFailureHandler = (err) => {
  console.log('FormCtrl.myPageFailureHandler ', err)
  return err
}

const htmlStringBuilder = (items) => {
  const htmlString = `${
    items.map(item => {
      return `<ul>${item.first_name}${Object.keys(item).map(x => {
        return `<li>${x}: ${item[x]}</li>`
      })}</ul>`
    })
  }`

  return htmlString.replace(/,/g, '')
}

const myTableSectionSuccessHandler = (data) => (data)

const schemaMapper = (state) => {
  return {
    type: 'object',
    title: 'hello here is test title',
    properties: {
      namespace: {
        type: 'string',
        title: 'Namespace'
      },
      names: {
        type: 'string',
        title: 'Names'
      },
      fuzzy_names: {
        type: 'string',
        title: 'Fuzzy Names'
      },
      values: {
        type: 'string',
        title: 'Values'
      },
      period: {
        type: 'string',
        title: 'Period',
        enum: [
          'All',
          '1 min',
          '5 min',
          '60 min',
          '24 hr'
        ]
      }
    }
  }
}

export default {
  myOnChange,
  myOnSubmit,
  myOnError,
  mySchema,
  myOnBlur,
  mySectionSuccessHandler,
  mySectionFailureHandler,
  myTableSectionSuccessHandler,
  myPageSuccessHandler,
  myPageFailureHandler,
  htmlStringBuilder,
  CustomFieldTemplate,
  myTitleRenderFunction,
  schemaMapper
}
