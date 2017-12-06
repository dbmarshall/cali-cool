import React, { Component } from "react";
import API from '../../utils/API';

import AlbumPreview from '../../components/AlbumPreview'

class Main extends Component{

  state = {
    recentPhotos: [],
    mostLikedPhotos:[]
  }

  componentDidMount(){
    this.loadRecentPhotos();
    this.loadMostLikedPhotos();
  }

  loadRecentPhotos = () => {
    API.getRecentPhotos()
    .then(res => {
      this.setState({recentPhotos: res.data});
    })
    .catch(err => console.log(err));
  }

  loadMostLikedPhotos = () => {
    API.getMostLikedPhotos()
    .then(res => {
      this.setState({mostLikedPhotos: res.data});
    })
    .catch(err => console.log(err));
  }

  render(){

    return (
      <div className="container">
        <div className="jumbotron">  
          <h1>Cali.Cool</h1>
          <p>A growing visual record of what's going down in our state</p>
        </div>

        <h4>Most Liked Photos</h4>
        {this.state.mostLikedPhotos.length && <AlbumPreview photos={this.state.mostLikedPhotos}/>}

        <hr/>

        <h4>Recent Photo Uploads</h4>
        {this.state.recentPhotos.length && <AlbumPreview photos={this.state.recentPhotos} />}
      </div>
    );
  }
}

export default Main;