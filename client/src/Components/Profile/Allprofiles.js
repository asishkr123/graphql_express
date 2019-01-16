import React from "react";
import { Query } from "react-apollo";
import { getAllProfiles } from "../../queries/profileQueries";
import Spinner from "../common/Spinner";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import FollowUser from "./FollowUser";

function Allprofiles(props) {
  return (
    <Query
      query={getAllProfiles}
      onCompleted={data => console.log(data.getAllProfiles)}
      onError={error => console.log(error)}
    >
      {({ data, error, loading }) => {
        return loading ? (
          <Spinner />
        ) : (
          <div className="container">
            <h3 className="center-align">Developers Profile</h3>
            <div className="row">
              <div className="card col s12">
                <div className="row">
                  {data.getAllProfiles.map((profile, index) => (
                    <>
                      <div className="col s7" key={index}>
                        <h3>{profile.handle.toUpperCase()}</h3>
                        <p>{profile.status}</p>
                        <Link to={`/profile/${profile.handle}`}>
                          {" "}
                          <button className="btn waves-effect white-text blue waves-light  lighten-2">
                            View Profile
                          </button>
                        </Link>
                        {props.user.isAuthenticated &&
                        props.user.user.id !== profile.user._id ? (
                          <FollowUser
                            id={profile.user._id}
                            followed={
                              profile.followers.length > 0 &&
                              profile.followers.some(
                                user => user.follower._id === props.user.user.id
                              )
                            }
                          />
                        ) : (
                          <></>
                        )}
                      </div>
                      <ul className="collection-with-header col s5">
                        <li className="collection-header">
                          <h4>Skills</h4>
                        </li>
                        {profile.skills.split(",").map((skill, index) => (
                          <li key={index} className="collection-item">
                            <i className="material-icons">done</i>
                            {skill}
                          </li>
                        ))}
                      </ul>
                    </>
                  ))}
                </div>
              </div>
            </div>
          </div>
        );
      }}
    </Query>
  );
}

const mapStateToProps = state => ({
  user: state.user
});

export default connect(mapStateToProps)(Allprofiles);
