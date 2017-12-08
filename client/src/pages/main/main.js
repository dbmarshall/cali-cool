import React, { Component } from "react";
import API from '../../utils/API';
import "./Main.css";

import AlbumPreview from '../../components/AlbumPreview'

class Main extends Component{

  state = {
    recentPhotos: [],
    mostLikedPhotos:[]
  }

  componentDidMount(){
    this.loadRecentPhotos();
    this.loadMostLikedPhotos();
  }

  loadRecentPhotos = () => {
    API.getRecentPhotos()
    .then(res => {
      this.setState({recentPhotos: res.data});
    })
    .catch(err => console.log(err));
  }

  loadMostLikedPhotos = () => {
    API.getMostLikedPhotos()
    .then(res => {
      this.setState({mostLikedPhotos: res.data});
    })
    .catch(err => console.log(err));
  }

  render(){

    return (
      <div>

        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className="panel panel-default">
                <div className="panel-heading">
                  <h1>Cali.cool</h1>
                  <p>A growing visual record of what's going down in our state</p>
                </div>
                <div className="panel-body">

                  <div className="row">
                    <div className="col-md-12">
                    {/* start page content*/}

                      <hr/>

                      <h3 className="sub-heading">
                        <i class="fa fa-camera" aria-hidden="true"></i>&nbsp;
                        Most Liked Photos
                      </h3>

                      {this.state.mostLikedPhotos.length && <AlbumPreview photos={this.state.mostLikedPhotos}/>}

                      <hr/>
                      
                      <h3 className="sub-heading">
                        <i class="fa fa-camera" aria-hidden="true"></i>&nbsp;
                        Most Recent Photos
                      </h3>

                      {this.state.recentPhotos.length && <AlbumPreview photos={this.state.recentPhotos} />}

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

export default Main;