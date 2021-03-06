import React, { Component } from "react";
import { Redirect } from 'react-router'

import { Navbar, FormGroup, Button} from 'react-bootstrap';

import Autosuggest from 'react-autosuggest';

import API from '../../utils/API';

const theme = {
  container: {
    position: 'relative'
  },
  input: {
    // width: 240,
    // height: 30,
    padding: '5px 10px',
    // fontFamily: 'Arial, Helvetica, sans-serif',
    // fontWeight: 300,
    // fontSize: 16,
    // border: '1px solid #aaa',
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8
  },
  inputFocused: {
    outline: 'none'
  },
  inputOpen: {
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0
  },
  suggestionsContainer: {
    display: 'none'
  },
  suggestionsContainerOpen: {
    display: 'block',
    position: 'absolute',
    top: 34,
    width: 280,
    border: '1px solid #aaa',
    backgroundColor: '#fff',
    fontFamily: 'Helvetica, sans-serif',
    fontWeight: 300,
    fontSize: 16,
    borderBottomLeftRadius: 4,
    borderBottomRightRadius: 4,
    zIndex: 2
  },
  suggestionsList: {
    margin: 0,
    padding: 0,
    listStyleType: 'none',
  },
  suggestion: {
    cursor: 'pointer',
    padding: '10px 20px'
  },
  suggestionHighlighted: {
    backgroundColor: '#ddd'
  }
};

class Search extends Component {

  constructor() {
    super();

    this.state = {
      value: '',
      suggestions: [],
      albums : [],
      albumSearchResults : [],
      fireRedirect: false
    };    
  }

  componentDidMount(){
    API.getAlbumTitles()
    .then(res => {
      this.setState({albums: res.data});
    })
    .catch(err => console.log(err));
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ fireRedirect: false })
  }

  escapeRegexCharacters = (str) => {
    return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  }

  getSuggestions = (value) => {
    const escapedValue = this.escapeRegexCharacters(value.trim());
    
    if (escapedValue === '') {
      return [];
    }

    const regex = new RegExp(escapedValue, 'i');

    return this.state.albums.filter(album => regex.test(album.title));
  }

  getSuggestionValue = (suggestion) => {
    return suggestion.title;
  }

  renderSuggestion = (suggestion) => {
    return (
      <span>{suggestion.title}</span>
    );
  }

  onChange = (event, { newValue, method }) => {
    this.setState({
      value: newValue
    });
  }
  
  onSuggestionsFetchRequested = ({ value }) => {
    this.setState({
      suggestions: this.getSuggestions(value)
    });
  }

  onSuggestionsClearRequested = () => {
    this.setState({
      suggestions: []
    });
  }

  searchForAlbums = () =>{
    if(!this.state.value){
      return;
    }
    API.searchForAlbumsByTitle(this.state.value)
    .then(res => {
      this.setState({
        albumSearchResults: res.data,
        fireRedirect: true});
      })
    .catch(err => console.log(err));
  }

  render() {
    const { value, suggestions } = this.state;
    const inputProps = {
      placeholder: "Search for albums...",
      value,
      onChange: this.onChange
    };

    return (
      <div>
        <Navbar.Form style={{marginTop: '0', marginBottom: '0'}}>
          <FormGroup pullLeft style={{float: 'left', marginRight: '6px'}}>
            <Autosuggest 
              suggestions={suggestions}
              onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
              onSuggestionsClearRequested={this.onSuggestionsClearRequested}
              getSuggestionValue={this.getSuggestionValue}
              renderSuggestion={this.renderSuggestion}
              inputProps={inputProps}
              theme={theme}
            />
          </FormGroup>
          {' '}
          <Button type="submit" className="btn btn-primary btn-sm" style={{marginTop: '3px'}} onClick={this.searchForAlbums}>Go</Button>
        </Navbar.Form>

        {this.state.fireRedirect &&
          <Redirect to={{
              pathname: '/search/results',
              state: { results: this.state.albumSearchResults }
          }}/>
        }
      </div>
    );
  }
}

export default Search;
