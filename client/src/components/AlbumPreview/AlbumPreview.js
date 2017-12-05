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

  updateLike = () =>{
    // let newPhotoObj = this.state.currentPhoto;
    // const userIndex = newPhotoObj.likes.indexOf(sessionStorage.getItem("userId"));
    // console.log("currentUser", userIndex);

    // if(userIndex > -1){
    //   newPhotoObj.likes.splice(userIndex, 1);
    // }
    // else{
    //   newPhotoObj.likes.push(sessionStorage.getItem("userId"));
    // }

    // let newPhotoObjs = this.state.photoObjs;
    // newPhotoObjs[this.state.currentImageIndex] = newPhotoObj;

    // this.setState({
    //    photoObjs : newPhotoObjs      
    // });

    const userIndex = this.state.photoObjs[this.state.currentImageIndex].
      likes.indexOf(sessionStorage.getItem("userId"));
    console.log("currentUser", userIndex);
    if(userIndex > -1){
      this.state.photoObjs[this.state.currentImageIndex].likes.splice(userIndex, 1);
    }
    else{
      this.state.photoObjs[this.state.currentImageIndex].likes.push(sessionStorage.getItem("userId"));
    }

    this.forceUpdate();

    console.log("update like parent clicked");
  }

  doesUserLikeCurrentPhoto(){
    if(sessionStorage.getItem("userId") && this.state.currentPhoto.likes){
      for(let userId of this.state.currentPhoto.likes){
        if(userId.toString() === sessionStorage.getItem("userId")){
          return true;
        }
      }
    }
    return false;
  }

  getCustomControls(){
    let customControls = [

      <a style={{ fontSize: "1.2em", color: "white", marginTop: "15px"}} key={4}>
        <span className="glyphicon glyphicon-user"></span>
        <span style={{marginLeft: "5px"}}>{this.state.currentPhoto.owner && this.state.currentPhoto.owner.userName}</span>
      </a>,

      <a href={ this.state.currentPhoto.album && "/album/" + this.state.currentPhoto.album._id} 
        style={{ fontSize: "1.2em", color: "white", marginTop: "15px"}} key={1}>
        {this.state.currentPhoto.album && this.state.currentPhoto.album.title}
      </a>
    ];

    if(sessionStorage.getItem("userId")){
      customControls.push(
        <Like style={{position: "absolute", bottom: "60px", left: "20px"}} 
        key={2} updateLike={this.updateLike}
        likesCount={this.state.currentPhoto.likes && this.state.currentPhoto.likes.length}
        parentId={this.state.currentPhoto._id}
        parentType="photo"
        isLiked={this.doesUserLikeCurrentPhoto()}
        currentPhoto={this.state.currentPhoto}></Like>);

      customControls.push( 
        <Comment style={{position: "absolute", bottom: "60px", left: "110px"}} 
        key={3}></Comment>);
    }

    // console.log(sessionStorage.getItem("userId"), 
    //             customControls.length);

    return customControls;

  }

  render(){
    {console.log(this.state.currentPhoto.likes)}
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