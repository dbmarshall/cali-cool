  
import React, { Component } from "react";


class Comment extends Component{

  state = {
    style: 
    {
      ...this.props.style,
      color: "white",
      fontSize: "1.1em",
      backgroundColor   : 'rgba(0, 0, 0, 0)',
      border: "none"
    }
  }

  render(){
    return(
       <button style={this.state.style}>
          <span className="glyphicon glyphicon-comment"></span> Comment
        </button>
      );
  }
}

export default Comment;

