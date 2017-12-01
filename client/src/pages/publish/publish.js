import React, { Component } from "react";

class Publish extends Component {

  state = {
    results: [],
  };

  componentDidMount() {
    this.loadArticles()
  }

  openModal = (commentArticleId, commentArticleTitle)  => this.setState({ 
    open: true, 
    comment: "", 
    commentArticleId: commentArticleId, 
    commentArticleTitle: commentArticleTitle
  });

  closeModal = () => this.setState({
    open: false, 
    comment: ""
  });
 
  saveComment = () => {
  };

  loadArticles = () => {
  };

  saveArticle = targetIndex => {
  };

  deleteArticle = id => {
  };

  deleteComment = id => {
  };

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  handleFormSubmit = event => {
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
                  page content 
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
