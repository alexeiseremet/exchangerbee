module.exports = `
  type Institution {
    id: ID!
    slug: String
    name: String
    country: ID
    logo: String
    website: String
  }
  
  type Query {
    institution(slug: String!): Institution!
    allInstitution: [Institution!]!
  }
  
  type Mutation {
    createInstitution(institution: InstitutionInput!): Institution!
    updateInstitution(id: ID!, institution: InstitutionInput!): Institution!
    deleteInstitution(slug: String!): Institution!
  }
    
  input InstitutionInput {
    slug: String
    name: String
    country: ID
  }
`
