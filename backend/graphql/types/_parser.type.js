module.exports = `
  type Parser {
    id: ID!
    institution: ParserRef!
    url: String!
    period: ParserPeriod!
    processedAt: String
    quotes: [ParserQuote!]
  }
  
  type Query {
    parser(id: ID!): Parser!
    allParser(
      where: ParserWhereInput
      orderBy: ParserOrderByInput
      skip: Int
      after: String
      before: String
      first: Int
      last: Int
    ): [Parser!]!
  }
  
  type ParserQuote {
    amount: String!
    currency: ParserRef!
    xPaths: ParserQuoteXPaths!
  }
  
  type ParserRef {
    refId: ID
    refSlug: String
  }
  
  type ParserQuoteXPaths {
    bid: String!
    ask: String!
    code: String!
  }
  
  type Mutation {
    createParser(parser: ParserInput!): Parser
    updateParser(id: ID!, parser: ParserInput!): Parser
    deleteParser(id: ID!): Parser
  }
  
  input ParserInput {
    id: ID
    institution: ParserRefInput
    url: String
    period: ParserPeriod
    processedAt: String
    quotes: [ParserQuoteInput]
  }
  
  input ParserWhereInput {
    id: ID
    institution: ParserRefInput
    period: ParserPeriod
    processedAt: String
  }
  
  input ParserQuoteInput {
    amount: String
    currency: ParserRefInput
    xPaths: ParserQuoteXPathsInput
  }
  
  input ParserRefInput {
    refId: ID
    refSlug: String
  }
  
  input ParserQuoteXPathsInput {
    ask: String
    bid: String
    code: String
  }

  enum ParserPeriod {
    daily
    monthly
  }
  
  enum ParserOrderByInput {
    id_ASC
    id_DESC
    institution_ASC
    institution_DESC
    period_ASC
    period_DESC
    processedAt_ASC
    processedAt_DESC
  }
`
