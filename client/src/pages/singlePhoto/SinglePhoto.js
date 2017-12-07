import React, { Component } from "react";
import { Button, Grid, Row, Col, Image} from 'react-bootstrap';
import Like from "../../components/Like";
import Comments from "../../components/Comments";
import API from "../../utils/API";

const btnStyle = {
  marginTop: "5px",
  marginBottom: "5px"
}

const likeTemp = {
  backgroundColor: "grey"
}

const sessionKeyUserId = "userId";

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
      likesCount: 0,
      userAuth:"",
      userName:"",
      photoObj:{},
      imageUploadId:"",
      comments:[],
      commentContent:"",
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
      console.log("singe page data", res.data.comments);
      this.setState({
        comments:res.data.comments,
        photoTitle: res.data.title,
        image: res.data.imageUrl,
        caption: res.data.caption,
        albumId: res.data.album._id,
        userId: res.data.owner._id,
        userAuth:sessionStorage.getItem("userId"),
        albumName:res.data.album.title,
        userName:res.data.owner.userName,
        photoObj:res.data,
        likesCount: res.data.likes.length,
        imageUploadId:res.data.imageUploadId
      })
    //   console.log(this.state.userId)
    //   console.log("user auth on single", this.state.userAuth);
    //   console.log("user photo on single", this.state.photoId);
    })
    .catch(err => console.log(err))
  }
  
  updateLike =() => {
    const loggedInUserId = sessionStorage.getItem(sessionKeyUserId);
    // console.log(loggedInUserId);
    // console.log(this.state.likesCount)
    const userIndex = this.state.photoObj.likes.indexOf(loggedInUserId);
    console.log(userIndex)

    if(userIndex > -1){
      this.state.photoObj.likes.splice(userIndex, 1);
      API.unlikePhoto(loggedInUserId, this.state.photoObj._id);
      this.setState({
        likesCount: this.state.likesCount - 1
      })
    }
    else{
      this.state.photoObj.likes.push(loggedInUserId);
      API.likePhoto(loggedInUserId, this.state.photoObj._id);
      this.setState({
        likesCount: this.state.likesCount + 1
      })
    }    
  }

   doesUserLikeAlbum = () => {
    if(sessionStorage.getItem("userId") && this.state.photoObj.likes){
      for(let userId of this.state.photoObj.likes){
        if(userId.toString() === sessionStorage.getItem(sessionKeyUserId)){
          return true;
        }
      }
    }
    return false;
  }

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
  handleSetProfilePhoto = event => {
    console.log("set profile clicked")
    API.updateProfilePhoto({
      userId:this.state.userAuth,
      photoId: this.state.photoId,
      imageUploadId: this.state.imageUploadId
    })
    .then(res => {
      console.log(res)
    })
    .catch(err => console.log(err))
  }

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    })
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
        this.setState({ 
          comments : res.data.comments

        })
      })
    })
    .catch(err => {
      console.log(err)})
  };


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
                <Col xs={6} md={6} style={likeTemp}>
                    <Like position={{marginLeft: "10px"}}
                      likesCount={this.state.photoObj.likes && this.state.photoObj.likes.length}
                      updateLike={this.updateLike}
                      isLiked={this.doesUserLikeAlbum()}>
                    </Like>
                </Col>
              </Row>
              { (this.state.userId === this.state.userAuth) ? (
                <div>
                    <Row>
                    <Col xs={6} md={6}>
                        <Button 
                          bsStyle="primary" 
                          bsSize="large" 
                          style={btnStyle}
                          onClick={this.handleSetProfilePhoto}
                          value={this.state.photoId}
                          name="setProfile"
                          >
                          Set as Profile Photo</Button>
                    </Col>
                    </Row>
                    <Row>
                      <Col xs={6} md={6}>
                          <Button 
                          bsStyle="primary" 
                          bsSize="large" 
                          style={btnStyle}
                          value={this.state.imageUploadId}
                          onClick={this.handleDelete}
                          >Delete
                          Photo</Button>
                      </Col>
                    </Row>
                    </div>
                ) : 
                  (null)      
              }
                <div>
                    <Comments 
                      addComment={this.handleInputChange}
                      commentsObj={this.state.comments}
                      userAuth={this.state.userId}
                      commentContent={this.state.commentContent}
                      submit={this.handleFormSubmit}
                    />
                </div>
            </Grid>
          </div>
      </div>
      );
  }
}


export default SinglePhoto;