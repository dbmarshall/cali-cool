import React, { Component } from "react";
import PropTypes from 'prop-types';
import AlbumMiniPhotos from "../AlbumMiniPhotos"
// import API from '../../utils/API';

const albumMini = {
  backgroundColor:"rgba(0,0,0,.1)",
  borderRadius:"10px"
}

const header = {
  color: "#000",
  margin: "5px",
  padding: "10px 0 0 10px",
  fontSize: "25px"
}

class AlbumMini extends Component {
  state = {
    userAlbums: this.props.albums
  } 

  render(){

    return (
      <div>

        {this.props.albums.map( (album, i) => {
          return (
            <a href={'/album/' + album._id} 
                title="click to see full album" 
                style={{textDecoration: 'none'}}
                key={album._id}>
              <div style={albumMini}>
                <p style={header}>
                  {album.title}
                </p>
                <AlbumMiniPhotos photos={album.photos} />
              </div>
            </a>
          )
        })}
        
      </div>
    );
  }
}

AlbumMini.propTypes = {
  thumbnail: PropTypes.bool
};

export default AlbumMini;