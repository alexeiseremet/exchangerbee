module.exports = `
  type Currency {
    id: ID!
    slug: String!
    name: String!
    numCode: String!
    symbol: String
  }
  
  type Query {
    currency(slug: String!): Currency!
    allCurrency: [Currency!]!
  }
  
  type Mutation {
    createCurrency(currency: CreateCurrencyInput!): Currency!
    deleteCurrency(slug: String!): Currency!
  }
    
  input CreateCurrencyInput {
    slug: String!
    name: String!
    numCode: String!
  }
`
