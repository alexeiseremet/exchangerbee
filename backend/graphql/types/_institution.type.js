module.exports = `
  type Institution {
    id: ID!
    slug: String!
    name: String!
    country: ID!
    logo: String
    website: String
  }
  
  type Query {
    institution(slug: String!): Institution!
    allInstitution: [Institution!]!
  }
  
  type Mutation {
    createInstitution(institution: CreateInstitutionInput!): Institution!
    deleteInstitution(slug: String!): Institution!
  }
    
  input CreateInstitutionInput {
    slug: String!
    name: String!
    country: ID!
  }
`
