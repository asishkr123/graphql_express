import React from "react";
import { Mutation } from "react-apollo";
import { deletePost } from "../../queries/profileQueries";
import Comments from "./Comments";
class Post extends React.Component {
  state = {
    showComments: false,
    
  };
  render() {
    const { posts, user } = this.props;
    const { showComments } = this.state;
    return posts.length === 0 ? (
      <h4 className="blue-text lighten-2-text">
        You haven't created a post yet.... create a post and have fun
      </h4>
    ) : (
      <div className="col s12">
        {posts.map(post => (
          <Mutation
            mutation={deletePost}
            onCompleted={data => console.log(data)}
          >
            {(deletePost, { data, loading, error }) => {
              return (
                <div key={post._id} className="row">
                  <div className="card col s12">
                    <div className="card-content">{post.text}</div>
                  </div>
                  <div className="col s4 blue-text">{user}</div>
                  <button
                    className="col btn waves-effect waves-light blue-lighten-2 white-text s6"
                    onClick={() => {
                      this.setState(prevState => {
                        this.setState({
                          showComments: !prevState.showComments
                        });
                      });
                    }}
                  >
                    {!showComments ? "View" : "Hide" } Comments
                  </button>

                  {showComments ? <Comments id = {post._id} comments = {post.comment}/> : <></>}
                </div>
              );
            }}
          </Mutation>
        ))}
      </div>
    );
  }
}

export default Post;
