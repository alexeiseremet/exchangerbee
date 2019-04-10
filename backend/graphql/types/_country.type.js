module.exports = `
  type Country {
    id: ID!
    slug: String
    currency: ID
    name: String
    numCode: String
    shortName: String
  }
  
  type Query {
    country(slug: String!): Country!
    allCountry: [Country!]!
  }
  
  type Mutation {
    createCountry(country: CountryInput!): Country!
    updateCountry(id: ID!, country: CountryInput!): Country!
    deleteCountry(slug: String!): Country!
  }
    
  input CountryInput {
    slug: String
    currency: ID
    name: String
    numCode: String
    shortName: String
  }
`
