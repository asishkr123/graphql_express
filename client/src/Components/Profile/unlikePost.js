import React, { Component } from 'react'
import {Mutation} from 'react-apollo'
import {unlikePost , getProfileByHandle, getCurrentProfile} from '../../queries/profileQueries'
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
                <div className="col offset-s1 s2">
                <button 
                onClick={() => {
                    unLikePost({
                      variables: {
                        id: this.props.id
                      },
                      refetchQueries : [
                        !this.props.fromDashboard ? 
                        {query : getProfileByHandle , variables : {handle : this.props.handle}}
                        : {query : getCurrentProfile}
                      
                      ]
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
