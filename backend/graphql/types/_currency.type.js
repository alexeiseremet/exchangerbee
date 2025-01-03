module.exports = `
  type Currency {
    id: ID!
    slug: String!
    name: String!
    numCode: String!
    symbol: String
    image: String
    translationVObj: Translation
  }
  
  type Query {
    currency(slug: String!): Currency
    allCurrency(
      where: CurrencyWhereInput
      orderBy: CurrencyOrderByEnum
      skip: Int
      after: String
      before: String
      first: Int
      last: Int
    ): [Currency!]
  }
  
  type Mutation {
    createCurrency(currency: CurrencyInput!): Currency @auth(requires: ADMIN)
    updateCurrency(id: ID!, currency: CurrencyInput!): Currency @auth(requires: ADMIN)
    deleteCurrency(id: ID!): Currency @auth(requires: ADMIN)
  }
    
  input CurrencyInput {
    id: ID
    slug: String
    name: String
    numCode: String
    symbol: String
    image: String
  }
  
  input CurrencyWhereInput {
    id: ID
    slug: String
  }
  
  enum CurrencyOrderByEnum {
    id_ASC
    id_DESC
    slug_ASC
    slug_DESC
  }
`;
