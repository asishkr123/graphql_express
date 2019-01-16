import React from "react";
import { Mutation } from "react-apollo";
import {followUser,unFollowUser, getAllProfiles} from '../../queries/profileQueries';
export default function FollowUser(props) {
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
                   refetchQueries : [{query : getAllProfiles}]
               })
           }}
          
          
          style = {{marginLeft : "25px"}} className="btn waves-effect waves-light blue lighten-2 white-text">{props.followed ? "unfollow" : "follow"} here</button>
        );
      }}
    </Mutation>
  );
}
