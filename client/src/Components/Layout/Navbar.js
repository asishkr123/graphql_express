import React from "react";
import {Link} from 'react-router-dom';
import  {connect} from 'react-redux';
import   {currentUser}   from '../../actions/userActions';
import   {withRouter}  from 'react-router-dom';

const logoutUser = ({currentUser,history}) => {
    console.log(currentUser)
     console.log(history);
     localStorage.removeItem('jsonwebToken');
     currentUser({});
     history.push('/login');
} 

 
 
 function Navbar(props) {
  return (
    <nav>
      <div className="nav-wrapper blue lighten-2">
        <h4 className="brand-logo ehite-text">Navbar</h4>
        <ul id="nav-mobile" className="right hide-on-med-and-down">
            {
              props.user.isAuthenticated ? (
               <> 
              <li><Link to="/posts">Posts</Link></li>
              <li><Link to = "/dashboard">Dashboard</Link></li>
              <li onClick = {() => {logoutUser(props)}}><a href = "">Logout</a></li></> ) : (<>
                <li><Link to="/register">register</Link></li>
                <li><Link to="/login">Login</Link></li>
                <li><Link to = "/allProfiles">allProfiles</Link></li>
              </>) 
            }
        </ul>
      </div>
    </nav>
  );
}

const mapStateToProps = (state) => ({
      user : state.user
})

export default connect(mapStateToProps , {currentUser})(withRouter(Navbar))