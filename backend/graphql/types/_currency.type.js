module.exports = `
  type Currency {
    id: ID!
    slug: String!
    name: String!
    numCode: Int!
    symbol: String
  }
  
  type Query {
    currency(slug: String!): Currency!
    allCurrency: [Currency!]!
  }
  
  type Mutation {
    createCurrency(institution: createCurrencyInput): Currency!
    deleteCurrency(slug: String!): Currency!
  }
    
  input createCurrencyInput {
    slug: String!
    name: String!
    numCode: Int!
  }
`
