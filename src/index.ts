import { createServer } from "http";
import express from "express";
import { ApolloServer, gql } from "apollo-server-express";
const { prisma } = require('./prisma/client');
// 1
// create an async function to start the server.
const startServer = async () => {


    // 2
    // Create an instance of express then create the httpServer
    const app = express()
    const httpServer = createServer(app)

    // 3
    // typedefs will define your API's schema
    const typeDefs = gql`
    type Query {
      hello: String
      user(id: ID!): User!
    }

    type User {
        id: ID!
        email: String!
        actualName: String!
        username: String!
        profilePicture: String!
        about: String!
        stories: [Story]
        comments: [Comment]
        likes: [Like]
    }

    type Story {
        id: ID!
        storyBody: String!
        title: String!
    },

    type Comment {
        id: ID!
        commentBody: String!
    }

    type Like {
        id: ID!
    }

    type StoryPhoto {
        id: ID!
    }

    type Topic {
        id: ID!
        topicName: String!
    }
  `;

    // 4
    // Reslovers are responsible for handling the logic of responses for each type def
    const resolvers = {
        Query: {
            hello: () => 'Hello world!',
            userProfile: () => {
                return prisma.user.findMany
            }
        },

    };
    // 5
    // initialization of apollo-server
    const apolloServer = new ApolloServer({
        typeDefs,
        resolvers,
    })

    // 6
    await apolloServer.start()

    // 7
    // Apply apollo server instance as a middleware to express. which enables
    // the graphql server, graphql is served at a single endpoint unlike rest apis
    apolloServer.applyMiddleware({
        app,
        path: '/api'
    })

    // 8
    // just telling where the server to listen.
    httpServer.listen({ port: process.env.PORT || 4000 }, () =>
        console.log(`Server listening on localhost:4000${apolloServer.graphqlPath}`)
    )
}

startServer()
