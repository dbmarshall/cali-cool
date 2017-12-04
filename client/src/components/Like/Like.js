  
import React, { Component } from "react";

const likeStyle = {
  likeTag: {
    color: "white",
    fontSize: "1.1em",
    marginLeft: "5px"
  },
  likeCount: {
    color: "white",
    fontSize: "1.1em"
  }
}

class Likes extends Component{

  state = {
    style: {
      ...this.props.style,
      color: "white",
      fontSize: "1.1em",
    }
  }

  updateLike = () => {
    console.log("child update clicked");
    this.props.updateLike();
  }

  onclick(){
    this.setState({likesCount: this.state.likesCount++})
  }

  render(){
    return(
      <span style={this.state.style}>
        
        <span style={likeStyle.likeCount}>
          {this.props.likesCount} likes |
        </span>
        
        <a style={likeStyle.likeTag} onClick={this.updateLike}>
            <span className="glyphicon glyphicon-thumbs-up"></span> Like
        </a>
      </span>
    );
  }
}

export default Likes;

