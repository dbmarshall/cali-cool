  
import React, { Component } from "react";


class Likes extends Component{

  state = {
    style: 
    {
      ...this.props.style,
      color: "white",
      fontSize: "1.1em",
      backgroundColor : 'rgba(0, 0, 0, 0)',
      border: "none"
    }
  }

  render(){
    return(
       <button href="#" style={this.state.style}>
          <span className="glyphicon glyphicon-thumbs-up"></span> Like
        </button>
      );
  }
}

export default Likes;

