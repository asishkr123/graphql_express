import React from "react";
import { Mutation } from "react-apollo";
import {followUser,unFollowUser, getAllProfiles ,getCurrentProfile, getAllFollowers , getAllFollowing} from '../../queries/profileQueries';
export default function FollowUser(props) {
  console.log(props);
  return (
    <Mutation
     mutation = {props.followed ?  unFollowUser : followUser}
     onCompleted = {data => console.log(data)}
     onError      = {error => console.log(error)}
    
    >
      {(FollowOrUnFollowUser, { data, loading, error }) => {
        return (
          <button 
           onClick = {() => {
            FollowOrUnFollowUser({
                   variables : {
                       id : props.id,
                   },
                   refetchQueries : [{query : getAllProfiles} , {query : getCurrentProfile} , {query : getAllFollowers , variables : {id : props.userId}} ,  {query : getAllFollowing , variables : {id : props.userId}}]
               })
           }}
          
          
          style = {{marginLeft : "25px"}} className="btn waves-effect waves-light white lighten-2-text blue-text">{props.followed ? "unfollow" : "follow"} here</button>
        );
      }}
    </Mutation>
  );
}
