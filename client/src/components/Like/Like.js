import React, { Component } from "react";

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


class Like extends Component{

  render(){
    return(
      <span style={this.props.position}>
        
        <span style={likeStyle.likeCount}>
          {this.props.likesCount} 
        </span>
        
        { sessionStorage.getItem("userId") ?
          <span>
            <span style={likeStyle.likeTag}> | </span>
            <a style={likeStyle.likeTag} onClick={this.props.updateLike}>
              <span style={this.props.isLiked ? likeStyle.isLiked : likeStyle.isNotLiked}
                className="glyphicon glyphicon-thumbs-up"></span> 
              <span style={this.props.isLiked ? likeStyle.isLiked : likeStyle.isNotLiked}>Like</span>
            </a>
          </span> :
          <span style={likeStyle.likeTag}>Likes</span>
        }

      </span>
    );
  }
}

export default Like;
