module.exports = `
  type Quote {
    id: ID!
    country: ID
    institution: ID!
    date: String!
    currency: ID!
    baseCurrency: ID!
    amount: String!
    ask: String!
    bid: String!
    updateDate: String
    period: String
  }
  
  type Query {
    quote(id: ID, date: String, institution: ID, currency: ID): Quote!
    allQuote: [Quote!]!
  }
  
  type Mutation {
    createQuote(quote: QuoteInput!): Quote!
    updateQuote(id: ID!, quote: QuoteInput!): Quote!
    deleteQuote(id: ID!): Quote!
  }
    
  input QuoteInput {
    country: ID
    institution: ID
    date: String
    currency: ID
    baseCurrency: ID
    amount: String
    ask: String
    bid: String
    updateDate: String
    period: String
  }
`
