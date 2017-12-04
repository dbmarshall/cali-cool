import React, { Component } from "react";
import API from "../../utils/API";
// import AlbumsSelect from "../../components/AlbumsSelect";
// import { DropdownButton, MenuItem, InputGroup } from 'react-bootstrap';


// const session = sessionStorage.getItem("key");
// console.log(session)
// const owner = "5a257cd50bf6d51f821058d5";
// console.log(owner)

class Publish extends Component {

  state = {
    // results: [],
    file: '',
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
    albumId: ''//
    // published: ''
  };

  componentDidMount() {
    this.loadAlbums();
    this.getSessionData();
  }

  getSessionData = event => {
    const session = sessionStorage.getItem("userId");
    return session;
  }
  // Load existing albums for select
  loadAlbums = () => {
    API.getUserAlbums(this.getSessionData())
      .then(res =>
        this.setState({ albums: res.data})
      )
      .catch(err => console.log(err));
  };
  // User image selection
  handleBrowse = event => {

    let reader = new FileReader();
    let file = event.target.files[0];
    let name = event.target.files[0].name;

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
    };

    reader.readAsDataURL(file);

  };

  // Clears user image selection
  clearPreview = () => {

    this.setState({
      file: '',
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
      file: '', 
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
      albumId: ''
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
    
    // Checks whether a value entered for "new album name".
    // If not, then go straight to addPhotoUpdateAlbum().
    if (this.state.albumtext) {

      API.createAlbum(this.getSessionData(), { 
        title: this.state.albumname, 
        owner: this.getSessionData()
      })
      .then(res => 
        this.setState({ 
          albumId: res.data._id
        })
      )
      .then( () => 
        this.addPhotoUpdateAlbum()
      )
      .catch(err => console.log(err));

    } else {

      this.addPhotoUpdateAlbum();

    }

  };

  // Adds new photo and inserts new photo ID into Albums collection
  addPhotoUpdateAlbum = () => {
    API.savePhoto(this.getSessionData(), {
      title: this.state.phototitle, 
      caption: this.state.photocaption, 
      album: this.state.albumId, 
      owner: this.getSessionData()
    })
    .then( res => 

      API.updateAlbumPhoto(
        this.getSessionData(), 
        this.state.albumId, {
          photo: res.data._id
        })
      .then( 
        // ?? 
        this.clearAll()
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
                              <label htmlFor="albumselect">Album:</label>
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
                                    <option value="default">Select</option>
                                    {this.state.albums.map( (albums , i) => (
                                      <option value={albums._id} key={i}>{albums.title}</option>
                                    ))}
                                  </select>
                                }

                                {/*<select 
                                  onChange={this.handleInputChange}
                                  name="albumselect"
                                  id="albumselect"
                                  className="form-control">
                                  <option value="">Select</option>
                                  <option value="5a221a8793404dd2c1ff8b6f">SanFrancisco Golden Gate</option>
                                  <option value="5a221a8793404dd2c1ff8b6d">Yosemite - ThanksGiving Break</option>
                                </select>*/}

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
