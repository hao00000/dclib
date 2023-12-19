import React from 'react'
import { Button, Modal, ModalBody, ModalHeader, ModalFooter } from 'reactstrap'
import PropTypes from 'prop-types'
import renderHTML from 'react-render-html'

function ModalBox (props) {
  const { show, close, data } = props
  const { title, children } = data
  return (
    <Modal isOpen={show} toggle={close} className='modal-lg'>
      <ModalHeader toggle={close}>
        { title }
      </ModalHeader>
      <ModalBody>
        {children
          ? <pre>{renderHTML(children)}</pre>
          : ''
        }
      </ModalBody>
      <ModalFooter>
        <Button color='secondary' onClick={close}>Close</Button>
      </ModalFooter>
    </Modal>
  )
}

ModalBox.propTypes = {
  show: PropTypes.bool,
  close: PropTypes.func,
  data: PropTypes.object
}

ModalBox.defaultProps = {
  close: () => {},
  show: false,
  data: {}
}

export default ModalBox
