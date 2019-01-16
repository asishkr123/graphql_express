import React, { Component } from "react";
import { Mutation } from "react-apollo";
import { profilePosts, createPost } from "../../queries/profileQueries";

export default class CreatePost extends Component {
  state = {
    text: ""
  };
  render() {
    return (
      <Mutation
        mutation={createPost}
        onCompleted={data => console.log(data)}
        onError={error => console.log(error)}
      >
        {(submitPost, { data, loading, error }) => {
          return (
            <div className="row">
              <form
                onSubmit={e => {
                  e.preventDefault();
                  submitPost({
                    variables: { text: this.state.text },
                    refetchQueries: [{ query: profilePosts }]
                  });
                  this.setState({
                    text: ""
                  });
                }}
                className="col s12"
              >
                <div className="row">
                  <div className="input-field col s12">
                    <textarea
                      onChange={e => this.setState({ text: e.target.value })}
                      value={this.state.text}
                      id="textarea1"
                      className="materialize-textarea"
                    />
                    <label htmlFor="textarea1">Create your Post Here</label>
                  </div>
                  <button className="btn waves-effect waves-light blue white-text lighten-2">
                    create here
                  </button>
                </div>
              </form>
            </div>
          );
        }}
      </Mutation>
    );
  }
}
