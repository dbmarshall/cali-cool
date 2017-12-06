import React, { Component } from "react";

import Gallery from 'react-photo-gallery';
import Lightbox from 'react-images';

import Like from '../Like'

import API from '../../utils/API';

const styles = {
  commentLink: {
    color: "white",
    fontSize: "1.1em",
    position: "absolute", 
    bottom: "60px", 
    left: "110px"
  },
  userLink: {
    fontSize: "1.2em", 
    color: "white", 
    marginTop: "15px"
  },
  userNameText: {
    marginLeft: "5px"
  },
  albumLink: {
    fontSize: "1.2em", 
    color: "white", 
    marginTop: "15px"
  },
  likeLink: {
    position: "absolute", 
    bottom: "60px", 
    left: "20px"
  }
}

const sessionKeyUserId = "userId";

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
      return { src: photo.thumbnail, width: 4, height: 3, caption: photo.caption};
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

  updateLike = () =>{ 
    const sessionUserId = sessionStorage.getItem(sessionKeyUserId);
    const userIndex = this.state.currentPhoto.likes.indexOf(sessionUserId);

    if(userIndex > -1){
      this.state.currentPhoto.likes.splice(userIndex, 1);
      API.unlikePhoto(sessionUserId, this.state.currentPhoto._id);
    }
    else{
     this.state.currentPhoto.likes.push(sessionUserId);
      API.likePhoto(sessionUserId, this.state.currentPhoto._id);
    }

    this.forceUpdate();
  }

  doesUserLikeCurrentPhoto(){
    const sessionUserId = sessionStorage.getItem(sessionKeyUserId);
    const photoLikes = this.state.currentPhoto.likes;
    
    if(sessionUserId && photoLikes){
      for(let userId of photoLikes){
        if(userId.toString() === sessionUserId){
          return true;
        }
      }
    }
    return false;
  }

  getCustomControls(){
    let customControls = [
      <a key={1} style={styles.userLink}>
        <span className="glyphicon glyphicon-user"></span>
        <span style={styles.userNameText}>
          {this.state.currentPhoto.owner && this.state.currentPhoto.owner.userName}
        </span>
      </a>,

      <a href={ this.state.currentPhoto.album && "/album/" + this.state.currentPhoto.album._id} 
        style={styles.albumLink} key={2}>
        {this.state.currentPhoto.album && this.state.currentPhoto.album.title}
      </a>
    ];

    customControls.push(
      <Like position={styles.likeLink}
        likesCount={this.state.currentPhoto.likes && this.state.currentPhoto.likes.length}
        updateLike={this.updateLike}
        isLiked={this.doesUserLikeCurrentPhoto()}
        key={3}>
      </Like>
    );

    customControls.push(
      <a style={styles.commentLink} key={4}>
        <span className="glyphicon glyphicon-comment"></span>
        <span> Comment</span>    
      </a>
    );

    return customControls;
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
            customControls={this.getCustomControls()}
          />
      </div>
    );
  }
}

export default AlbumPreview;