import React, { Component } from "react";
import API from '../../utils/API';

import Gallery from 'react-photo-gallery';
import Lightbox from 'react-images';

import Like from '../../components/Like'
import Comment from '../../components/Comment'

class Main extends Component{

  state = {
    currentImageIndex: 0,
    lightboxIsOpen: false,
    
    thumbnails : [],
    photos: [],
    isCarouselModalOpen: false,
    currentPhoto: {}
  }

  componentDidMount(){
    this.loadRecentPhotos();
  };

  loadRecentPhotos = () => {
    API.getRecentPhotos()
    .then(res => {
      const thumbs = this.getThumbnailArray(res.data);
      this.setState({thumbnails: thumbs, photos: res.data, minu: "min"});
    })
    .catch(err => console.log(err));
  }

  getThumbnailArray = (photos) => {
    const thumbnails = photos.map(function(photo){
      return { src: photo.thumbnail, width: 4, height: 3 , caption: photo.caption};
    });
    return thumbnails;
  }

  openLightbox = (event, obj) => {
    this.setState({
      currentImageIndex: obj.index,
      lightboxIsOpen: true,
      currentPhoto: this.state.photos[obj.index]
    });
  }

  closeLightbox = () => {
    this.setState({
      currentImageIndex: 0,
      lightboxIsOpen: false,
    });
  }
  gotoPrevious = () => {
    this.setState({
      currentImageIndex: this.state.currentImageIndex - 1,
      currentPhoto: this.state.photos[this.state.currentImageIndex - 1]
    });
  }
  gotoNext = () => {
    this.setState({
      currentImageIndex: this.state.currentImageIndex + 1,
      currentPhoto: this.state.photos[this.state.currentImageIndex + 1]
    });
  }

  render(){

    return (
      <div className="container">
        <div className="jumbotron">  
          <h1>Cali.Cool</h1>
          <p>A growing visual record of what's going down in our state</p>
        </div>

        <div>
          <h4>Recent Photo uploads</h4>

            <Gallery photos={this.state.thumbnails} onClick={this.openLightbox}/>  
              <Lightbox images={this.state.thumbnails}
                onClose={this.closeLightbox}
                onClickPrev={this.gotoPrevious}
                onClickNext={this.gotoNext}
                currentImage={this.state.currentImageIndex}
                isOpen={this.state.lightboxIsOpen}
                backdropClosesModal={true}
                showCloseButton={false} 
                customControls={[
                  <a style={{position: "absolute", top: "15px", fontSize: "1.2em", color: "white"}} 
                    key={1}>Album Title</a>,
                  <Like style={{position: "absolute", bottom: "60px", left: "20px"}} 
                    key={2}></Like>,
                  <Comment style={{position: "absolute", bottom: "60px", left: "90px"}} 
                    key={3}></Comment>
                ]}
              />
          }
        </div>
      </div>
    );
  }
}

export default Main;