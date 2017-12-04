import React, { Component } from "react";
import API from '../../utils/API';

import AlbumPreview from '../../components/AlbumPreview'
import Like from '../../components/Like'

class AlbumView extends Component{
  state = {
    albumId: this.props.match.params.id,
    albumObj: {},
    albumPhotos: []
  }

  componentDidMount(){
    this.loadAlbum();
  }

  loadAlbum(){
    API.getAlbumById(this.state.albumId)
    .then(res => {
      this.setState({
        albumObj: res.data,
        albumPhotos: res.data.photos
      });
    })
    .catch(err => console.log(err))
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
          <div style={{backgroundColor : 'rgba(0, 0, 0, .75)', color: "white", fontSize: "1.1em",
            position: "relative"}}>
            <span style={{ marginLeft: "10px"}}>
              {this.state.albumObj.likes && this.state.albumObj.likes.length} likes | 
            </span>
            <Like style={{padding: "10px"}}></Like>
            <span>
              <a style={{color: "white", position: "absolute", right: "10px", top: "25%"}}>Add Photo</a>
            </span>
          </div>
          <div>
            <h4>comments</h4>
            <ul className="list-group">
            {this.state.albumObj.comments &&
              this.state.albumObj.comments.map(function(comment){
              return <li key={comment._id} className="list-group-item">{comment.comment}</li>
            })}
            </ul>
            <div className="input-group">
              <input type="text" className="form-control" 
                placeholder="Write comment..." aria-describedby="basic-addon2"></input>
              <span className="input-group-addon" id="basic-addon2">Post</span>
            </div>
          </div>
          <hr/>
        </div>
    );
  }

}

export default AlbumView;
