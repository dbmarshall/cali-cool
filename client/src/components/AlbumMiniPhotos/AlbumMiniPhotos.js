import React from "react";
import { Grid, Row, Col, Image } from 'react-bootstrap';

const albumPhotoStyle = {
  width: "20%",
  "maxHeight": "100px",
  margin: "0",
  padding:"0",
  float: "left",
  overflow: "hidden",
  boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.10)"
};

const photoStyle = {
  width: "100%",
  height: "auto",
  margin: "0 4px",
  padding:"0",
  float: "left",
  overflow: "hidden",

};

const albumMiniWrapper = {
  margin:"15px 0 0 0"
}

const AlbumMiniPhotos = props => {
  return (
    <div>
      <Grid  style={{ width: "100%"}}>
       <Row style={albumMiniWrapper}>
         {props.photos.map((photo, i) => {
            return (
              <Col style={albumPhotoStyle} key={photo.id}>
                <Image src={photo.imageUrl} style={photoStyle} />
              </Col>
            )
          })}
        </Row>
      </Grid>
    </div>
)};

export default AlbumMiniPhotos;



            