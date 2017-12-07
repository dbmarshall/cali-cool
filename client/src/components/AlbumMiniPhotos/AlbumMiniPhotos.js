import React from "react";
import { Grid, Row, Col, Image } from 'react-bootstrap';

const albumPhotoStyle = {
   margin: "0px",
   padding:"0px",
   position: ""
};

const albumMiniWrapper = {
  margin:"5px",
}


const AlbumMiniPhotos = props => {
  return (
    <div>
      <Grid>
       <Row style={albumMiniWrapper}>
       {props.photos.map((photo, i) => {
          return (
            <Col xs={2} md={2} lg={2} style={albumPhotoStyle} key={photo.id}>
                <Image src={photo.imageUrl} thumbnail />
              </Col>
            )
        })}
        </Row>
      </Grid>
    </div>
    

)};

export default AlbumMiniPhotos;



            