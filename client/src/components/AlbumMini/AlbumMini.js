import React, { Component } from "react";
import { Grid, Row, Col, Image } from 'react-bootstrap';
import PropTypes from 'prop-types';
// import API from '../../utils/API';

const albumPhotoStyle = {
   margin: "0px",
   padding:"0px"
};

const albumMiniWrapper = {
  margin:"5px",
}


class AlbumMini extends Component {

  render(){

    return (
      <div className= "container">
        <div className="wrapper">
          <div className="albumMini" style={{backgroundColor:"#c6c6c6"}}>
            <div><p style={{color: "white"}}>Protype Album Mini</p></div>
            <div >
              <Grid>
               <Row style={albumMiniWrapper}>
                <Col xs={2} md={2} lg={2} style={albumPhotoStyle}>
                  <Image src="https://static.pexels.com/photos/33109/fall-autumn-red-season.jpg" thumbnail />
                </Col>
                <Col xs={2} md={2} lg={2} style={albumPhotoStyle}>
                  <Image src="https://static.pexels.com/photos/376464/pexels-photo-376464.jpeg" thumbnail />
                </Col>
                <Col xs={2} md={2} lg={2} style={albumPhotoStyle}>
                  <Image src="https://static.pexels.com/photos/158607/cairn-fog-mystical-background-158607.jpeg" thumbnail />
                </Col>
                <Col xs={2} md={2} lg={2} style={albumPhotoStyle}>
                  <Image src="https://static.pexels.com/photos/39811/pexels-photo-39811.jpeg" thumbnail />
                </Col>
                <Col xs={2} md={2} lg={2} style={albumPhotoStyle}>
                  <Image src="https://static.pexels.com/photos/405140/pexels-photo-405140.jpeg" thumbnail />
                </Col>
                </Row>
              </Grid>
            </div>
          </div>
          </div>
        </div>
      );
  }
}

AlbumMini.propTypes = {
  thumbnail: PropTypes.bool
};

export default AlbumMini;