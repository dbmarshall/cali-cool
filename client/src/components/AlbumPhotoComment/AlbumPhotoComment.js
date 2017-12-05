import React, { Component } from "react";
import { Button, Grid, Row, Col, form, FormControl, ListGroup, ListGroupItem } from 'react-bootstrap';
import API from '../../utils/API';

const commentDiv = {
  marginTop: "10px",
  marginBottom: "10px"
}

class AlbumPhotoComment extends Component {

    state = {
      photoId: this.props.photoId,
      userId: this.props.userId,
      commentContent:"",
      commentId:"",
      comments:[]
    } 

    handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    })
    // console.log(this.state.commentContent)
    };

    handleFormSubmit = event => {
    event.preventDefault();
    console.log(this.state.photoId)
    console.log(this.state.userId)
    console.log(this.state.commentContent)
    API.createPhotoComment({
      userId:this.state.userId,
      comment:this.state.commentContent
    })
    .then(res => {
      this.setState({
        commmentId: res.data._id
      })
      console.log(this.state.commmentId)
      })
    .then(res => {
      API.insertCommentToPhoto({
        commentId: this.state.commmentId,
        photoId: this.state.photoId
      })
      .then(res => {
        console.log(res)
      })
    })
    .catch(err => {
      console.log(err)})
  };

  render(){

    return (
      <div >
       <div style={commentDiv}>
            <Grid>
             <Row>
              <Col xs={6} md={6}>
                <form onSubmit={this.handleFormSubmit}>
                  <FormControl
                    id="formControlsText"
                    type="text"
                    label="Text"
                    placeholder="Enter text"
                    name="commentContent"
                    value={this.state.commentContent}
                    onChange={this.handleInputChange}
                  />
                  <Button type="submit" bsStyle="primary" >
                    Add Comment
                  </Button>
                </form>
              </Col>
            </Row>
            <Row>
              <Col xs={6} md={8}>
                  <ListGroup>
                    <ListGroupItem>Wow what a great photo!</ListGroupItem>
                    <ListGroupItem>Amazing</ListGroupItem>
                    <ListGroupItem>How cool!</ListGroupItem>
                  </ListGroup>
              </Col>
            </Row>
          </Grid>
        </div>
      </div>
      );
  }
}


export default AlbumPhotoComment;