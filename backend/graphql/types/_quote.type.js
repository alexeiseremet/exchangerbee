module.exports = `
  type Quote {
    id: ID!
    slug: String!
    institution: Institution!
    createdAt: String!
    currency: Currency!
    baseCurrency: Currency!
    amount: String!
    ask: String!
    bid: String!
    updatedAt: String
    period: String
  }
  
  type Query {
    quote(id: ID): Quote!
    allQuote(
      where: QuoteWhereInput
      orderBy: QuoteOrderByInput
      skip: Int
      after: String
      before: String
      first: Int
      last: Int
    ): [Quote!]!
  }
  
  type Mutation {
    createQuote(quote: QuoteInput!): Quote!
    updateQuote(id: ID!, quote: QuoteInput!): Quote!
    deleteQuote(id: ID!): Quote!
  }
    
  input QuoteInput {
    slug: String
    institution: ID
    createdAt: String
    currency: ID
    baseCurrency: ID
    amount: String
    ask: String
    bid: String
    updatedAt: String
    period: String
  }
  
  input QuoteWhereInput {
    id: ID
    created: String
    institution: ID
    currency: ID
  }
  
  enum QuoteOrderByInput {
    id_ASC
    id_DESC
    updatedAt_ASC
    updatedAt_DESC
    createdAt_ASC
    createdAt_DESC
  }
`
