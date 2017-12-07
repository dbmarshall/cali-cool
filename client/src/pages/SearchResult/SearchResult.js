import React, { Component } from "react";
import AlbumMini from '../../components/AlbumMini'

class SearchResult extends Component {

  state = {
    searchResults : this.props.location.state.results
  }
    
  componentWillReceiveProps(nextProps){
    this.setState({
      searchResults: nextProps.location.state.results
    })
  }

  render(){
    return(
      <div>

        <div className="container">
          <div className="row">
            <div className="col-md-10 col-md-offset-1">
              <div className="panel panel-default">
                <div className="panel-heading">
                  <h1>Search Results</h1>
                </div>
                <div className="panel-body">

                  <div className="row">
                    <div className="col-md-12">
                    {/* start page content*/}

                      <AlbumMini albums = {this.state.searchResults}/>

                    {/* end page content*/}
                    </div>
                  </div>

                </div>

              </div>
            </div>
          </div>    
        </div>

      </div>
    )
  }
}

export default SearchResult;

