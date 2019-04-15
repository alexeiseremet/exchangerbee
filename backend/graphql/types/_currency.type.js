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
    allCurrency(
      where: CurrencyWhereInput
      orderBy: CurrencyOrderByInput
      skip: Int
      after: String
      before: String
      first: Int
      last: Int
    ): [Currency!]!
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
  
  input CurrencyWhereInput {
    id: ID
    slug: String
    name: String
  }
  
  enum CurrencyOrderByInput {
    id_ASC
    id_DESC
    name_ASC
    name_DESC
  }
`
