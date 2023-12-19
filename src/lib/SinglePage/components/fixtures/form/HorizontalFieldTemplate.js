import React from 'react'
import PropTypes from 'prop-types'
import { Container, Row, Col } from 'reactstrap'

const HorizontalFieldTemplate = (props) => {
  const { id, classNames, label, help, required, description, errors, children } = props
  return (
    <Container id='form-input-left' className={`form-input-container ${classNames}`}>
      <Row className='form-input-row'>
        {id !== 'root' && label &&
        <Col className='form-input-title'>
          <label htmlFor={id}>{label}{required ? '*' : null}</label>
        </Col>}
        <Col className='form-input'>
          {children}
          {description}
          <div style={{ color: 'red' }}>{errors}</div>
          <i style={{ color: 'grey' }}>{help}</i>
        </Col>
      </Row>
    </Container>
  )
}

HorizontalFieldTemplate.propTypes = {
  id: PropTypes.string,
  label: PropTypes.string,
  help: PropTypes.any,
  required: PropTypes.bool,
  description: PropTypes.any,
  errors: PropTypes.any,
  children: PropTypes.any,
  classNames: PropTypes.string
}

export default HorizontalFieldTemplate
