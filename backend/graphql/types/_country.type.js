module.exports = `
  type Country {
    id: ID!
    slug: String!
    currency: ID!
    name: String!
    numCode: String!
    shortName: String
  }
  
  type Query {
    country(slug: String!): Country!
    allCountry(
      where: CountryWhereInput
      orderBy: CountryOrderByInput
      skip: Int
      after: String
      before: String
      first: Int
      last: Int
    ): [Country!]!
  }
  
  type Mutation {
    createCountry(country: CountryInput!): Country!
    updateCountry(id: ID!, country: CountryInput!): Country!
    deleteCountry(id: ID!): Country!
  }
    
  input CountryInput {
    slug: String
    currency: ID
    name: String
    numCode: String
    shortName: String
  }
  
  input CountryWhereInput {
    id: ID
    slug: String
    name: String
  }
  
  enum CountryOrderByInput {
    id_ASC
    id_DESC
    name_ASC
    name_DESC
  }
`
