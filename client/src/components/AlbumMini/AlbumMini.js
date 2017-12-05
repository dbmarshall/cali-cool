import React, { Component } from "react";
import PropTypes from 'prop-types';
import AlbumMiniPhotos from "../AlbumMiniPhotos"
// import API from '../../utils/API';


const albumMini = {
  backgroundColor:"#c6c6c6",
  borderRadius:"10px"

}

const header = {
  color: "white",
  margin: "5px"
}


class AlbumMini extends Component {

    state = {
      userAlbums: this.props.albums
    } 

    // componentWillMount(){
    //   console.log(this.state.userAlbums)
    // }


  render(){

    return (
      <div className= "container">
        <div className="wrapper">
        {this.props.albums.map((album,i) => {
            return (
              <div style={albumMini} key={album._id}>
                <div>
                  <p style={header}>{album.title}</p>
                </div>
                <AlbumMiniPhotos photos={album.photos} />
              </div>
              )
        })}
          
        </div>
      </div>
      );
  }
}

AlbumMini.propTypes = {
  thumbnail: PropTypes.bool
};

export default AlbumMini;