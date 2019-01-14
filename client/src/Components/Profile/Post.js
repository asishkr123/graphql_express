import React from "react";

export default function Post({ posts, user }) {
  return (
    posts.length === 0 ?  <h4 className = "blue-text lighten-2-text">You haven't created a post yet.... create a post and have fun</h4> : 
    <div className="col s12">
      {posts.map(post => (
        <div key = {post._id} className = "row">  
        <div className="card col s12">
          <div className="card-content">{post.text}</div>
          <div className="col s7 blue-text">{user}</div>
        </div>
        </div>
      ))}
    </div>
  );
}
