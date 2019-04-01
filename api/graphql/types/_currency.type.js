module.exports = `
  type Currency {
    _id: ID!
    alias: String!
    name: String!
    numeric_code: Int!
    symbol: String
  }
  
  type Mutation {
    createCurrency(institution: createCurrencyInput): Currency!
    deleteCurrency(alias: String!): Currency!
  }
    
  input createCurrencyInput {
    alias: String!
    name: String!
  }
`
