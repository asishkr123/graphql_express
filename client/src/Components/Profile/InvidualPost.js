import React, { Component } from "react";
import { getProfileByHandle } from "../../queries/profileQueries";
import Comments from "./Comments";
import LikePosts from "./LikePosts";
import { connect } from "react-redux";
class InvidualPost extends Component {
  state = {
    showComments: false
  };
  render() {
    const { post, name, deletePost } = this.props;
    const { showComments } = this.state;
    return (
      <div key={post._id} className="row">
        <div className="card col s12">
          <div className="row">
            <div className="card-content col s12">{post.text}</div>
            <div className="col s4 blue-text s2">{name}</div>
            {this.props.isAuthenticated &&
            this.props.id === this.props.user.id ? (
              <>
                <button
                  onClick={() => {
                    deletePost({
                      variables: {
                        id: post._id
                      },
                      refetchQueries: [
                        {
                          query: getProfileByHandle,
                          variables: this.props.handle
                        }
                      ]
                    });
                  }}
                  className="btn white col s1 black-text"
                  style={{ marginRight: "2px" }}
                >
                  <i className="material-icons">delete_outline</i>
                </button>
              </>
            ) : (
              <></>
            )}
            <div className="row">
            
            {this.props.isAuthenticated ? (
              <LikePosts
                likes={post.likes}
                id={post._id}
                handle={this.props.handle}
                fromDashboard = {this.props.fromDashboard}
              />
            ) : (
              <></>
            )}
            <div className="col s6">
            <button
              className="btn waves-effect waves-light blue-lighten-2 white-text"
              style={{ marginLeft: "5px" }}
              onClick={() => {
                this.setState(prevState => {
                  this.setState({
                    showComments: !prevState.showComments
                  });
                });
              }}
            >
              {!showComments ? "View" : "Hide"} Comments
            </button>
            </div>
            </div>
          </div>
        </div>

        {showComments ? (
          <Comments id={post._id} fromDashboard = {this.props.fromDashboard} comments={post.comment} />
        ) : (
          <></>
        )}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  isAuthenticated: state.user.isAuthenticated,
  user: state.user.user
});

export default connect(mapStateToProps)(InvidualPost);
