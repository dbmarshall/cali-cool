import React, { Component } from "react";
import PropTypes from 'prop-types';
import AlbumMiniPhotos from "../AlbumMiniPhotos"
// import API from '../../utils/API';

const albumMini = {
  backgroundColor:"rgba(0,0,0,0)",
  borderRadius:"10px",
  boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
  margin: "30px"
}

const header = {
  color: "#000",
  margin: "5px",
  padding: "10px 0 10px 10px",
  fontSize: "1.7em",
  fontWeight: "bold",
  fontFamily: "Bad Script, cursive"
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
                <AlbumMiniPhotos photos={album.photos} />
                <p style={header}>
                  {album.title}
                </p>
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