import React, { Component } from "react";
import API from '../../utils/API';
import AlbumPreview from '../../components/AlbumPreview'
import AlbumPhotoComment from "../../components/AlbumPhotoComment";
import Like from '../../components/Like'

const sessionKeyUserId = "userId";

class AlbumView extends Component{
  state = {
    albumId: this.props.match.params.id,
    albumObj: {},
    albumPhotos: [],
    likesCount: 0
  }

  componentDidMount(){
    this.loadAlbum();
  }

  loadAlbum(){
    API.getAlbumById(this.state.albumId)
    .then(res => {
      console.log(this.state.albumObj)
      this.setState({
        albumObj: res.data,
        albumPhotos: res.data.photos,
        likesCount: res.data.likes.length
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

  render(){
    return(
      <div className="container">
        <div>
          <h3>{this.state.albumObj.title}</h3>
          <h4>
            <span style={{marginRight: "5px"}} className="glyphicon glyphicon-user"></span>
            <span>{this.state.albumObj.owner && this.state.albumObj.owner.firstName}</span> &nbsp;
            <span>{this.state.albumObj.owner && this.state.albumObj.owner.lastName}</span>
          </h4>
        </div>
        <div>
          {this.state.albumPhotos.length && <AlbumPreview photos={this.state.albumPhotos}/>}
        </div>
        <div style={{backgroundColor : 'rgba(0, 0, 0, .75)',position: "relative"}}>

        <Like position={{marginLeft: "10px"}}
          likesCount={this.state.albumObj.likes && this.state.albumObj.likes.length}
          updateLike={this.updateLike}
          isLiked={this.doesUserLikeAlbum()}>
        </Like>
          
        </div>
        <AlbumPhotoComment
          albumId={this.state.albumId} 
        />
        <hr/>
      </div>
    );
  }
}

export default AlbumView;
