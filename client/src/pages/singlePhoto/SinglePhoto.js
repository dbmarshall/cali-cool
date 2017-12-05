import React, { Component } from "react";
import { Button, Grid, Row, Col, Image, Badge} from 'react-bootstrap';
// Check with Minu if I can use LIKE for this component
// import Like from "../../components/Like";
import AlbumPhotoComment from "../../components/AlbumPhotoComment"
import API from "../../utils/API";

const btnStyle = {
  marginTop: "5px",
  marginBottom: "5px"
}

class SinglePhoto extends Component {

  constructor(props){
    super(props);
    // console.log(props)
    this.state = {
      photoId: this.props.location.pathname.split('/')[2],
      photoTitle:"",
      image:"",
      caption:"",
      albumId:"",
      albumName:"",
      userId:"",
      dateAdded:"",
      likes: "",
      commentContent: "",
      userAuth:"",
      userName:""
    }

  }

  componentDidMount() {
    this.getPhotoData()
  }
  // What happens when user deletes? redirect to?
   
  getPhotoData = event => {
    // console.log(this.state.photoId)
    API.getSinglePhotoData(
    { id:this.state.photoId })
    .then(res => {
      console.log(res.data);
      this.setState({
        photoTitle: res.data[0].title,
        image: res.data[0].link,
        caption: res.data[0].caption,
        albumId: res.data[0].album._id,
        userId: res.data[0].owner._id,
        userAuth:sessionStorage.getItem("userId"),
        albumName:res.data[0].album.title,
        userName:res.data[0].owner.userName,
      })
      console.log(this.state.userId)
      console.log("user auth on single", this.state.userAuth);
      console.log("user photo on single", this.state.photoId);
    })
    .catch(err => console.log(err))
  }
  // Like component
    // GET
    // POST

  // Delete component
  handleDelete = event => {
    console.log("delete button clicked")
    API.deletePhoto(this.state.photoId)
    .then(res => {
      console.log(res)
    })
    .catch(err => console.log(err))
  }


  // Set as profile photo


  render(){

    return (
      <div className= "container">
         <div>
            <Grid>
              <Row>
                <Col>
                   <h2>{this.state.photoTitle}</h2>
                </Col>
              </Row>
              <Row>
                <Col xs={6} md={6}>
                  <Image src={this.state.image} rounded={true} responsive={true}/>
                  <p>{this.state.caption}</p>
                </Col>
              </Row>
              <Row>
                <Col xs={6} md={6}>
                 <p> 
                  <a href={'/album/' + this.state.albumId}>{this.state.albumName} </a> 
                  by 
                    <span>
                     <a href={'/user/' + this.state.userId}> {this.state.userName} </a> 
                     </span>
                    <span>date added</span> 
                  </p>
                </Col>
              </Row>
               <Row>
                <Col xs={6} md={6}>
                    <Button bsStyle="primary" bsSize="large">Like! <Badge> 42</Badge></Button>
                </Col>
              </Row>
              {this.state.userId === this.state.userAuth ? (
                <div>
                <Row>
                <Col xs={6} md={6}>
                    <Button bsStyle="primary" bsSize="large" style={btnStyle}>Set as Profile Photo</Button>
                </Col>
                </Row>
                <Row>
                  <Col xs={6} md={6}>
                      <Button 
                      bsStyle="primary" 
                      bsSize="large" 
                      style={btnStyle}
                      value={this.state.photoId}
                      onClick={this.handleDelete}
                      >Delete
                      Photo</Button>
                  </Col>
                </Row>
                </div>
                ) : (
                  <AlbumPhotoComment 
                  photoId={this.state.photoId}
                  userId={this.state.userAuth}
                  />
                )} 
            </Grid>
          </div>
      </div>
      );
  }
}


export default SinglePhoto;