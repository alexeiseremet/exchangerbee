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
    createCurrency(currency: CurrencyInput!): Currency!
    updateCurrency(id: ID!, currency: CurrencyInput!): Currency!
    deleteCurrency(id: ID!): Currency!
  }
    
  input CurrencyInput {
    slug: String
    name: String
    numCode: String
    symbol: String
  }
`
