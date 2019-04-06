module.exports = `
  type Country {
    id: ID!
    slug: String!
    currency: ID!
    name: String!
    numCode: Int!
    shortName: String!
  }
  
  type Query {
    country(slug: String!): Country!
    allCountry: [Country!]!
  }
  
  type Mutation {
    createCountry(institution: createCountryInput): Country!
    deleteCountry(slug: String!): Country!
  }
    
  input createCountryInput {
    slug: String!
    currency: ID!
    name: String!
    numCode: Int!
    shortName: String!
  }
`
