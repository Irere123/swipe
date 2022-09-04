const typeDefs = `
  scalar Date

  type User {
    id: ID!
    username: String!
    avatarUrl: String!
    schoolName: String!
    bio: String!
    location: String! 
    gender: String!
    birthday: Date!
    createdAt: Date!
  }

  type Query {
    hello: String
  }

  type CreateUserResponse {
    accessToken: String!
    refreshToken: String!
  }
  
  type Mutation {
    createTestUser(username: String!): CreateUserResponse!
  }
`;
export default typeDefs;
