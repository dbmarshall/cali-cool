import React, { Component } from "react";
import API from '../../utils/API';
import Gallery from 'react-photo-gallery';
import Lightbox from 'react-images';

  const styles = {
  aMargin: {
    position: "absolute",
    bottom: 0,
    color: "white",
    marginLeft: "50"
  }
};

class Main extends Component{

  state = {
    currentImage: 0,
    lightboxIsOpen: false,
    thumbnails : []
  }

  componentDidMount(){
    this.loadRecentPhotos();
  };

  loadRecentPhotos = () => {
    API.getRecentPhotos()
    .then(res => {
      const thumbs = this.getThumbnailArray(res.data);
      this.setState({thumbnails: thumbs});
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
      currentImage: obj.index,
      lightboxIsOpen: true,
    });
  }

  closeLightbox = () => {
    this.setState({
      currentImage: 0,
      lightboxIsOpen: false,
    });
  }
  gotoPrevious = () => {
    this.setState({
      currentImage: this.state.currentImage - 1,
    });
  }
  gotoNext = () => {
    this.setState({
      currentImage: this.state.currentImage + 1,
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
              currentImage={this.state.currentImage}
              isOpen={this.state.lightboxIsOpen}
              customControls = {[<a style={styles.aMargin}>hello</a>,
                <h1>sbcsabcjbasdjcbsdjk</h1>]}
            />
          
        </div>
      </div>
    );
  }
}

export default Main;