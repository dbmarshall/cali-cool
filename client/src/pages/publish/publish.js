import React, { Component } from "react";
import { DropdownButton, MenuItem } from 'react-bootstrap';
import API from "../../utils/API";

class Publish extends Component {

  state = {
    // results: [],
    file: '',
    name: '',
    filePath: '',
    imagePreviewUrl: '',
    width: '',
    height: '',
    specs: '',
    title: '',
    caption: '',
    albums: '',
    album: '',
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
        // filePath: path,
        imagePreviewUrl: reader.result
      });
      console.log('file: ', this.state.file)
      console.log('name: ', this.state.name)
      console.log('path: ', this.state.path)
      console.log('imagePreviewUrl: ', this.state.imagePreviewUrl)
    };

    reader.readAsDataURL(file);

  }

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

  }

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
      album: ''
    });

  }

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  handleFormSubmit = event => {
    event.preventDefault();
    API.savePhoto({
        // imageUploadId: this.state.name,
        title: this.state.title, 
        caption: this.state.caption, 
        album: 'default',
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
                              <label htmlFor="fileupload">Choose an image to upload:</label>
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
                              <label htmlFor="title">Photo Title:</label>
                              <input 
                                value={this.state.title}
                                onChange={this.handleInputChange}
                                name="title"
                                placeholder="required" 
                                className="form-control" 
                                id="title"
                              />
                            </div>

                            <div className="form-group">
                              <label htmlFor="caption">Photo Caption:</label>
                              <textarea 
                                value={this.state.caption}
                                onChange={this.handleInputChange}
                                name="caption"
                                placeholder="" 
                                className="form-control" 
                                id="caption"
                              ></textarea>
                            </div>

                            <div className="form-group">
                              <label htmlFor="albumselect">Select an Album:</label>
                              <br/>
                              <DropdownButton 
                                value={this.state.albumselect}
                                onChange={this.handleInputChange}
                                name="albumselect"
                                title="Default" 
                                id="albumselect">
                                {/*<MenuItem eventKey="1">Coast</MenuItem>
                                <MenuItem eventKey="2">Mountains</MenuItem>
                                <MenuItem eventKey="3">Central Valley</MenuItem>*/}
                              </DropdownButton>
                            </div>
                            <div className="form-group">
                              <label htmlFor="albuminput">Or Create a New Album:</label>
                              <input 
                                value={this.state.album}
                                onChange={this.handleInputChange}
                                name="albuminput"
                                placeholder="" 
                                className="form-control" 
                                id="albuminput"
                              />
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
