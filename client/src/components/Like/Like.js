import React, { Component } from "react";
import API from '../../utils/API';

const likeStyle = {
  likeTag: {
    color: "white",
    fontSize: "1.1em",
    marginLeft: "5px"
  },
  isLiked: {
    color: "blue"
  },
  isNotLiked: {
    color: "white"
  },
  likeCount: {
    color: "white",
    fontSize: "1.1em"
  }
}

class Likes extends Component{

  state = {
    likesCount : this.props.likesCount,
    parentId: this.props.parentId,
    parentType: this.props.parentType,
    isLiked: this.props.isLiked, 
    currentPhoto: this.props.currentPhoto,
    style: {
      ...this.props.style,
      color: "white",
      fontSize: "1.1em",
    }
  }

  componentWillReceiveProps(nextProps){
    this.setState({
      likesCount: nextProps.likesCount,
      parentId: nextProps.parentId,
      isLiked: nextProps.isLiked,
      currentPhoto: nextProps.currentPhoto
    });
  }

  updateLike = () => {
    if(this.state.isLiked){
      API.dislikePhoto(sessionStorage.getItem("userId"), this.state.parentId);
      this.setState({
        likesCount: this.state.likesCount - 1,
        isLiked: false
      });
      
      // const userIndex = this.state.currentPhoto.likes.indexOf(sessionStorage.getItem("userId"));
      // console.log("currentUser", userIndex);
      // this.state.currentPhoto.likes.splice(userIndex, 1);
    }
    else{
      API.likePhoto(sessionStorage.getItem("userId"), this.state.parentId);
      this.setState({
        likesCount: this.state.likesCount + 1,
        isLiked: true
      });
      // this.state.currentPhoto.likes.push(sessionStorage.getItem("userId"));
    }
    
    this.props.updateLike();
  }

  render(){
    return(
      <span style={this.state.style}>
        
        <span style={likeStyle.likeCount}>
          {this.state.likesCount} | 
        </span>
        
        <a style={likeStyle.likeTag} onClick={this.updateLike}>
          <span className="glyphicon glyphicon-thumbs-up" 
            style={this.state.isLiked ? likeStyle.isLiked : likeStyle.isNotLiked}></span> 
          <span style={this.state.isLiked ? likeStyle.isLiked : likeStyle.isNotLiked}>Like</span>
        </a>
      </span>
    );
  }
}

export default Likes;

