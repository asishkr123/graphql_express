import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Query } from "react-apollo";
import FollowUser from "./FollowUser";
import { getAllFollowers, getAllFollowing } from "../../queries/profileQueries";
import Spinner from "../common/Spinner";
export default class UsersList extends Component {
  render() {
    return (
      <Query
        query={
          this.props.location.state.followed ? getAllFollowing : getAllFollowers
        }
        variables={{ id: this.props.match.params.id }}
        onCompleted={data => console.log(data)}
        onError={error => console.log(error)}
      >
        {({ data, loading, error }) => {
          const { followed } = this.props.location.state;
          const dataValue = data
            ? data.getAllFollowers
              ? data.getAllFollowers
              : data.getAllFollowing
            : null;
          console.log(dataValue);
          return loading ? (
            <Spinner />
          ) : (
            <div className="container">
              <h5 className="blue-text lighten-2-text center-align">
                {followed ? "Following" : "Followers"}
              </h5>
              <div className="row">
                {dataValue.map(item => {
                  const { follower, following } = item;
                  return (
                    <div
                      style={{ margin: "20px" }}
                      className="col white card s12 m6"
                    >
                      <div className="card-content">
                        <div className="row">
                          <h5 className="blue-text col s12 center-align lighten-2-text">
                            {follower ? follower.name : following.name}
                          </h5>
                          <Link
                            to={
                              follower
                                ? `/profile/${follower.profile.handle}`
                                : `/profile/${following.profile.handle}`
                            }
                          >
                            <button className="btn white blue-text lighten-2-text">
                              View Profile
                            </button>
                          </Link>
                          {following ? (
                            <FollowUser
                              id={following._id}
                              fromDashboard={true}
                              followed={true}
                              userId={this.props.match.params.id}
                            />
                          ) : (
                            <></>
                          )}
                          {// follower  ? followingUsers.map((followingUser) => {return (
                          //   <FollowUser followed = {followingUser._id === follower._id} id = {follower._id}  userId = { this.props.match.params.id} />
                          // )}): ""
                          follower ? (
                            <FollowUser
                              followed={follower.profile.followers.some(
                                profileFollower =>
                                  profileFollower.follower._id === this.props.match.params.id
                              )}
                              id={follower._id}
                              userId={this.props.match.params.id}
                            />
                          ) : (
                            ""
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        }}
      </Query>
    );
  }
}
