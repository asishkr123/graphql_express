import React from 'react'
import { Query } from 'react-apollo';
import  {profilePosts, getProfileByHandle}   from '../../queries/profileQueries'
import Spinner from '../common/Spinner';
import {connect} from 'react-redux';
import Post  from './Post';
 function Posts(props) {
  console.log(props) 
  return (
    <Query
     query = {props.match.params.handle ? getProfileByHandle : profilePosts}
     variables = { props.match.params.handle ? { handle : props.match.params.handle } : {}}
     onError = {error => console.log(error)}
     onCompleted = {data => console.log(data)}
    
    >{({data,loading,error}) => {

        return (
          loading ?  <Spinner/> :
          <div className = "row">
           <div className="card col s12">
            <div className="card-content">
              <h3 className = "blue-text lighten-2-text">{ props.match.params.handle ? data.getProfileByHandle.handle :   data.currentProfile.handle}</h3>
              {/* {
                  props.user.user === data.currentProfile.user.name ?  <button className = "waves-effect btn waves-light blue lighten-2">Follow</button> : ""
              } */}
              <Post posts = {props.match.params.handle ? data.getProfileByHandle.user.posts : data.currentProfile.user.posts} user = {props.match.params.handle ? data.getProfileByHandle.user.name : data.currentProfile.user.name}/>
            </div>
          </div> 
          </div>
        )


    }}</Query>
  )
}


const mapStateToProps = (state) => ({
    user :  state.user

})

export default connect(mapStateToProps)(Posts)
