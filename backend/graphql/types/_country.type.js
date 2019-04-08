module.exports = `
  type Country {
    id: ID!
    slug: String!
    currency: ID!
    name: String!
    numCode: String!
    shortName: String!
  }
  
  type Query {
    country(slug: String!): Country!
    allCountry: [Country!]!
  }
  
  type Mutation {
    createCountry(country: CreateCountryInput!): Country!
    deleteCountry(slug: String!): Country!
  }
    
  input CreateCountryInput {
    slug: String!
    currency: ID!
    name: String!
    numCode: String!
    shortName: String!
  }
`
