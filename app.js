import { json } from "body-parser";
import express from 'express';
import mongoose from "mongoose";
import { mongoURI as db } from "./config/keys";
import { GraphQLServer } from "graphql-yoga";
import { resolvers } from "./Resolvers";
const app = express();
app.use(json());

mongoose.connect(
  db,
  { useNewUrlParser: true }
);
mongoose.connection.once("open", () => {
  console.log("mongodb connected");
});

// Passport Config

const server = new GraphQLServer({
  typeDefs: "./schema.graphql",
  resolvers,
  middlewares : [],
  context: ({request}) =>{
     return {
       request
     }
  }
});

server.start(() => {
  console.log("server is starting");
});
