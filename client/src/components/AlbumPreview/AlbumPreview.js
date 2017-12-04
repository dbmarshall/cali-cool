import React, { Component } from "react";

import Gallery from 'react-photo-gallery';
import Lightbox from 'react-images';

import Like from '../Like'
import Comment from '../Comment'

class AlbumPreview extends Component{

  state = {
    photoObjs: this.props.photos,

    currentImageIndex: 0,
    lightboxIsOpen: false,
    
    thumbnails : [],
    photos: [],
    currentPhoto: {}
  }

  componentDidMount(){
    const thumbs = this.getThumbnailArray();
    const photos = this.getPhotoArray();
    this.setState({
      thumbnails: thumbs,
      photos: photos
    });
  }

  getThumbnailArray = () => {
    const thumbnails = this.state.photoObjs.map(function(photo){
      return { src: photo.thumbnail, width: 4, height: 3 , caption: photo.caption};
    });
    return thumbnails;
  }

  getPhotoArray = () => {
    const photos = this.state.photoObjs.map(function(photo){
      return { src: photo.link, caption: photo.caption, thumbnail: photo.thumbnail};
    });
    return photos;
  }

  openLightbox = (event, obj) => {
    const current = this.state.photoObjs[obj.index];
    this.setState({
      currentImageIndex: obj.index,
      lightboxIsOpen: true,
      currentPhoto: current
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
      currentPhoto: this.state.photoObjs[this.state.currentImageIndex - 1]
    });
  }

  gotoNext = () => {
    this.setState({
      currentImageIndex: this.state.currentImageIndex + 1,
      currentPhoto: this.state.photoObjs[this.state.currentImageIndex + 1]
    });
  }

  render(){
    return (
      <div>
        <Gallery photos={this.state.thumbnails} onClick={this.openLightbox}/>  
          <Lightbox images={this.state.photos}
            onClose={this.closeLightbox}
            onClickPrev={this.gotoPrevious}
            onClickNext={this.gotoNext}
            currentImage={this.state.currentImageIndex}
            isOpen={this.state.lightboxIsOpen}
            backdropClosesModal={true}
            showCloseButton={false} 
            customControls={[
              <a style={{ fontSize: "1.2em", color: "white", marginTop: "15px"}} key={4}>
                <span className="glyphicon glyphicon-user"></span>
                <span style={{marginLeft: "5px"}}>{this.state.currentPhoto.owner && this.state.currentPhoto.owner.userName}</span>
              </a>,
              <a href={ this.state.currentPhoto.album && "/album/" + this.state.currentPhoto.album._id} 
                style={{ fontSize: "1.2em", color: "white", marginTop: "15px"}} key={1}>
                {this.state.currentPhoto.album && this.state.currentPhoto.album.title}
              </a>,
              <Like style={{position: "absolute", bottom: "60px", left: "20px"}} 
                key={2}></Like>,
              <Comment style={{position: "absolute", bottom: "60px", left: "90px"}} 
                key={3}></Comment>
            ]}
          />
      </div>
    );
  }
}

export default AlbumPreview;