import React, { Component } from "react";
import { Mutation } from "react-apollo";
import { likePosts, getProfileByHandle, getCurrentProfile} from "../../queries/profileQueries";
import UnLikePost from "./unlikePost";

export default class LikePosts extends Component {
  state = {
    likePost: true,
    error: {}
  };

  setError = (error) => {
     this.setState({
       error : {...error}
     })
  }

  render() {
    const { likes } = this.props;
    return (
      <Mutation
       onError = {error => {
        const Errors = error.graphQLErrors[0].message;
        console.log(Errors);
        const parsedErrors = JSON.parse(Errors);
        console.log(parsedErrors);
        this.setState({
          error: { ...parsedErrors }
        });
      }}
      mutation={likePosts}>
        {(likePost, { data, loading, error }) => {
          return (
            <>
              <div className="col s2">
                <button
                  onClick={() => {
                    likePost({
                      variables: {
                        id: this.props.id
                      },
                      refetchQueries : [
                        !this.props.fromDashboard ?
                        {
                          query : getProfileByHandle , variables : {handle : this.props.handle},
                          
                      } :

                      {
                        query  : getCurrentProfile
                      }
                      ]
                    });
                    
                  }}
                  className="btn waves-effect waves-light white black-text"
                >
                  <i className="material-icons">thumb_up</i>  
                  <span style={{ marginLeft: "5px", color: "black" }}>
                  {likes.length}
                </span>
                </button>
                
              </div>
              <UnLikePost fromDashboard = {this.props.fromDashboard} setError = {this.setError} id = {this.props.id} handle = {this.props.handle}/>
              {/* <div className="col s1">
                <button className="btn waves-effect waves-light white black-text">
                  <i className="material-icons">thumb_down</i> 
                </button>
              </div> */}
              {this.state.error.error ? <span style = {{fontSize : '15px'}} className = " col s4 red-text">{this.state.error.error}</span> : <></>}
            </>
          );
        }}
      </Mutation>
    );
  }
}
