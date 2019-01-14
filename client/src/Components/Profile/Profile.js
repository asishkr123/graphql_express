import React from "react";
import { Query } from "react-apollo";
import { getCurrentProfile } from "../../queries/profileQueries";
import Spinner from "../common/Spinner";
import Dashboard from "../Layout/Dashboard";
import CreateProfile from "./createProfile";

export default function Profile() {
  return (
    <Query query={getCurrentProfile}>{({ data, loading, error }) => {
         return (
           loading ?  <Spinner/> :  data.currentProfile ?  (<Dashboard/>)  :  (<CreateProfile/>)
         )




    }}</Query>
  );
}
