module.exports = `
  type Institution {
    _id: ID!
    alias: String!
    name: String!
    countryId: String!
    logo: String
    website: String
  }
  
  type Query {
    Institution(alias: String!): Institution!
    allInstitutions: [Institution!]!
  }
  
  type Mutation {
    createInstitution(institution: createInstitutionInput): Institution!
    deleteInstitution(alias: String!): Institution!
  }
    
  input createInstitutionInput {
    alias: String!
    name: String!
    countryId: String!
    logo: String
    website: String
  }
`
