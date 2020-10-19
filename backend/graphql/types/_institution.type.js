module.exports = `
  type Institution {
    id: ID!
    slug: String!
    name: String!
    category: InstitutionCategoryEnum!
    logo: String
    website: String
    translationVObj: Translation
  }
  
  type Query {
    institution(slug: String!): Institution
    allInstitution(
      where: InstitutionWhereInput
      orderBy: InstitutionOrderByEnum
      skip: Int
      after: String
      before: String
      first: Int
      last: Int
    ): [Institution!]
  }
  
  type Mutation {
    createInstitution(institution: InstitutionInput!): Institution @auth(requires: ADMIN)
    updateInstitution(id: ID!, institution: InstitutionInput!): Institution @auth(requires: ADMIN)
    deleteInstitution(id: ID!): Institution @auth(requires: ADMIN)
  }
    
  input InstitutionInput {
    id: ID
    slug: String
    name: String
    category: InstitutionCategoryEnum
    logo: String
    website: String
  }
  
  input InstitutionWhereInput {
    id: ID
    slug: String
    category: InstitutionCategoryEnum
  }
  
  enum InstitutionCategoryEnum {
    central
    commercial
  }
  
  enum InstitutionOrderByEnum {
    id_ASC
    id_DESC
    name_ASC
    name_DESC
  }
`;
