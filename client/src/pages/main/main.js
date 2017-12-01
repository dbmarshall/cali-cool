import React, { Component } from "react";
import API from '../../utils/API';
import Gallery from 'react-photo-gallery';

class Main extends Component{

  state = {
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
      return { src: photo.thumbnail, width: 4, height: 3 };
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
          <h4>Recent Photo uploads</h4>
          {
            <Gallery photos={this.state.thumbnails} />
          }
        </div>
      </div>
    );
  }
}

export default Main;