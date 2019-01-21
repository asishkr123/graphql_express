import React from "react";
import { connect } from "react-redux";
import { Query } from "react-apollo";
import { getCurrentProfile } from "../../queries/profileQueries";
import Spinner from "../common/Spinner";
import GithubProfile from "../Profile/GithubProfile";
import { Link } from "react-router-dom";
import InvidualPost from "../Profile/InvidualPost";
function Dashboard() {
  return (
    <div className="container">
      <Query
        query={getCurrentProfile}
        onCompleted={data => {
          console.log(data);
        }}
      >
        {({ data, loading, error }) => {
          return loading ? (
            <Spinner />
          ) : data.currentProfile === null ? (
            <h4
              className="center-align blue-text lighten-2-text"
              style={{ margin: "auto" }}
            >
              Make a Profile to view it here
            </h4>
          ) : (
            <div className="row">
              <h4 className="col s10 center-align blue-text lighten-2-text">
                {data.currentProfile.handle}
              </h4>

              <Link
                to={{
                  pathname: "/edit-profile",
                  state: { profile: data.currentProfile }
                }}
              >
                <button
                  style={{ marginTop: "20px" }}
                  className="btn waves-effect waves-light offset-s5 col s4 white blue-text lighten-2-text"
                >
                  edit Profile
                </button>
              </Link>

              <div className="col s6 card">
                <div className="card-content">
                  <div className="row">
                    <div className="row col s4">
                      <Link to="/posts">
                        <div className="col s12 blue-text">
                          {data.currentProfile.user.posts.length}
                        </div>
                      </Link>
                      <div className="col s12 blue-text lighten-2-text">
                        Posts
                      </div>
                    </div>
                    <div className="row col s4">
                      <Link
                        to={{
                          pathname: `/following/${data.currentProfile.user._id}`,
                          state   :  {followed : true}
                        }}
                      >
                        <div className="col s12 blue-text">
                          {data.currentProfile.following.length}
                        </div>
                      </Link>
                      <div className="col s12 blue-text lighten-2-text">
                        following
                      </div>
                    </div>
                    <div className="row col s4">
                      <Link
                        to={{
                          pathname: `/followers/${data.currentProfile.user._id}`,
                          state   :  {followed : false , following : data.currentProfile.following}
                        }}
                      >
                        <div className="col s12 blue-text">
                          {data.currentProfile.followers.length}
                        </div>
                      </Link>
                      <div className="col s12 blue-text lighten-2-text">
                        followers
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    {data.currentProfile.following
                      ? data.currentProfile.following
                          .map(item => item.following.posts)
                          .flat(1)
                          .map(post => (
                            <div className="card col s12">
                              <div className="card-content">
                                <InvidualPost
                                  handle={data.currentProfile.handle}
                                  post={post}
                                  id={post.user._id}
                                  name={post.user.name}
                                  fromDashboard={true}
                                />
                              </div>
                            </div>
                          ))
                      : ""}
                  </div>
                </div>
              </div>
              <GithubProfile username={data.currentProfile.githubusername} />
            </div>
          );
        }}
      </Query>
    </div>
  );
}

const mapStateToProps = state => ({
  user: state.auth
});

export default connect(mapStateToProps)(Dashboard);
