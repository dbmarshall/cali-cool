import React, { Component } from "react";
import API from '../../utils/API';
import ImageGallery from 'react-image-gallery';

// # Webpack
import "react-image-gallery/styles/css/image-gallery.css";

const styles = {
  image: {
    width: "200px",
    height: "200px",
    padding: "50px"
  }
};


class MainNew extends Component{

  state = {
    currentImage: 0,
    lightboxIsOpen: false,
    images : []
  }

  componentDidMount(){
    this.loadRecentPhotos();
  };

  loadRecentPhotos = () => {
    API.getRecentPhotos()
    .then(res => {
      const thumbs = this.getImages(res.data);
      this.setState({images: thumbs});
    })
    .catch(err => console.log(err));
  }

  getImages = (photos) => {
    const thumbnails = photos.map(function(photo){
      return { thumbnail: photo.thumbnail, original: photo.link};
    });
    return thumbnails;
  }


  render(){
    return (
      <div className="container">
        <div className="jumbotron">  
          <h1>Cali.Cool</h1>
          <p>A growing visual record of what's going down in our state</p>
        </div>

        <div>
          <h4>Most Liked Photos</h4>
          <ImageGallery 
            items={this.state.images} 
            sizes={300*200}
            showThumbnails={true}
            useBrowserFullscreen={true}
          />
        </div>
      </div>
    );
  }
}

export default MainNew;