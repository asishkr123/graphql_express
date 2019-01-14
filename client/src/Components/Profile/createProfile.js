import React, { Component } from "react";
import { Mutation } from "react-apollo";
import {createProfile}   from '../../queries/profileQueries';
import  {withRouter} from 'react-router-dom';
 class CreateProfile extends Component {
  state = {
    handle: "",
    bio: "",
    company: "",
    status: "",
    skills: "",
    githubusername: "",
    errors: {}
  };
  render() {
    const { handle, skills, status } = this.state.errors;
    return (
      <Mutation
        onCompleted={data => {
          this.props.history.push("/posts");
        }}
        onError={error => {
          const Errors = error.graphQLErrors[0].message;
          const parsedErrors = JSON.parse(Errors);
          this.setState({
            errors: { ...parsedErrors }
          });
        }}
        mutation  = {createProfile}
      >
        {(addProfile, { data, error, loading }) => {
          return (
            <div className="row">
              <div className="card col s12">
                <div className="card-content">
                  <div className="card-title">
                    <h3 className="blue-text center-align lighten-2-text">
                      Create Profile Here!!!
                    </h3>
                  </div>
                  <div className="row">
                    <form
                      onSubmit={e => {
                        e.preventDefault();
                        addProfile({
                          variables: {
                            handle: this.state.handle,
                            bio: this.state.bio,
                            company: this.state.company,
                            skills: this.state.skills,
                            githubusername: this.state.githubusername,
                            status: this.state.status
                          }
                        });
                      }}
                      className="col s12"
                    >
                      <span
                        className="red-text"
                        style={{ display: "block", margin: "auto" }}
                      >
                        *-required fields
                      </span>
                      <div className="row">
                        <div type="text" className="input-field col s12">
                          <input
                            type="text"
                            id="handle"
                            placeholder=" * Enter your handle here"
                            value={this.state.handle}
                            onChange={e =>
                              this.setState({ handle: e.target.value })
                            }
                          />
                          {handle ? (
                            <span data-error="wrong" className="red-text">
                              {handle}
                            </span>
                          ) : (
                            ""
                          )}
                        </div>
                        <div type="text" className="input-field col s12">
                          <input
                            type="text"
                            id="status"
                            placeholder="* Enter your handle here , i.e. student , professional etc..."
                            value={this.state.status}
                            onChange={e =>
                              this.setState({ status: e.target.value })
                            }
                          />
                          {status ? (
                            <span data-error="wrong" className="red-text">
                              {status}
                            </span>
                          ) : (
                            ""
                          )}
                        </div>
                        <div type="text" className="input-field col s12">
                          <input
                            type="text"
                            id="skills"
                            placeholder="* programming languages you know, enter comma seperated values"
                            value={this.state.skills}
                            onChange={e =>
                              this.setState({ skills: e.target.value })
                            }
                          />
                          {skills ? (
                            <span data-error="wrong" className="red-text">
                              {skills}
                            </span>
                          ) : (
                            ""
                          )}
                        </div>
                        <div type="text" className="input-field col s12">
                          <input
                            type="text"
                            id="githubusername"
                            placeholder=" your github username"
                            value={this.state.githubusername}
                            onChange={e =>
                              this.setState({ githubusername: e.target.value })
                            }
                          />
                        </div>
                        <div type="text" className="input-field col s12">
                          <input
                            type="text"
                            id="bio"
                            placeholder="* write something about yourself"
                            value={this.state.bio}
                            onChange={e =>
                              this.setState({ bio: e.target.value })
                            }
                          />
                        </div>
                        <div type="text" className="input-field col s12">
                          <input
                            type="text"
                            id="status"
                            placeholder="the organisation you work for"
                            value={this.state.company}
                            onChange={e =>
                              this.setState({ company: e.target.value })
                            }
                          />
                        </div>
                      </div>
                      <button className="btn waves-effect waves-light" style = {{marginLeft : "500px" }}>Submit your Profile</button>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          );
        }}
      </Mutation>
    );
  }
}



export default withRouter(CreateProfile)