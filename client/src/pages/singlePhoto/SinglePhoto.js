import React, { Component } from "react";
import { Button, Grid, Row, Col, Image} from 'react-bootstrap';
import Like from "../../components/Like";
import Comments from "../../components/Comments";
import API from "../../utils/API";
import Timestamp  from 'react-timestamp';

const btnStyle = {
  // marginTop: "5px",
  // marginBottom: "5px"
  marginLeft: "5px"
}

const likeTemp = {
  backgroundColor : 'rgba(0, 0, 0, .75)',
  padding: "9px 20px 9px 9px",
  borderRadius:"5px"
}

const subTitle = {
  fontSize: "1.5em",
  fontWeight: "bold",
  fontFamily: "Roboto, sans-serif",
  color: "black"
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
      ownerId:"",
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
    API.getAllPhotoData(
    { id:this.state.photoId })
    .then(res => {
      // console.log("singe page data", res.data.comments);
      console.log(res.data)
      this.setState({
        comments:res.data.comments,
        photoTitle: res.data.title,
        image: res.data.imageUrl,
        caption: res.data.caption,
        albumId: res.data.album._id,
        ownerId: res.data.owner._id,
        userAuth:sessionStorage.getItem("userId"),
        albumName:res.data.album.title,
        userName:res.data.owner.userName,
        photoObj:res.data,
        likesCount: res.data.likes.length,
        imageUploadId:res.data.imageUploadId,
        dateAdded:res.data.dateUpdated
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
      window.location.href = "/album/" + this.state.albumId;
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
    API.createComment({
      userId:sessionStorage.getItem("userId"),
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
          comments : res.data.comments,
          commentContent: ""
        })
      })
    })
    .catch(err => {
      console.log(err)})
  };

  render(){

    return (
      <div>

        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className="panel panel-default">
                <div className="panel-heading">
                  <h1>
                    <i class="fa fa-camera" aria-hidden="true"></i>&nbsp;
                    {this.state.photoTitle}
                  </h1>
                </div>
                <div className="panel-body">

                  <div className="row">
                    <div className="col-md-12">
                    {/* start page content*/}
                        <Grid style={{maxWidth: '100%'}}>
                          <Row>
                            <Col>
                              <Image src={this.state.image} rounded={true} responsive={true}/>
                              <p>{this.state.caption}</p>
                            </Col>
                          </Row>
                          <Row>
                            <Col md={8}>
                             <p> 
                              <a style={subTitle} 
                              href={'/album/' + this.state.albumId}>
                                <i class="fa fa-book" aria-hidden="true"></i>&nbsp;
                                {this.state.albumName}
                              </a>&nbsp;by &nbsp; 
                                <span >
                                <span className="glyphicon glyphicon-user" style={{fontSize: "1.5em"}}></span>
                                 <a style={subTitle} 
                                 href={'/user/' + this.state.ownerId}> {this.state.userName} </a> 
                                 </span>
                                <span><Timestamp time={this.state.dateAdded} format='ago' />
                                </span> 
                              </p>
                              </Col>
                              
                          </Row>
                           <Row>

                            <Col md={12} >
                              <span style={likeTemp}>
                                <Like position={{marginLeft: "10px"}}
                                  likesCount={this.state.photoObj.likes && this.state.photoObj.likes.length}
                                  updateLike={this.updateLike}
                                  isLiked={this.doesUserLikeAlbum()}>
                                </Like>
                                </span>
                            {this.state.ownerId === this.state.userAuth && 
                                      <Button 
                                        bsStyle="primary" 
                                        bsSize="medium" 
                                        style={btnStyle}
                                        onClick={this.handleSetProfilePhoto}
                                        value={this.state.photoId}
                                        name="setProfile"
                                        >
                                        Set as Profile Photo</Button>
                                }

                                {
                                  this.state.ownerId === this.state.userAuth &&
                                      <Button 
                                      bsStyle="danger" 
                                      bsSize="medium" 
                                      style={btnStyle}
                                      value={this.state.imageUploadId}
                                      onClick={this.handleDelete}
                                      >Delete
                                      Photo</Button>
                                }
                              </Col>
                          </Row>
                            <div>
                              <Comments 
                                addComment={this.handleInputChange}
                                commentsObj={this.state.comments}
                                userAuth={sessionStorage.getItem(sessionKeyUserId)}
                                commentContent={this.state.commentContent}
                                submit={this.handleFormSubmit}
                              />
                            </div>
                        </Grid>

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

export default SinglePhoto;