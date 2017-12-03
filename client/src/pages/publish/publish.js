import React, { Component } from "react";
// import { DropdownButton, MenuItem, InputGroup } from 'react-bootstrap';
import API from "../../utils/API";

class Publish extends Component {

  state = {
    // results: [],
    file: '',
    name: '',
    // filePath: '',
    imagePreviewUrl: '',
    width: '',
    height: '',
    specs: '',
    title: '',
    caption: '',
    albums: '',
    albumchoice: '',
    albumselect: '',
    // albumdropdown: '',
    albumtext: '',
    published: ''
  };

  componentDidMount() {
    // this.loadAlbums()
  }

  loadAlbums = () => {
    API.getAlbums()
      .then(res =>
        this.setState({ albums: res.data})
      )
      .catch(err => console.log(err));
  };

  handleBrowse = event => {

    let reader = new FileReader();
    let file = event.target.files[0];
    let name = event.target.files[0].name;
    // let path = event.target.files[0].webkitRelativePath;

    reader.onload = () => {
      let img = new Image();
      img.onload = () => {
        this.setState({
          width: img.width,
          height: img.height,
          specs: '(' + img.width + 'x' + img.height + ')'
        });
      };
      img.src = reader.result;
    };

    reader.onloadend = () => {
      this.setState({
        file: file,
        name: name,
        imagePreviewUrl: reader.result
      });
      // console.log('file: ', this.state.file)
      // console.log('name: ', this.state.name)
      // console.log('imagePreviewUrl: ', this.state.imagePreviewUrl)
    };

    reader.readAsDataURL(file);

  };

  clearPreview = () => {

    this.setState({
      file: '',
      name: '',
      // filePath: '',
      imagePreviewUrl: '', 
      width: '',
      height: '',
      specs: ''
    });

  };

