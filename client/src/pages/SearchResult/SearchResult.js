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
       <AlbumMini albums = {this.state.searchResults}/>
    )
  }
}

export default SearchResult;

