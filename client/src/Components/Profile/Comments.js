import React from "react";
import { connect } from "react-redux";
import { Mutation } from "react-apollo";
import { createComment } from "../../queries/Comments";
import { profilePosts ,  getCurrentProfile} from "../../queries/profileQueries";
class Comments extends React.Component {
  state = {
    text: ""
  };
  render() {
    return (
      <Mutation
        mutation={createComment}
        onCompleted={data => console.log(data)}
        onError={error => console.log(error)}
      >
        {(createComment, { data, loading, error }) => {
          return (
            <>
              <div className="row">
                {this.props.isAuthenticated ? (
                  <form
                    onSubmit={e => {
                      e.preventDefault();
                      createComment({
                        variables: {
                          text: this.state.text,
                          id: this.props.id
                        },
                        refetchQueries: [!this.props.fromDashboard ? { query: profilePosts } : {query : getCurrentProfile}]
                      });
                      this.setState({
                        text: ""
                      });
                    }}
                  >
                    <div className="col s12">
                      <div className="input-field col s12">
                        <textarea
                          onChange={e =>
                            this.setState({ text: e.target.value })
                          }
                          value={this.state.text}
                          id="textarea1"
                          className="materialize-textarea"
                        />
                        <label htmlFor="textarea1">Reply Here</label>
                      </div>
                      <button className="btn waves-effect waves-light col s12">
                        Submit
                      </button>
                    </div>
                  </form>
                ) : (
                  <></>
                )}

                <div className="col s12">
                  {this.props.comments.map((comment, index) => {
                    return (
                      <div key={index} className="col s12 card">
                        <div className="card-content">
                          <h5>{comment.text}</h5>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </>
          );
        }}
      </Mutation>
    );
  }
}

const mapStateToProps = state => ({
  isAuthenticated: state.user.isAuthenticated
});

export default connect(mapStateToProps)(Comments);
