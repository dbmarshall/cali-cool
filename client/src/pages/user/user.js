import React, { Component } from "react";
import { Button,Grid, Row, Col, Image, } from 'react-bootstrap';
import PropTypes from 'prop-types';
import AlbumMini from '../../components/AlbumMini'
import API from '../../utils/API';


class User extends Component {

  constructor(props){
    super(props);
    this.state = {
      userId: this.props.location.pathname.split('/')[2],
      userAlbums:[],
      userProfilePhoto:"",

    } 

  }

  componentDidMount(){
    this.getUserInfo()
  }

  getUserInfo = event => {
   API.userProfileData({
      id: this.state.userId })
     .then(res => {
      console.log(res.data);
      this.setState({ 
      userAlbums: res.data })
      console.log(this.state.userAlbums)
     })
     .catch(err => console.log(err));
  }


  render(){

    return (
      <div className= "container">
         <div>
         <Grid>
          <Row>
            <Button href="/publish" bsStyle="primary">Add Photos</Button>
          </Row>
         </Grid>
            <h2>Jane's Profile</h2>
            <Grid>
              <Row>
                <Col xs={6} md={3}>
                  <Image src="https://i.pinimg.com/736x/23/9e/a3/239ea3028a12dc33bda27d300d7f67ce--california-palm-trees-california-love.jpg" rounded={true} responsive={true}/>
                </Col>
              </Row>
            </Grid>
            </div>
        <AlbumMini 
          albums={this.state.userAlbums} />
        <div>
          <h1>Default Album componet to go here</h1>
        </div>
      </div>
      );
  }
}

User.propTypes = {
  responsive: PropTypes.bool
};

export default User;