import React from "react";
import { connect } from "react-redux";
import { Query } from "react-apollo";
import { getCurrentProfile } from "../../queries/profileQueries";
import Spinner from "../common/Spinner";
function Dashboard() {
  return (
    <div className="container">
      <Query
        query={getCurrentProfile}
        onCompleted={data => {
          console.log(data.currentProfile);
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
              <div className="card col s12">
                <div className="card-content">
                  <div className="row">
                    <div className=" card lighten-3 blue col s4">
                      <h4 className="white-text center-align lighten-2">
                        {data.currentProfile.handle}
                      </h4>
                      <strong className="black-text align-center lighten-2-text">
                        following
                      </strong>
                      <span className="white-text lighten-2-text">
                        {data.currentProfile.following.length}
                      </span>
                    </div>
                    <div className="card col s8">
                      {data.currentProfile.following
                        .map(item => item.following.posts)
                        .flat(1)
                        .map(post => (
                          <div key={post._id} className="row">
                            <div className="card col s12">
                              <div className="card-content">{post.text}</div>
                            </div>
                          </div>
                        ))}
                    </div>
                  </div>
                </div>
              </div>
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
