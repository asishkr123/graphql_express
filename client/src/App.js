import React, { Component } from "react";
import ApolloClient from "apollo-boost";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import "./App.css";
import Navbar from "./Components/Layout/Navbar";
import Register from "./Components/auth/Register";
import Login from "./Components/auth/Login";
import { ApolloProvider } from "react-apollo";
import cache from "apollo-cache-inmemory";

const client = new ApolloClient({
  uri: "http://localhost:4000",
  cache,
  request: async operation => {
    const token = await localStorage.getItem("jsonwebtoken");
    operation.setContext({
      headers: {
        authorization: token ?  token : ""
      }
    });
  },
  initializers: () => {},
  clientState: {}
});

class App extends Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <BrowserRouter>
          <>
            <Navbar />
            <Switch>
              <Route exact path="/" component={Register} />
              <Route exact path="/login" component={Login} />
            </Switch>
          </>
        </BrowserRouter>
      </ApolloProvider>
    );
  }
}

export default App;
