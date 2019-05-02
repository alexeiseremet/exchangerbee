module.exports = `
  type Quote {
    id: ID!
    institution: Institution!
    currency: Currency!
    date: String!
    amount: String!
    ask: String!
    bid: String!
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
    institution: ID
    currency: ID
    date: String
    amount: String
    ask: String
    bid: String
    period: String
  }
  
  input QuoteWhereInput {
    id: ID
    institution: ID
    currency: ID
    date: String
  }
  
  enum QuoteOrderByInput {
    id_ASC
    id_DESC
    date_ASC
    date_DESC
  }
`
