import React from "react";
import { Mutation } from "react-apollo";
import { deletePost} from "../../queries/profileQueries";
import InvidualPost from "./InvidualPost";

class Post extends React.Component {
  state = {
    showComments: false,
    postid   : ""
  };
  render() {
    const { posts, user } = this.props;
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
                  <InvidualPost key={post._id}  post = {post} user = {user} deletePost = {deletePost}/>
              //   <div key={post._id} className="row">
              //     <div className="card col s12">
              //       <div className="row">
              //         <div className="card-content col s12">{post.text}</div>
              //         <div className="col s4 blue-text s2">{user}</div>
              //         <button
              //           onClick={() => {deletePost({
              //             variables: {
              //               id: post._id
              //             },
              //             refetchQueries: [{ query: profilePosts }]
              //           })}}
              //           className="btn white col s1 black-text"
              //         >
              //           <i className="material-icons">delete_outline</i>
              //         </button>
              //         <button
              //           className="col btn waves-effect waves-light blue-lighten-2 white-text s4"
              //           onClick={() => {
              //             this.setState(prevState => {
              //               this.setState({
              //                 showComments: !prevState.showComments,
              //                 postid  :  post._id,
              //               });
              //             });
              //           }}
              //         >
              //           {!showComments  && postid !== post._id? "View" : "Hide"} Comments
              //         </button>
              //       </div>
              //     </div>

              //     {showComments && postid === post._id ? (
              //       <Comments id={post._id} comments={post.comment} />
              //     ) : (
              //       <></>
              //     )}
              //   </div>
              );
            }}
          </Mutation>
        ))}
      </div>
    );
  }
}

export default Post;
