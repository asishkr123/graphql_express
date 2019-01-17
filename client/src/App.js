import React, { Component } from "react";
import ApolloClient from "apollo-boost";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Navbar from "./Components/Layout/Navbar";
import Register from "./Components/auth/Register";
import Login from "./Components/auth/Login";
import { ApolloProvider } from "react-apollo";
import Profile from "./Components/Profile/Profile";
import PrivateRoute from "./Components/common/PrivateRoute";
import { store } from "./store";
import { Provider } from "react-redux";
import { currentUser } from "./actions/userActions";
import jwt_decode from "jwt-decode";
import Dashboard from "./Components/Layout/Dashboard";
import Posts from "./Components/Profile/Posts";
import AllProfiles from "./Components/Profile/Allprofiles";
const client = new ApolloClient({
  uri: "http://localhost:4000",
  request: async operation => {
    const token = await localStorage.getItem("jsonwebToken");
    operation.setContext({
      headers: {
        authorization: token ? token : ""
      }
    });
  }
});

if (localStorage.jsonwebToken) {
  const decoded = jwt_decode(localStorage.jsonwebToken);
  store.dispatch(currentUser(decoded));
}

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <ApolloProvider client={client}>
          <BrowserRouter>
            <>
              <Navbar />
              <Route exact path="/" component={Register} />
              <Route exact path="/login" component={Login} />
              <Switch>
                <PrivateRoute exact path="/profile" component={Profile} />
              </Switch>
              <Switch>
                <PrivateRoute exact path="/dashboard" component={Dashboard} />
              </Switch>
              <Switch>
                <PrivateRoute exact path="/posts" component={Posts} />
              </Switch>
              <Switch>
                <Route exact path="/allProfiles" component={AllProfiles} />
              </Switch>
              <Switch>
                <Route exact path="/profile/:handle" component={Posts} />
              </Switch>
              <Switch>
                <Route exact path="/activity" component={Posts} />
              </Switch>
            </>
          </BrowserRouter>
        </ApolloProvider>
      </Provider>
    );
  }
}

export default App;
