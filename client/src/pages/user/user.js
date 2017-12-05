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
      profilePhoto:"",
      profileTitle:""
    } 

  }

  componentDidMount(){
    this.getUserInfo()
  }

  getUserInfo = event => {
   API.userProfileData({
      id: this.state.userId })
     .then(res => {
      // console.log(res.data);
      this.setState({ 
      userAlbums: res.data,
      profileTitle: res.data[0].owner.firstName,
      profilePhoto: res.data[0].owner.profilePicture
    })
      // console.log(this.state.userAlbums)
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
            <h2>{this.state.profileTitle}'s Page</h2>
            <Grid>
              <Row>
                <Col xs={6} md={3}>
                  <Image src={this.state.profilePhoto} rounded={true} responsive={true}/>
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