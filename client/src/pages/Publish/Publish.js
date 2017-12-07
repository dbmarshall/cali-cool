import React, { Component } from "react";
import API from "../../utils/API";
import "./Publish.css";
// import AlbumsSelect from "../../components/AlbumsSelect";

let ownerId;
let data_uri;
let objectURL;

class Publish extends Component {

  state = {
    // results: [],
    // file: '',
    name: '',
    imagePreviewUrl: '',
    width: '',
    height: '',
    specs: '',
    phototitle: '',
    photocaption: '',
    albums: '',
    albumname: '',
    albumselect: '',
    albumtext: '',
    albumId: '',
    preview: true,
    loading: '',
    published: ''
  };

  componentDidMount() {
    this.getSessionData();
    this.loadAlbums();
  };

  // Load User/Owner ID
  getSessionData = event => {
    ownerId = sessionStorage.getItem("userId");
  };

  // Load existing albums for select pulldown
  loadAlbums = () => {
    API.getUserAlbums(ownerId)
      .then(res =>
        this.setState({ albums: res.data})
      )
      .catch(err => console.log(err));
  };

  // User image selection
  handleFileBrowse = event => {

    let reader = new FileReader();
    let file = event.target.files[0];
    let name = event.target.files[0].name;
    objectURL = window.URL.createObjectURL(file);

    this.setState({ 
      preview: true,
      loading: false,
      published: false
    });

    reader.onload = () => {
      let img = new Image();
      img.onload = () => {
        this.setState({
          width: img.width,
          height: img.height,
          specs: '(' + img.width + 'x' + img.height + ')'
        });
      };
      data_uri = reader.result;

    };

    reader.onloadend = () => {
      this.setState({
        // file: file,
        name: name,
        imagePreviewUrl: data_uri
      // }, () => {
        // can run post-setState functions like this
      });
    };

    reader.readAsDataURL(file);

  };

  // Clears user image selection
  clearPreview = () => {

    this.setState({
      // file: '',
      name: '',
      imagePreviewUrl: '', 
      width: '',
      height: '',
      specs: ''
    });

  };

  // Clears most states
  clearAll = () => {

    this.setState({
      // file: '', 
      name: '', 
      imagePreviewUrl: '', 
      width: '',
      height: '',
      specs: '',
      phototitle: '', 
      photocaption: '', 
      album: '', 
      albumname: '',
      albumselect: '', 
      albumtext: '',
      albumId: '',
      preview: false,
      loading: false,
      published: true
    });

    this.clearSelect();

  };

  // Clears album selection
  clearSelect = () => {
    let dropDownComp = document.getElementById('albumselect');
    if (dropDownComp) {
      dropDownComp.selectedIndex = 0;
    }
  };

