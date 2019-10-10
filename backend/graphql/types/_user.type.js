module.exports = `
  directive @auth(requires: Role = GUEST) on FIELD_DEFINITION
  
  type User {
    token: String!
  }
  
  type Mutation {
    login(password: String!): User!
  }
  
  enum Role {
    ADMIN
    GUEST
  }
`;
