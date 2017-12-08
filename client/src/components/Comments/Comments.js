import React, { Component } from "react";
import { Button, Grid, Row, Col, form, FormControl, ListGroup, ListGroupItem, FormGroup, InputGroup } from 'react-bootstrap';
import Timestamp  from 'react-timestamp';

const commentDiv = {
  marginTop: "10px",
  marginBottom: "10px"
}

class Comments extends Component {

  state = {
    photoId:"",
    albumId:"",
    commentContent:"",
    commentId:"",
    userId:"",
    comments:[]
  }


  componentWillReceiveProps(nextProps){
      // console.log(nextProps.commentsObj)
      this.setState({
        comments:nextProps.commentsObj,
        userId:nextProps.userAuth
      })
  }

  render() {

    return (
      <div>
      {console.log(this.state.comments.length)}
        <br/>

        {((this.state.comments.length === 0) && (!this.state.userId)) ? ( null) : (
          <div>
          <p><strong>Comments:</strong></p>
          <div style={commentDiv}>
            <Grid style={{maxWidth: '100%'}}>
              <Row>
                <Col>
                  {((this.state.comments.length === 0) && (this.state.userId )) ? (
                    <form onSubmit={this.props.submit}>
                      <FormGroup>
                        <InputGroup>
                          <FormControl
                            id="formControlsText"
                            type="text"
                            label="Text"
                            placeholder="Enter text"
                            name="commentContent"
                            value={this.props.commentContent}
                            onChange={this.props.addComment}
                          />
                          <InputGroup.Button>
                            <Button type="submit" bsStyle="primary">Post</Button>
                          </InputGroup.Button>
                        </InputGroup>
                      </FormGroup>
                    </form>
                ) : (
                  <ListGroup>
                  { this.props.commentsObj.map((comment , i) => {
                    return (
                      <ListGroupItem key={comment._id}>
                        <p>{comment.user.userName}<span> | </span>
                        <Timestamp time={comment.dateCreated} format='ago' />
                        </p>
                        <p>{comment.comment}</p>
                      </ListGroupItem>
                      )}
                    )}
                  </ListGroup>
                  )}
                </Col>
              </Row>
            </Grid>
          </div>
        </div>
          )}
      </div>
      )
    };
}

export default Comments;