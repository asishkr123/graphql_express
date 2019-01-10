import React, { Component } from "react";
import { createUser } from "../../queries/UserQueries";
import { Mutation } from "react-apollo";

class Register extends Component {
  state = {
    name: "",
    email: "",
    password: "",
    password2: "",
    error: {}
  };
  render() {
    const { name, email, password, password2 } = this.state.error;
    return (
      <Mutation
        mutation={createUser}
        onCompleted={data => {
          console.log(data);
          this.props.history.push("/login");
        }}
        onError={error => {
          console.log(error.graphQLErrors[0].message);
          const Errors = error.graphQLErrors[0].message;
          const parsedErrors = JSON.parse(Errors);
          console.log(parsedErrors);
          this.setState({
            error: { ...parsedErrors }
          });
        }}
        errorPolicy="all"
      >
        {(addUser, { data, loading, error }) => (
          <div className="container">
            <div className="card">
              <div className="card-content">
                <div className="card-title">
                  <h3 className="blue-text center-align lighten-2-text">Sign Up!!!</h3>
                </div>
                <div className="row">
                  <form
                    onSubmit={e => {
                      e.preventDefault();
                      addUser({
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
                      <div type="text" className="input-field col s12">
                        <input
                          type="text"
                          id="name"
                          placeholder="Name"
                          value={this.state.name}
                          onChange={e =>
                            this.setState({ name: e.target.value })
                          }
                        />
                        {name ? (
                          <span data-error="wrong" className="red-text">
                            {name}
                          </span>
                        ) : (
                          ""
                        )}
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
                          <span
                            data-error="wrong"
                            className=" helper-text red-text"
                          >
                            {email}
                          </span>
                        ) : (
                          ""
                        )}

                        <input
                          type="text"
                          id="password"
                          placeholder=" enter your password here"
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
                        <input
                          type="text"
                          id="password2"
                          placeholder="confirm your pasword here"
                          value={this.state.password2}
                          onChange={e =>
                            this.setState({ password2: e.target.value })
                          }
                        />
                        {password2 ? (
                          <span data-error="wrong" className="red-text">
                            {password2}
                          </span>
                        ) : (
                          ""
                        )}
                      </div>
                    </div>
                    <button className="btn waves-effect waves-light blue lighten-2">
                      Submit
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        )}
      </Mutation>
    );
  }
}

export default Register;
