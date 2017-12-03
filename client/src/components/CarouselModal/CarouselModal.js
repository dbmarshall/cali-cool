import React, { Component } from "react";
import Modal from "react-modal";
// import { Carousel } from 'react-responsive-carousel';

import {React_Bootstrap_Carousel} from 'react-bootstrap-carousel';
import 'bootstrap/dist/css/bootstrap.css';
import 'react-bootstrap-carousel/dist/react-bootstrap-carousel.css';

import Like from '../Like'


const customStyles = {
  
  overlay : {
    position          : 'fixed',
    top               : 0,
    left              : 0,
    right             : 0,
    bottom            : 0,
    backgroundColor   : 'rgba(0, 0, 0, 0.75)'
  },
  content : {
    // position                   : 'absolute',
    // top                        : '5%',
    // left                       : '5%',
    // right                      : '5%',
    // bottom                     : '5%',
    border                     : '1px solid #black',
    backgroundColor                 : 'rgba(0, 0, 0, 0)',
    // overflow                   : 'auto',
    // WebkitOverflowScrolling    : 'touch',
    // borderRadius               : '4px',
    // outline                    : 'none',
    padding                    : '10px',
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)'
  }

};

class CarouselModal extends Component{
  constructor(props){
    super(props);
    console.log(props)
    this.state = {
      isOpen: props.isOpen,
      currentImage: props.currentImage,
      photos: props.photos,


      leftIcon: undefined,
      rightIcon: undefined
    }
    console.log(this.state.isOpen);
  }
  

  closeModal  = () => {
    this.setState({isOpen: false});
    this.props.onClose();
  }

  render(){

    return(<Modal
      isOpen={this.state.isOpen}
      onRequestClose={this.closeModal}
      style={customStyles}
      contentLabel="Example Modal"
      ariaHideApp={false}>

      <div className="row" style={{backgroundColor : 'rgba(0, 0, 0, 0)'}}>
         <div className="col-md-12" style={{backgroundColor : 'rgba(0, 0, 0, 0)'}}>
          <React_Bootstrap_Carousel
                animation={true}
                slideshowSpeed={7000}
                className="carousel-fade" 
                indicators={false} >
                {
                  this.state.photos.map(function(photo){
                    return (
                      <div style={{maxWidth: "1024px", backgroundColor : 'rgba(0, 0, 0, 0)'}} key={photo._id}>
                        <div className="row">
                          <div className="col-md-12" style={{color: "white"}}>
                            <h3>Album title</h3>
                          </div>
                        </div>
                        
                        <div className="row">
                          <div className="col-md-12" style={{textAlign: "center"}}> 
                            <img src={photo.link} />
                          </div>
                        </div>
                        
                        <div className="row">
                        <div className="col-md-12">
                          <span style={{color: "white"}}>
                            {photo.caption}
                          </span>
                          <span style={{postion: "absolute", right: 0, color: "white"}}>d</span>
                          </div>

                          <Like></Like>
                        </div>

                      </div>
                    )
                  })
                }
             </React_Bootstrap_Carousel>


          </div>
        </div>

    </Modal>);
  }
}

export default CarouselModal;