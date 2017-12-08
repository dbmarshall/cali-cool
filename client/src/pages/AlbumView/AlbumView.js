import React, { Component } from "react";
import API from '../../utils/API';
import AlbumPreview from '../../components/AlbumPreview'
import Comments from "../../components/Comments";
import Like from '../../components/Like';

const sessionKeyUserId = "userId";

const style = {
  likeSpan : {
    backgroundColor : 'rgba(0, 0, 0, .75)', 
    padding: "7px",
    borderRadius:"5px",
    width: "120px",
    marginTop: "15px"
  }
}

class AlbumView extends Component{
  state = {
    albumId: this.props.match.params.id,
    albumObj: {},
    albumPhotos: [],
    likesCount: 0,
    comments:[],
    commentContent:"",
    commmentId:""
  }

  componentDidMount(){
    this.loadAlbum();
  }

  loadAlbum(){
    API.getAlbumById(this.state.albumId)
    .then(res => {
      console.log(res.data)
      this.setState({
        albumObj: res.data,
        albumPhotos: res.data.photos,
        likesCount: res.data.likes.length,
        comments:res.data.comments
      });
    })
    .catch(err => console.log(err))
  }

  updateLike =() => {
    const loggedInUserId = sessionStorage.getItem(sessionKeyUserId);
    const userIndex = this.state.albumObj.likes.indexOf(loggedInUserId);

    if(userIndex > -1){
      this.state.albumObj.likes.splice(userIndex, 1);
      API.unlikeAlbum(loggedInUserId, this.state.albumObj._id);
      this.setState({
        likesCount: this.state.likesCount - 1
      })
    }
    else{
      this.state.albumObj.likes.push(loggedInUserId);
      API.likeAlbum(loggedInUserId, this.state.albumObj._id);
      this.setState({
        likesCount: this.state.likesCount + 1
      })
    }    
  }

  doesUserLikeAlbum = () => {
    if(sessionStorage.getItem("userId") && this.state.albumObj.likes){
      for(let userId of this.state.albumObj.likes){
        if(userId.toString() === sessionStorage.getItem(sessionKeyUserId)){
          return true;
        }
      }
    }
    return false;
  }

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    })
  }
  
  handleFormSubmit = event => {
    event.preventDefault();
    console.log(this.state.albumId)
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
      API.insertCommentToAlbum({
        commentId: this.state.commmentId,
        albumId: this.state.albumId
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
    return(
      <div>

        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className="panel panel-default">
                <div className="panel-heading">
                  <h1>
                    <i class="fa fa-book" aria-hidden="true"></i>&nbsp;
                    {this.state.albumObj.title}</h1>
                </div>
                <div className="panel-body">

                  <div className="row">
                    <div className="col-md-12">
                    {/* start page content*/}

                      <div>
                        <h3 className="sub-heading">
                          <a style={{color: "black"}}
                            href={this.state.albumObj.owner && "/user/" + this.state.albumObj.owner._id}>
                            <span style={{marginRight: "5px"}} className="glyphicon glyphicon-user"></span>
                            <span>{this.state.albumObj.owner && this.state.albumObj.owner.userName}</span>
                          </a>
                        </h3>
                      </div>
                      <div>
                        {this.state.albumPhotos.length && <AlbumPreview photos={this.state.albumPhotos}/>}
                      </div>
                      <div style={style.likeSpan}>

                        <Like position={{marginLeft: "10px"}}
                          likesCount={this.state.albumObj.likes && this.state.albumObj.likes.length}
                          updateLike={this.updateLike}
                          isLiked={this.doesUserLikeAlbum()}>
                        </Like>
                          
                      </div>

                      <Comments 
                        addComment={this.handleInputChange}
                        commentsObj={this.state.comments}
                        userAuth={sessionStorage.getItem(sessionKeyUserId)}
                        commentContent={this.state.commentContent}
                        submit={this.handleFormSubmit}
                      />

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

export default AlbumView;
