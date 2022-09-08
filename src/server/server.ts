import * as express from "express";
import apiRouter from "./routes";

import { graphqlHTTP } from "express-graphql";
import { buildSchema } from "graphql";

const app = express();

const users = [
  {
    id: 1,
    name: "Tom",
    age: 12,
  },
  {
    id: 2,
    name: "Bob",
    age: 13,
  },
  {
    id: 3,
    name: "Dick",
    age: 14,
  },
];

const createUser = (input) => {
  const id = new Date();

  return {
    id,
    ...input,
  };
};

// Construct a schema, using GraphQL schema language
const schema = buildSchema(`
  type User {
    id: ID
    name: String 
    age: Int
    posts:[Post]
  }

  type Post {
    id: ID
    title: String
    content: String
  }

  input UserInput{
    id: ID
    name: String!
    age: Int!
    posts:[PostInput]
  }

  input PostInput {
    id: ID
    title: String!
    content: String!
  }


  type Query{
    getAllUsers: [User]
    getUser(id: ID): User 
  }

  type Mutation {
    createUser(input: UserInput): User
  }


`);

// The root provides a resolver function for each API endpoint
const rootValue = {
  getAllUsers: () => {
    return users;
  },

  getUser: ({ id }: any) => {
    return users.find(({ uId }: any) => uId == id);
  },

  createUser: ({ input }: any) => {
    const user = createUser(input);
    users.push(user);
    return user;
  },
};

app.use(express.static("public"));
app.use(apiRouter);

app.use(
  "/graphql",
  graphqlHTTP({
    schema,
    rootValue,
    graphiql: true,
  })
);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server listening on port: ${port}`));
