import React, { Component } from "react";
import { Carousel } from 'react-responsive-carousel';
import API from '../../utils/API';

import 'react-responsive-carousel/lib/styles/carousel.min.css';

const styles = {

  para: {
    position: "absolute",
    top: "10px",
    marginLeft: "20px",
    color: "white"
  },

  imageStyle: {
    position: "relative",
    display: 'block', // removes browser default gutter
    height: 'auto',
    margin: '0 auto', // maintain center on very short screens OR very narrow image
    maxWidth: '100%',
  },

  imageDiv: {
    backgroundColor: "red",
    justifyContent: 'center',
    alignItems: 'center',
    verticalAlign: 'middle'
  }

}

class MainCarousel extends Component{


  state = {
    images : []
  }

  componentDidMount(){
    this.loadRecentPhotos();
  };

  loadRecentPhotos = () => {
    API.getRecentPhotos()
    .then(res => {
      const photos = this.getImages(res.data);
      console.log("photos", photos);
      this.setState({images: photos});
    })
    .catch(err => console.log(err));
  }

  getImages = (photos) => {
    return photos.map(function(photo){
      return photo.link;
    });
  }


  render() {
    return (
      <div class="container">
      <Carousel showThumbs={false}>
        {
          this.state.images.map(function(image){
            return <div style={styles.imageDiv}>
                <h1 >Album</h1>
                <img src={image} alt="hi" style={styles.imageStyle}/>
                <p> comments</p>
                
            </div>
          })
        }
      </Carousel>
      </div>
    );
  }
}

export default MainCarousel;