  clearAll = () => {

    this.setState({
      file: '', 
      name: '', 
      // filePath: '',
      imagePreviewUrl: '', 
      width: '',
      height: '',
      specs: '',
      title: '', 
      caption: '', 
      album: '', 
      albumchoice: '',
      albumselect: '', 
      // albumdropdown: '', 
      albumtext: ''
    });

    let dropDown = document.getElementById('albumselect');
    dropDown.selectedIndex = 0;

  };

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
    // console.log(event.target.name);
    // console.log(event.target.value);
    // console.log(event);
    if (name === 'albumtext') {
      let dropDown = document.getElementById('albumselect');
      dropDown.selectedIndex = 0;
      this.setState({
        albumchoice: value,
        albumselect: ''
      });
    } else if (name === 'albumselect') {
      this.setState({
        albumchoice: value,
        albumtext: ''
      });
    }
    // console.log('this.state.albumchoice: ', this.state.albumchoice);
  };

  // handleSelectChange = event => {
  //   console.log(event);
  // };

  handleFormSubmit = event => {
    event.preventDefault();

      // console.log('this.state.albumselect: ', this.state.albumselect);
      // console.log('this.state.albumtext: ', this.state.albumtext);
      // console.log('this.state.albumchoice: ', this.state.albumchoice);

    // if (this.state.albumtext === '' && this.state.albumselect === '') {
    //   this.setState({
    //     albumchoice: ''
    //   });
    // }
    
    API.savePhoto({
        // imageUploadId: this.state.name,
        title: this.state.title, 
        caption: this.state.caption, 
        album: this.state.albumchoice,
        // filePath: this.state.path
        // image: this.state.imagePreviewUrl
      })
      .then(
        // res => this.loadArticles();
        // this.setState({ results: res, title: '', caption: '' });
        this.clearAll()
      )
      .catch(err => console.log(err));
  };

  render() {
    return (
      <div>

        <div className="container">
          <div className="row">
            <div className="col-md-10 col-md-offset-1">
              <div className="panel panel-default">
                <div className="panel-heading">
                  <h1>Publish</h1>
                </div>
                <div className="panel-body">

                  <div className="row">

                    <div className="col-md-5 col-md-offset-1">
                      <div className="panel panel-default">
                        <div className="panel-body">
                    
                          <form onSubmit={this.handleFormSubmit}>

                            <div className="form-group">
                              <label htmlFor="fileupload">Choose a photograph to upload:</label>
                              <div className="input-group">
                                <label className="input-group-btn">
                                  <span className="btn btn-primary">
                                      Browse&hellip; 
                                      <input 
                                        onChange={this.handleBrowse}
                                        type="file" 
                                        name="fileupload" 
                                        accept=".jpg, .jpeg, .png"
                                        style={{display: 'none'}} 
                                        multiple 
                                       />
                                  </span>
                                </label>
                                <input 
                                  value={this.state.name + ' ' + this.state.specs}
                                  type="text" 
                                  className="form-control"  
                                  readOnly
                                />
                              </div>
                              <span className="small">
                                Please, upload images at least 1600px in width.
                              </span>
                            </div>

                            <div className="form-group">
                              <label htmlFor="title">Title:</label>
                              <input 
                                value={this.state.title}
                                onChange={this.handleInputChange}
                                name="title"
                                id="title"
                                placeholder="required" 
                                className="form-control" 
                              />
                            </div>

                            <div className="form-group">
                              <label htmlFor="caption">Caption:</label>
                              <textarea 
                                value={this.state.caption}
                                onChange={this.handleInputChange}
                                name="caption"
                                id="caption"
                                placeholder="" 
                                className="form-control" 
                              ></textarea>
                            </div>

                            <div className="form-group">
                              <label htmlFor="albumselect">Album:</label>
                              <br/>
                              <div className="input-group">

                                <select 
                                  onChange={this.handleInputChange}
                                  name="albumselect"
                                  id="albumselect"
                                  className="form-control">
                                  <option value="default">Select</option>
                                  <option value="Coastal">Coastal</option>
                                  <option value="Mountains">Mountains</option>
                                  <option value="Central Valley">Central Valley</option>
                                </select>

                                <input 
                                  value={this.state.albumtext}
                                  onChange={this.handleInputChange}
                                  name="albumtext"
                                  id="albumtext" 
                                  placeholder="Enter new album name here" 
                                  className="form-control" 
                                  style={{marginTop: '4px'}}
                                />

                                {/*<DropdownButton 
                                  name="albumdropdown"
                                  title="Default" 
                                  id="albumdropdown"
                                  componentClass={InputGroup.Button}>
                                  <MenuItem 
                                    onSelect={this.handleSelectChange}
                                    value="Coastal"
                                    eventKey="1">
                                    Coastal
                                  </MenuItem>
                                  <MenuItem 
                                    onSelect={this.handleSelectChange}
                                    value="Mountains"
                                    eventKey="2">
                                    Mountains
                                  </MenuItem>
                                </DropdownButton>*/}

                              </div>
                            </div>

                            <button 
                              disabled={!this.state.file || !this.state.title}
                              type="submit" 
                              className="btn btn-default btn-primary" 
                              style={{marginTop: '10px'}}>
                              Upload
                            </button>

                          </form>

                        </div>
                      </div>
                    </div>

                    <div className="col-md-5">
                      <div className="panel panel-default">
                        <div className="panel-body">
                    
                          <div id="img-preview">
                            {/*{imagePreview}*/}
                            <img 
                              src={this.state.imagePreviewUrl} 
                              id="img-preview" 
                              alt="Upload preview..." 
                              style={{
                                maxWidth: '96%', 
                                maxHeight: '118px'
                              }}
                            />
                            {this.state.imagePreviewUrl && 
                              <button 
                                onClick={this.clearPreview}
                                type="button" 
                                title="Deselect this photo"
                                className="close"
                                style={{
                                  position: 'absolute', 
                                  zIndex: '10',
                                  top: '0', 
                                  right: '20px'
                                }}>
                                &times;
                              </button>}
                          </div>

                        </div>
                      </div>
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
export default Publish;
