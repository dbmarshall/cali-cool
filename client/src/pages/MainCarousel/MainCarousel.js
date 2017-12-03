import React, { Component } from "react";
import API from '../../utils/API';
import Gallery from 'react-photo-gallery';
import Lightbox from 'react-images';
import CarouselModal from '../../components/CarouselModal';
import 'react-responsive-carousel/lib/styles/carousel.min.css';


const styles = {
  aMargin: {
    position: "absolute",
    bottom: 0,
    color: "white",
    marginLeft: "50"
  }
};

class MainCarousel extends Component{

  state = {
    currentImage: 0,
    lightboxIsOpen: false,
    
    thumbnails : [],
    photos: [],
    isCarouselModalOpen: false,
  }

  componentDidMount(){
    this.loadRecentPhotos();
  };

  loadRecentPhotos = () => {
    API.getRecentPhotos()
    .then(res => {
      const thumbs = this.getThumbnailArray(res.data);
      this.setState({thumbnails: thumbs, photos: res.data, minu: "min"});
      console.log(this.state)
    })
    .catch(err => console.log(err));
  }

  getThumbnailArray = (photos) => {
    const thumbnails = photos.map(function(photo){
      return { src: photo.thumbnail, width: 4, height: 3 , caption: photo.caption};
    });
    return thumbnails;
  }


  openCarouselModal = (event, obj) => {
    this.setState({ 
      isCarouselModalOpen: true, 
      currentImage: obj.index
    });
  }

  closeCarouselModal = () => {
    console.log("parent close")
    this.setState({ isCarouselModalOpen: false});
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

            <Gallery photos={this.state.thumbnails} onClick={this.openCarouselModal}/>  
              { this.state.isCarouselModalOpen && 
               
                <CarouselModal
                photos={this.state.photos} 
                isOpen={this.state.isCarouselModalOpen}
                onClose={this.closeCarouselModal}
                currentImage={this.state.currentImage}/>
            }
            />
          }
        </div>
      </div>
    );
  }
}

export default MainCarousel;