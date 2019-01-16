import React, { Component } from 'react'
import {Mutation} from 'react-apollo'
import {unlikePost , profilePosts} from '../../queries/profileQueries'
export default class UnLikePost extends Component {
  render() {
    return (
      <Mutation 
      mutation = {unlikePost}
      onError = {error => {
        const Errors = error.graphQLErrors[0].message;
        console.log(Errors);
        const parsedErrors = JSON.parse(Errors);
        console.log(parsedErrors);
        this.props.setError(parsedErrors)
      }}
      >
       {
         (unLikePost,{data,loading,error}) => {
              return (
                <div className="col s1">
                <button 
                onClick={() => {
                    unLikePost({
                      variables: {
                        id: this.props.id
                      },
                      refetchQueries : [{query : profilePosts}]
                    });
                    
                  }}
                
                className="btn waves-effect waves-light white black-text">
                  <i className="material-icons">thumb_down</i> 
                </button>
              </div> 
              )
         }
       }
      
      </Mutation>
    )
  }
}
