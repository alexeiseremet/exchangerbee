module.exports = `
  type Quote {
    id: ID!
    institution: ID!
    currency: ID!
    date: String!
    amount: String!
    bid: String!
    ask: String!
    period: QuotePeriod!
    error: String!
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
    id: ID
    institution: ID
    currency: ID
    date: String
    amount: String
    bid: String
    ask: String
    period: String
    error: String
  }
  
  input QuoteWhereInput {
    id: ID
    institution: ID
    currency: ID
    date: String
    period: String
    error: String
  }
  
  enum QuotePeriod {
    daily
    monthly
  }
  
  enum QuoteOrderByInput {
    id_ASC
    id_DESC
    date_ASC
    date_DESC
    period_ASC
    period_DESC
    error_ASC
    error_DESC
  }
`
