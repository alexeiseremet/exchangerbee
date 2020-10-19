module.exports = `
  type Quote {
    id: ID!
    institution: QuoteRef!
    institutionVObj: Institution
    currency: QuoteRef!
    date: String!
    amount: String!
    bid: String!
    ask: String!
    period: QuotePeriodEnum!
    error: QuoteErrorEnum!
    currencyVObj: Currency
  }
  
  type QuoteRef {
    refId: ID
    refSlug: String
  }
  
  type Query {
    quote(id: ID!): Quote
    allQuote(
      where: QuoteWhereInput
      orderBy: [QuoteOrderByEnum]
      skip: Int
      after: String
      before: String
      first: Int
      last: Int
      limit: Int
    ): [Quote!]
    bestQuote(
      date: String
      currencies: [String!]
      excludeBanks: [String!]
      includeBanks: [String!]
      type: String
    ): [Quote!]
    archiveQuote(
      where: QuoteArchiveWhereInput
    ): [ArchiveQuote!]
  }
  
  type ArchiveQuote {
    slug: String
    quote: [Quote!]
  }
  
  type Mutation {
    createQuote(quote: QuoteInput!): Quote @auth(requires: ADMIN)
    updateQuote(where: QuoteWhereInput!, quote: QuoteInput!): Quote @auth(requires: ADMIN)
    deleteQuote(id: ID!): Quote @auth(requires: ADMIN)
  }
  
  input QuoteInput {
    id: ID
    institution: QuoteRefInput
    currency: QuoteRefInput
    date: String
    amount: String
    bid: String
    ask: String
    period: QuotePeriodEnum
    error: QuoteErrorEnum
  }
  
  input QuoteWhereInput {
    id: ID
    institution: QuoteRefInput
    currency: QuoteRefInput
    date: [String]
    period: QuotePeriodEnum
    error: QuoteErrorEnum
  }
  
  input QuoteArchiveWhereInput {
    date: [String]
    currencies: [String!]
    includeBanks: [String!]
  }
  
  input QuoteRefInput {
    refId: ID
    refSlug: String
  }
  
  enum QuotePeriodEnum {
    daily
    monthly
  }
  
  enum QuoteErrorEnum {
    yes
    no
  }
  
  enum QuoteOrderByEnum {
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
