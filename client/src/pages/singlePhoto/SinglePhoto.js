import React, { Component } from "react";
import { Button, Grid, Row, Col, Image, form, FormControl, Badge, ListGroup, ListGroupItem } from 'react-bootstrap';
// Check with Minu if I can use LIKE for this component
// import Like from "../../components/Like";
const btnStyle = {
  marginTop: "5px",
  marginBottom: "5px"
}

const commentDiv = {
  marginTop: "10px",
  marginBottom: "10px"
}

class SinglePhoto extends Component {

  render(){

    return (
      <div className= "container">
         <div>
            <Grid>
              <Row>
                <Col>
                   <h2>Photo Title</h2>
                </Col>
              </Row>
              <Row>
                <Col xs={6} md={6}>
                  <Image src="https://static.pexels.com/photos/356968/pexels-photo-356968.jpeg" rounded={true} responsive={true}/>
                  <p>Caption</p>
                </Col>
              </Row>
              <Row>
                <Col xs={6} md={6}>
                 <p>Album <span> (link) </span> by <span> User </span><span>date added</span></p>
                </Col>
              </Row>
               <Row>
                <Col xs={6} md={6}>
                    <Button bsStyle="primary" bsSize="large">Like! <Badge> 42</Badge></Button>
                </Col>
              </Row>
              <Row>
                <Col xs={6} md={6}>
                    <Button bsStyle="primary" bsSize="large" style={btnStyle}>Set as Profile Photo</Button>
                </Col>
              </Row>
              <Row>
                <Col xs={6} md={6}>
                    <Button bsStyle="primary" bsSize="large" style={btnStyle}>Delete Photo</Button>
                </Col>
              </Row>
              </Grid>
              <div style={commentDiv}>
                <Grid>
                 <Row>
                  <Col xs={6} md={6}>
                    <form>
                      <FormControl
                        id="formControlsText"
                        type="text"
                        label="Text"
                        placeholder="Enter text"
                        name="comment"
                        value=""
                      />
                      <Button type="submit">
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
      </div>
      );
  }
}


export default SinglePhoto;