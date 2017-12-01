import React, { Component } from "react";
import Modal from 'react-bootstrap-modal';

 
class LoginModal extends Component {
 
  state = {
    open: false
  };
  

  openModal = () => {
    console.log("open modal hit");
    this.setState({open: true})};

  render(){
 
    let closeModal = () => this.setState({ open: false })
 
    let saveAndClose = () => this.setState({ open: false })
 
    return (
      <div>
        <button onClick={this.openModal} type='button'>Launch modal</button>
 
        <Modal
          show={this.state.open}
          onHide={closeModal}
          aria-labelledby="ModalHeader"
        >
          <Modal.Header closeButton>
            <Modal.Title id='ModalHeader'>A Title Goes here</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>Some Content here</p>
          </Modal.Body>
          <Modal.Footer>
            <Modal.Dismiss className='btn btn-default'>Cancel</Modal.Dismiss>
 
            <button className='btn btn-primary' onClick={saveAndClose}>
              Save
            </button>
          </Modal.Footer>
        </Modal>
      </div>
    )
  }
}
 
export default LoginModal;