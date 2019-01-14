import { Route, Redirect } from "react-router-dom";
import React from "react";
import { connect } from "react-redux";

function PrivateRoute({ component: Component, auth,...rest }) {
  console.log(auth);
  return (
    <Route
      {...rest}
      render={props =>
        auth.isAuthenticated === true ? <Component {...props} /> : <Redirect to="/login" />
      }
    />
  );
}


const mapStateToProps = (state) => {
      return {
         auth : state.user
      }
}


export default connect(mapStateToProps)(PrivateRoute)


