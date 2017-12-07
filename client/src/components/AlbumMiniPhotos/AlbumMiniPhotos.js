import React from "react";
import { Grid, Row, Col, Image } from 'react-bootstrap';

const albumPhotoStyle = {
  width: "18.6%",
  "max-height": "80px",
  margin: "0",
  padding:"0",
  float: "left",
  overflow: "hidden"
};

const photoStyle = {
  width: "100%",
  height: "auto",
  margin: "0 4px",
  padding:"0",
  float: "left",
  overflow: "hidden"
};

const albumMiniWrapper = {
  margin:"0 0 15px 0",
}

const AlbumMiniPhotos = props => {
  return (
    <div>
      <Grid>
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



            