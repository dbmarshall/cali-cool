import React, { Component } from "react";

class Publish extends Component {

  state = {
    results: [],
    file: '', 
    name: '', 
    imagePreviewUrl: ''
  };

  componentDidMount() {
    // this.loadArticles()
  }

  handleBrowse = event => {

    let reader = new FileReader();
    let file = event.target.files[0];
    let name = event.target.files[0].name;

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

  }

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  handleFormSubmit = event => {
    event.preventDefault();
    // API.apiPublish(this.state.topic, this.state.startyear, this.state.endyear)
    //   .then(res => {
    //     this.setState({ results: res, topic: "", startyear: "", endyear: "" });
    //   })
    //   .catch(err => console.log(err));
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
                            {/*<div className="form-group">
                              <label htmlFor="topic">Topic:</label><br/>
                              <input
                                value={this.state.topic}
                                onChange={this.handleInputChange}
                                name="topic"
                                placeholder="Enter Search Topic"
                                className="form-control" 
                                id="topic"
                              />
                            </div>*/}
                            <div className="form-group">
                              <label htmlFor="fileupload">Choose an image to upload:</label><br/>
                              <div className="input-group">
                                <label className="input-group-btn">
                                    <span className="btn btn-primary">
                                        Browse&hellip; 
                                        <input 
                                          onChange={this.handleBrowse}
                                          type="file" 
                                          name="fileupload" 
                                          style={{display: 'none'}} 
                                          multiple 
                                         />
                                    </span>
                                </label>
                                <input 
                                  value={this.state.name}
                                  type="text" 
                                  className="form-control"  
                                  readOnly
                                />
                              </div>
                              <button 
                                type="submit" 
                                className="btn btn-default btn-primary" 
                                style={{marginTop: '10px'}}>
                                Upload
                              </button>
                            </div>
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
                                maxWidth: '100%', 
                                maxHeight: '118px'
                              }}
                            />
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
