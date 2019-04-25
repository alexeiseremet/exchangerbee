module.exports = `
  type Institution {
    id: ID!
    slug: String!
    name: String!
    logo: String
    website: String
  }
  
  type Query {
    institution(slug: String!): Institution!
    allInstitution(
      where: InstitutionWhereInput
      orderBy: InstitutionOrderByInput
      skip: Int
      after: String
      before: String
      first: Int
      last: Int
    ): [Institution!]!
  }
  
  type Mutation {
    createInstitution(institution: InstitutionInput!): Institution!
    updateInstitution(id: ID!, institution: InstitutionInput!): Institution!
    deleteInstitution(id: ID!): Institution!
  }
    
  input InstitutionInput {
    slug: String
    name: String
  }
  
  input InstitutionWhereInput {
    id: ID
    name: String
  }
  
  enum InstitutionOrderByInput {
    id_ASC
    id_DESC
    name_ASC
    name_DESC
  }
`
