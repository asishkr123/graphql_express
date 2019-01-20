import React, { Component } from "react";
import { connect } from "react-redux";
import { Mutation } from "react-apollo";
import { profileVisited } from "../../queries/profileQueries";

class CallMutation extends Component {
  componentDidMount() {
    if (this.props.isAuthenticated) {
      console.log(this.props)
      this.props.profileVisited({
        variables: {
          id: this.props.id
        }
      });
    }
  }
  render() {
    return <>{this.props.children}</>;
  }
}

class ProfileVisited extends Component {
  render() {
    return (
      <Mutation
        mutation={profileVisited}
        onCompleted={data => console.log(data)}
        onError={error => console.log(error)}
      >
        {(profileVisited, { data, loading, error }) => {
          return (
            <CallMutation id={this.props.id} profileVisited={profileVisited} isAuthenticated = {this.props.user.isAuthenticated}>
              <></>
            </CallMutation>
          );
        }}
      </Mutation>
    );
  }
}

const mapStateToProps = state => ({
  user: state.user
});

export default connect(mapStateToProps)(ProfileVisited);
