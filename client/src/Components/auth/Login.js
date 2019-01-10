import React, { Component } from "react";
import { Mutation } from "react-apollo";
import { loginUser } from "../../queries/UserQueries";

export default class Login extends Component {
  state = {
    password: "",
    email: "",
    error: {}
  };
  render() {
    const { password, email } = this.state.error;
    return (
      <Mutation
        mutation={loginUser}
        onError={error => {
          
          const errors = error.graphQLErrors[0].message;
          const parsedErrors = JSON.parse(errors);
          console.log(parsedErrors);
          this.setState({
            
            error: { ...parsedErrors }
          });
        }}
        onCompleted={data => {
          console.log(data);
          console.log(data.loginUser.token);
          const token = data.loginUser.token;
          localStorage.setItem('jsonwebToken',token);
        }}
      >
        {(loginUser, { data, loading, error }) => (
          <>
            <div className="container">
              <div className="card">
                <div className="card-content">
                  <div className="card-title">
                    <h3 className="center-align blue-text lighten-2-text">
                      Login
                    </h3>
                    <div className="row">
                      <form
                        onSubmit={e => {
                          e.preventDefault();
                          loginUser({
                            variables: {
                              name: this.state.name,
                              email: this.state.email,
                              password: this.state.password,
                              password2: this.state.password2
                            }
                          });
                        }}
                        className="col s12"
                      >
                        <div className="row">
                          <div className="input-field col s12" type="text">
                            <input
                              type="text"
                              id="email"
                              placeholder="email"
                              value={this.state.email}
                              onChange={e =>
                                this.setState({ email: e.target.value })
                              }
                            />
                            {email ? (
                              <span data-error="wrong" className="red-text">
                                {email}
                              </span>
                            ) : (
                              ""
                            )}
                          </div>
                          <div className="input-field col s12" type="text">
                            <input
                              type="text"
                              id="password"
                              placeholder="password"
                              value={this.state.password}
                              onChange={e =>
                                this.setState({ password: e.target.value })
                              }
                            />
                            {password ? (
                              <span data-error="wrong" className="red-text">
                                {password}
                              </span>
                            ) : (
                              ""
                            )}
                          </div>
                        </div>
                        <button className="btn waves-effect waves-light blue white-text">Login</button>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </Mutation>
    );
  }
}
