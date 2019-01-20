import React from "react";
import { Mutation } from "react-apollo";
import { deletePost } from "../../queries/profileQueries";
import InvidualPost from "./InvidualPost";
import { connect } from "react-redux";

class Post extends React.Component {
  state = {
    showComments: false,
    postid: ""
  };
  render() {
    const { posts, user } = this.props;
    return posts.length === 0 ? (
      this.props.isAuthenticated && this.props.id === this.props.user.id ? (
        <h4 className="blue-text lighten-2-text">
          You haven't created a post yet.... create a post and have fun
        </h4>
      ) : (
        <h4 className="blue-text lighten-2-text">
          This User hasn't created a post yet..
        </h4>
      )
    ) : (
      <div className="col s12">
        {posts.map(post => (
          <Mutation
           key={post._id}
            mutation={deletePost}
            onCompleted={data => console.log(data)}
          >
            {(deletePost, { data, loading, error }) => {
              return (
                <InvidualPost
                  handle = {this.props.handle}
                  post={post}
                  user={user}
                  id  = {this.props.id}
                  deletePost={deletePost}
                />
              );
            }}
          </Mutation>
        ))}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  isAuthenticated: state.user.isAuthenticated,
  user   :         state.user.user
});

export default connect(mapStateToProps)(Post);
