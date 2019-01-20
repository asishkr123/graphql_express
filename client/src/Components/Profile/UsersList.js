import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Mutation } from "react-apollo";
import FollowUser from "./FollowUser";
import { getCurrentProfile, unFollowUser } from "../../queries/profileQueries";
export default class UsersList extends Component {
  componentDidMount() {
    console.log(this.props);
  }
  render() {
    const { followers, following } = this.props.location.state;
    return (
      <div className="row">
        <h5
          style={{ fontStyle: "bold" }}
          className="col s12 blue-text lighten-2-text center-align"
        >
          {this.props.location.state.followers ? "Followers" : "Following"}
        </h5>
        {this.props.location.pathname === "/following"
          ? following.map(following => {
              return (
                <Mutation
                  mutation={unFollowUser}
                  onCompleted={data => console.log(data)}
                >
                  {(unFollowUser, { dara, loading, user }) => {
                    return (
                      <div className="col s12 m6 card">
                        <div className="row card-content">
                          <div className="center-align">
                            <h5 className="blue-text s12">
                              {following.following.name}
                            </h5>

                            <Link
                              to={`/profile/${
                                following.following.profile.handle
                              }`}
                            >
                              <button className="col offset-s3 s6 btn waves-effect waves-light white blue-text lighten-2-text">
                                View Profile
                              </button>
                            </Link>
                            <button
                              onClick={e => {
                                unFollowUser({
                                  variables: { id: following.following._id },
                                  refetchQueries: [{ query: getCurrentProfile }]
                                });
                              }}
                              className="col offset-s3 s6 btn waves-effect waves-light white blue-text lighten-2-text"
                            >
                              UnFollow
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  }}
                </Mutation>
              );
            })
          : followers.map(follower => {
              return (
                <div className="col s12 m6 card">
                  <div className="row card-content">
                    <div className="center-align">
                      <h5 className="blue-text s12">
                        {follower.follower.name}
                      </h5>
                      <Link to={`/profile/${follower.follower.profile.handle}`}>
                        <button className="col offset-s3 s6 btn waves-effect waves-light white blue-text lighten-2-text">
                          View Profile
                        </button>
                      </Link>
                      <FollowUser
                      fromDashboard = {true}
                        followed={
                          following.filter(
                            following => following.following._id === follower.follower._id
                          ).length > 0
                        }
                        id={follower.follower._id}
                      />
                    </div>
                  </div>
                </div>
              );
            })}
      </div>
    );
  }
}
