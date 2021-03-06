import React from "react";
import { Query } from "react-apollo";
import { profilePosts, getProfileByHandle } from "../../queries/profileQueries";
import Spinner from "../common/Spinner";
import { connect } from "react-redux";
import Post from "./Post";
import CreatePost from "./createPost";
import ProfileVisited from "./ProfileVisited";
import { Link } from "react-router-dom";
class Posts extends React.Component {
  render() {
    return (
      <Query
        query={
          this.props.match.params.handle ? getProfileByHandle : profilePosts
        }
        variables={
          this.props.match.params.handle
            ? { handle: this.props.match.params.handle }
            : {}
        }
        onError={error => console.log(error)}
        onCompleted={data => {
          console.log(data);
        }}
      >
        {({ data, loading, error }) => {
          return loading ? (
            <Spinner />
          ) : (
            <div className="row">
              <div className="card col s12">
                <div className="card-content">
                  <div className="row">
                    <h3 className="blue-text col s12 center-align lighten-2-text">
                      {this.props.match.params.handle
                        ? data.getProfileByHandle.handle
                        : data.currentProfile.handle}
                    </h3>
                    <Link
                      to={`/github-profile/${
                        this.props.match.params.handle
                          ? data.getProfileByHandle.githubusername
                          : data.currentProfile.githubusername
                      }`}
                    >
                      <button className="btn offset-s3 col s4 white blue-text lighten-2-text">
                        View gitHub repos
                      </button>
                    </Link>
                  </div>

                  <Post
                    posts={
                      this.props.match.params.handle
                        ? data.getProfileByHandle.user.posts
                        : data.currentProfile.user.posts
                    }
                    name={
                      this.props.match.params.handle
                        ? data.getProfileByHandle.user.name
                        : data.currentProfile.user.name
                    }
                    id={
                      this.props.match.params.handle
                        ? data.getProfileByHandle.user._id
                        : data.currentProfile.user._id
                    }
                    handle={
                      this.props.match.params.handle
                        ? data.getProfileByHandle.handle
                        : data.currentProfile.handle
                    }
                  />
                  {this.props.isAuthenticated ? <CreatePost /> : <></>}

                  {this.props.match.params.handle ? (
                    <ProfileVisited id={data.getProfileByHandle.user._id} />
                  ) : (
                    <></>
                  )}
                </div>
              </div>
            </div>
          );
        }}
      </Query>
    );
  }
}

const mapStateToProps = state => ({
  isAuthenticated: state.user.isAuthenticated
});

export default connect(mapStateToProps)(Posts);
