import React from 'react'
import PropTypes from 'prop-types'
import { UncontrolledAlert, Form, FormGroup, Label, Input, Col, Button } from 'reactstrap'

const AddQueryParams = ({ onSubmit, onChangeServiceName, onChangeHost, onChangePort, onChangeSdEnvironment, serviceName, host, port, sdEnvironment }) => {
  return (
    <div className='textAlignCenter add-notification-container'>
      <UncontrolledAlert color='danger'>Please enter required (*) query params mentioned below:</UncontrolledAlert>
      <Form className='add-notification-form'>
        <FormGroup row className='field-wrapper'>
          <Label className='textAlignRight' sm={5}>Service Name <sup>*</sup></Label>
          <Col sm={4}>
            <Input type='text' value={serviceName} onChange={onChangeServiceName} placeholder='Ex: DataStorageService' />
          </Col>
        </FormGroup>
        <FormGroup row className='field-wrapper'>
          <Label className='textAlignRight' sm={5}>Host <sup>*</sup></Label>
          <Col sm={4}>
            <Input type='text' value={host} onChange={onChangeHost} placeholder='Ex: rn-aosd-d01-lapp25.rno.apple.com' />
          </Col>
        </FormGroup>
        <FormGroup row className='field-wrapper'>
          <Label className='textAlignRight' sm={5}>Port <sup>*</sup></Label>
          <Col sm={4}>
            <Input type='number' value={port} onChange={onChangePort} placeholder='Ex: 13520' />
          </Col>
        </FormGroup>
        <FormGroup row className='field-wrapper'>
          <Label className='textAlignRight' sm={5}>Environment <sup>*</sup></Label>
          <Col sm={4}>
            <Input type='text' value={sdEnvironment} onChange={onChangeSdEnvironment} placeholder='Ex: DEV01' />
          </Col>
        </FormGroup>
        <div className='submit-form-wrapper'>
          <Button color='primary' className='notification-submit-btn' disabled={!serviceName || !host || !port || !sdEnvironment} onClick={onSubmit}>Submit</Button>
        </div>
      </Form>
    </div>
  )
}

AddQueryParams.propTypes = {
  onSubmit: PropTypes.func,
  onChangeServiceName: PropTypes.func,
  onChangeHost: PropTypes.func,
  onChangePort: PropTypes.func,
  onChangeSdEnvironment: PropTypes.func,
  serviceName: PropTypes.string,
  host: PropTypes.string,
  port: PropTypes.string,
  sdEnvironment: PropTypes.string
}

export default AddQueryParams