  // Handles any form input change
  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
    if (name === 'albumtext') {
      this.clearSelect();
      this.setState({
        albumname: value,
        albumselect: '',
        albumId: ''
      });
    } else if (name === 'albumselect') {
      this.setState({
        albumId: value,
        albumname: '',
        albumtext: ''
      });
    }
  };

  // Handles form submit
  handleFormSubmit = event => {
    event.preventDefault();

    this.setState({ 
      preview: false,
      loading: true,
      published: false
    });

    // Checks whether a value entered for "new album name".
    // If not, then go straight to addPhotoUpdateAlbum().
    if (this.state.albumtext) {

      this.createNewAlbum();

    } else {

      this.addPhotoUpdateAlbum();

    }

  };

  // Creates new album
  createNewAlbum = () => {
    API.createAlbum(ownerId, { 
          title: this.state.albumname, 
          owner: ownerId
        })
        .then(res => 
          this.setState({ 
            albumId: res.data._id
          })
        )
        .then( () => 
          this.loadAlbums()
        )
        .then( () => 
          this.addPhotoUpdateAlbum()
        )
        .catch(err => console.log(err));
    };

  // Adds new photo and inserts new photo ID into Albums collection
  addPhotoUpdateAlbum = () => {
    API.savePhoto(ownerId, {
      title: this.state.phototitle, 
      caption: this.state.photocaption, 
      album: this.state.albumId, 
      owner: ownerId,
      data_uri: this.state.imagePreviewUrl
    })
    .then( res => 

      API.updateAlbumPhoto(
        ownerId, 
        this.state.albumId, {
          photo: res.data._id
        })
      .then( 
        // Clears states
        this.clearAll()
      )
      .then(
        // Removes image data_uri to prevent memory leaks
        window.URL.revokeObjectURL(objectURL)
      )
      .catch(err => console.log(err))

    )
    .catch(err => console.log(err))
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
                                        onChange={this.handleFileBrowse}
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
                                Maximum allowable filesize is 5mb.<br/>
                                Recommended size >1600px in width.<br/>
                              </span>
                            </div>

                            <div className="form-group">
                              <label htmlFor="title">Title: 
                              <span className="redtext"><sup>*</sup></span></label>
                              <input 
                                value={this.state.phototitle}
                                onChange={this.handleInputChange}
                                name="phototitle"
                                id="phototitle"
                                placeholder="required" 
                                className="form-control" 
                              />
                            </div>

                            <div className="form-group">
                              <label htmlFor="caption">Caption:</label>
                              <textarea 
                                value={this.state.photocaption}
                                onChange={this.handleInputChange}
                                name="photocaption"
                                id="photocaption"
                                placeholder="" 
                                className="form-control" 
                              ></textarea>
                            </div>

                            <div className="form-group">
                              <label htmlFor="albumselect">Album: 
                              <span className="redtext"><sup>*</sup></span></label>
                              <br/>
                              <div className="input-group">

                                {/*{this.state.albums.length > 0 && 
                                  <AlbumsSelect albums={this.state.albums} handleInputChange={this.handleInputChange} />
                                }*/}

                                {this.state.albums.length > 0 && 
                                  <select 
                                    onChange={this.handleInputChange}
                                    name="albumselect"
                                    id="albumselect"
                                    className="form-control">
                                    <option value="">Select</option>
                                    {this.state.albums.map( (albums , i) => (
                                      <option value={albums._id} key={i}>{albums.title}</option>
                                    ))}
                                  </select>
                                }

                                <input 
                                  value={this.state.albumtext}
                                  onChange={this.handleInputChange}
                                  name="albumtext"
                                  id="albumtext" 
                                  placeholder="Enter new album name" 
                                  className="form-control" 
                                  style={{marginTop: '4px'}}
                                />

                              </div>
                            </div>

                              {/*disabled={!this.state.file || !this.state.title}*/}

                            <button 
                              type="submit" 
                              className="btn btn-default btn-primary" 
                              style={{marginTop: '10px'}}
                              disabled={
                                !this.state.imagePreviewUrl || 
                                !this.state.phototitle || 
                                (!this.state.albumtext && 
                                !this.state.albumselect)}
                              >
                              Upload
                            </button>

                          </form>

                          <div className="text-right">
                            <span className="small redtext">* Required</span>
                          </div>

                        </div>
                      </div>
                    </div>

                    <div className="col-md-5">
                      <div className="panel panel-default">
                        <div className="panel-body">

                          {this.state.preview && 
                            <div id="img-preview">
                              {/*{imagePreview}*/}
                              <p>Image preview:</p>
                              <img 
                                src={this.state.imagePreviewUrl} 
                                id="img-preview" 
                                alt="" 
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
                          }

                          {this.state.loading && 
                            <div id="uploading">
                              <p>Your image is uploading...</p>
                              <i className="fa fa-spinner fa-spin" aria-hidden="true" />
                            </div>
                          }

                          {this.state.published && 
                            <div id="published">
                              <h4>Publish Successful</h4>
                              <p>Feel free to add more photos.</p>
                              {/*<div>
                                  <p>You published the following:<p>
                                  {this.state.photosnew.map( (photosnew , i) => (
                                    <div>
                                      <a href={photos._id} key={i}>{photos.title}</a><br/>
                                    </div>
                                ))}</div>*/}
                            </div>
                          }

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
