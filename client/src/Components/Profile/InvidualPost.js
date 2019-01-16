import React, { Component } from 'react'
import {profilePosts} from '../../queries/profileQueries';
import Comments from './Comments';
import LikePosts from './LikePosts';
export default class InvidualPost extends Component {
  state = {
      showComments : false
  }
  render() {
    const {post,user,deletePost} = this.props; 
    const {showComments} = this.state
    return (
        <div key={post._id} className="row">
        <div className="card col s12">
          <div className="row">
            <div className="card-content col s12">{post.text}</div>
            <div className="col s4 blue-text s2">{user}</div>
            <button
              onClick={() => {deletePost({
                variables: {
                  id: post._id
                },
                refetchQueries: [{ query: profilePosts }]
              })}}
              className="btn white col s1 black-text"
              style = {{marginRight : '2px'}}
            >
              <i className="material-icons">delete_outline</i>
            </button>
             <LikePosts likes = {post.likes}  id  = {post._id}/>
            <button
              className="col btn waves-effect waves-light blue-lighten-2 white-text s2"
              style = {{marginLeft : '5px'}}
              onClick={() => {
                this.setState(prevState => {
                  this.setState({
                    showComments: !prevState.showComments,
                  });
                });
              }}
            >
              {!showComments ? "View" : "Hide"} Comments
            </button>
          </div>
        </div>

        {showComments ? (
          <Comments id={post._id} comments={post.comment} />
        ) : (
          <></>
        )}
      </div>
)
  }
}
