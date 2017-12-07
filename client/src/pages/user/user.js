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
      profileTitle:"",
      userHasAlbums:""
    } 

  }

  componentDidMount(){
    this.getUserInfo()
  }

  getUserDetails() {
    API.getUserProfile({id: this.state.userId})
    .then(res => {
      this.setState({
        profileTitle: res.data.userName,
        profilePhoto: res.data.profilePicture,
        userHasAlbums:false
      })
    })
    .catch(err => (console.log(err)))
  }

  getUserInfo = event => {
   API.getUserProfileData({
      id: this.state.userId })
     .then(res => {
        console.log(res.data)
        res.data.length !== 0 ?
        this.setState({ 
        userAlbums: res.data,
        profileTitle: res.data[0].owner.firstName,
        profilePhoto: res.data[0].owner.profilePicture,
        userHasAlbums: true
        })
        : this.getUserDetails()
     })
     .catch(err => console.log(err));
  }


  render(){

    return (
      <div>

        <div className="container">
          <div className="row">
            <div className="col-md-10 col-md-offset-1">
              <div className="panel panel-default">
                <div className="panel-heading">
                  <h1>{this.state.profileTitle}</h1>
                </div>
                <div className="panel-body">

                  <div className="row">
                    <div className="col-md-12">
                    {/* start page content*/}

                      <div>
                        {(this.state.userId === sessionStorage.getItem("userId")) ? (
                             <Grid>
                              <Row>
                                <Button href="/publish" bsStyle="primary">Add Photos</Button>
                              </Row>
                            </Grid>
                          ) : (null)}
                         </div>
                            <div>
                              <div>
                                <h2>{this.state.profileTitle}'s Page</h2>
                                <Grid>
                                  <Row>
                                    <Col xs={6} md={3}>
                                      <Image 
                                      src={this.state.profilePhoto} 
                                      rounded={true} 
                                      responsive={true}/>
                                    </Col>
                                  </Row>
                                </Grid>
                              </div>
                              {this.state.userHasAlbums ? (
                               <div>       
                                <AlbumMini 
                                  albums={this.state.userAlbums} />
                                <div>
                                  <h1>Default Album componet to go here</h1>
                                </div>
                              </div>
                              ) : (
                            <div>
                              <h2> It looks like you don't have any albums! Add some photos</h2>
                            </div>
                          )}
                        </div>

                    {/* end page content*/}
                    </div>
                  </div>

                </div>

              </div>
            </div>
          </div>    
        </div>

      </div>
    );
  }
}

User.propTypes = {
  responsive: PropTypes.bool
};

export default User;