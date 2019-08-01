module.exports = `
  type Quote {
    id: ID!
    institution: QuoteRef!
    currency: QuoteRef!
    date: String!
    amount: String!
    bid: String!
    ask: String!
    period: QuotePeriod!
    error: QuoteError!
  }
  
  type QuoteRef {
    refId: ID!
    refSlug: String
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
    createQuote(quote: QuoteInput!): Quote
    updateQuote(where: QuoteWhereInput!, quote: QuoteInput!): Quote
    deleteQuote(id: ID!): Quote
  }
  
  input QuoteInput {
    id: ID
    institution: QuoteRefInput
    currency: QuoteRefInput
    date: String
    amount: String
    bid: String
    ask: String
    period: QuotePeriod
    error: QuoteError
  }
  
  input QuoteWhereInput {
    id: ID
    institution: QuoteRefInput
    currency: QuoteRefInput
    date: String
    period: QuotePeriod
    error: QuoteError
  }
  
  input QuoteRefInput {
    refId: ID
    refSlug: String
  }
  
  enum QuotePeriod {
    daily
    monthly
  }
  
  enum QuoteError {
    yes
    no
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
`;
