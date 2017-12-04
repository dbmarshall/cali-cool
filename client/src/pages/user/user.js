import React, { Component } from "react";
import { Button, Form, FormGroup, FormControl, ControlLabel, Grid, Row, Col, Image, Thumbnail  } from 'react-bootstrap';
// import API from '../../utils/API';


class User extends Component {

  render(){

    return (
      <div className= "container">
        <div>
        <h2> Invite a friend (placeholder) </h2>
        <Form inline>
          <FormGroup controlId="formInlineName">
            <ControlLabel>Name</ControlLabel>
            {' '}
            <FormControl type="text" placeholder="Jane Doe" />
          </FormGroup>
          {' '}
          <FormGroup controlId="formInlineEmail">
            <ControlLabel>Email</ControlLabel>
            {' '}
            <FormControl type="email" placeholder="jane.doe@example.com" />
          </FormGroup>
          {' '}
          <Button type="submit" bsStyle="primary">
            Send invitation
          </Button>
        </Form>
        </div>
          <div>
            <Grid>
              <Row>
                <Col xs={6} md={3}>
                  <Image src="https://i.pinimg.com/736x/23/9e/a3/239ea3028a12dc33bda27d300d7f67ce--california-palm-trees-california-love.jpg" rounded={true.toString()} responsive={true.toString()}/>
                </Col>
              </Row>
            </Grid>
            </div>
            <div>
              <div className="albumMini">
                <h3>Nature</h3>
                <Grid>
                  <Row>
                    <Col xs={6} md={3}>
                      <Thumbnail href="#" alt="171x180" src="https://static.pexels.com/photos/33109/fall-autumn-red-season.jpg" responsive={true.toString()} />
                    </Col>
                    <Col xs={6} md={3}>
                      <Thumbnail href="#" alt="171x180" src="https://static.pexels.com/photos/158607/cairn-fog-mystical-background-158607.jpeg" responsive={true.toString()}/>
                    </Col>
                    <Col xs={6} md={3}>
                      <Thumbnail href="#" alt="171x180" src="https://static.pexels.com/photos/39811/pexels-photo-39811.jpeg" responsive={true.toString()} />
                    </Col>
                    <Col xs={6} md={3}>
                      <Thumbnail href="#" alt="171x180" src="https://static.pexels.com/photos/302804/pexels-photo-302804.jpeg" responsive={true.toString()} />
                    </Col>
                  </Row>
                  </Grid>
                </div>
                <div className="albumMini">
                  <h3>Food</h3>
                  <Grid>
                    <Row>
                      <Col xs={6} md={3}>
                        <Thumbnail href="#" alt="171x180" src="https://static.pexels.com/photos/376464/pexels-photo-376464.jpeg" responsive={true.toString()} />
                      </Col>
                      <Col xs={6} md={3}>
                        <Thumbnail href="#" alt="171x180" src="https://static.pexels.com/photos/5205/food-healthy-vegetables-potatoes.jpg" responsive={true.toString()} />
                      </Col>
                      <Col xs={6} md={3}>
                        <Thumbnail href="#" alt="171x180" src="https://static.pexels.com/photos/205961/pexels-photo-205961.jpeg" responsive={true.toString()} />
                      </Col>
                      <Col xs={6} md={3}>
                        <Thumbnail href="#" alt="171x180" src="https://static.pexels.com/photos/66639/pexels-photo-66639.jpeg" responsive={true.toString()} />
                      </Col>
                  </Row>
                </Grid>
              </div>
              <div className="albumMini">
                <h3>LA Love</h3>
                <Grid>
                  <Row>
                    <Col xs={6} md={3}>
                      <Thumbnail href="#" alt="171x180" src="https://static.pexels.com/photos/360698/pexels-photo-360698.jpeg" responsive={true.toString()} />
                    </Col>
                    <Col xs={6} md={3}>
                      <Thumbnail href="#" alt="171x180" src="https://static.pexels.com/photos/5346/city-skyline-los-angeles.jpg" responsive={true.toString()}/>
                    </Col>
                    <Col xs={6} md={3}>
                      <Thumbnail href="#" alt="171x180" src="https://static.pexels.com/photos/405140/pexels-photo-405140.jpeg" responsive={true.toString()}/>
                    </Col>
                    <Col xs={6} md={3}>
                      <Thumbnail href="#" alt="171x180" src="https://static.pexels.com/photos/634190/pexels-photo-634190.jpeg" responsive={true.toString()}/>
                    </Col>
                  </Row>
                </Grid>
              </div>
            </div>
      </div>
      );
  }
}

export default User;