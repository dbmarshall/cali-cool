import React, { Component } from "react";
import { Button,Grid, Row, Col, Image, } from 'react-bootstrap';
import PropTypes from 'prop-types';
import AlbumMini from '../../components/AlbumMini'
import API from '../../utils/API';


class User extends Component {

  constructor(props){
    super(props);
    this.state = {
      userId: window.location.pathname.split('/')[2],
      userAlbums:[],
      profilePhoto:"",
      profileTitle:"",
      userHasAlbums:"",
      loadNewUser: ""
    } 
  }

  componentDidMount(){
    console.log("componentDidMount is loaded")
    this.getUserInfo()
 }

  // Guest user ("Jane") is on user page of "Joe". When Jane logs in reload page after Jane clicks the "account " link in header
   componentWillReceiveProps(nextProps){
    this.getUserInfo()
   }

  getUserDetails() {
    API.getUserProfile({id: this.state.userId})
    .then(res => {
      this.setState({
        profileTitle: res.data.userName,
        profilePhoto: res.data.profileImgUrl,
        userHasAlbums:false
      })
    })
    .catch(err => (console.log(err)))
  }

  getUserInfo = event => {
   API.getUserProfileData({
      id: window.location.pathname.split('/')[2] })
     .then(res => {
        res.data.length !== 0 ?
        this.setState({ 
        userAlbums: res.data,
        profileTitle: res.data[0].owner.firstName,
        profilePhoto: res.data[0].owner.profileImgUrl,
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
            <div className="col-md-12">
              <div className="panel panel-default">
                <div className="panel-heading">
                  <h1>
                    <span className="glyphicon glyphicon-user"></span>&nbsp;
                    {this.state.profileTitle}</h1>
                </div>
                <div className="panel-body">

                  <div className="row">
                    <div className="col-md-12">
                    {/* start page content*/}

                      <div>
                        <Grid style={{maxWidth: '100%'}}>
                          <Row>
                            <Col>
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
                          <h4>
                            <i className="fa fa-book" aria-hidden="true"></i>&nbsp;
                            Albums
                          </h4>
                          <AlbumMini 
                            albums={this.state.userAlbums} />
                        </div>

                      ) : (

                        <div>
                          <h4>
                            It looks like you don't have any photo albums! Add some now.
                          </h4>
                          {(this.state.userId === sessionStorage.getItem("userId")) ? (
                            <Button href="/publish" bsStyle="primary">Add Photos</Button>
                          ) : (null)}
                        </div>

                      )}

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