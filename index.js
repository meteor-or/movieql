import { createGraphQLServer } from "graphql-yoga";
import { getMovies } from "./db.js";

//schema
const typeDefs = `
type Movie {
  id: Int!
  title: String!
  rating: Float!
  summary: String!
  language: String!
  medium_cover_image: String!
}

type Query {
  movies(limit: Int, rating: Float): [Movie]!
}
`;

//resolver
const resolvers = {
  Query: {
    movies: (_, { rating, limit }) => getMovies(limit, rating),
  },
};

// Provide your schema
const server = createGraphQLServer({
  typeDefs,
  resolvers,
});
// Start the server and explore http://localhost:4000/graphql
server.start(() => console.log("Graphql Server Running"));
