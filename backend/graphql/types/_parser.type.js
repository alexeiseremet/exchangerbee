module.exports = `
  type Parser {
    id: ID!
    institution: ParserRef!
    url: String!
    period: ParserPeriodEnum!
    processedAt: String
    quotes: [ParserQuote!]
  }
  
  type Query {
    parser(id: ID!): Parser @auth(requires: ADMIN)
    allParser(
      where: ParserWhereInput
      orderBy: ParserOrderByEnum
      skip: Int
      after: String
      before: String
      first: Int
      last: Int
    ): [Parser!] @auth(requires: ADMIN)
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
    createParser(parser: ParserInput!): Parser @auth(requires: ADMIN)
    updateParser(id: ID!, parser: ParserInput!): Parser @auth(requires: ADMIN)
    deleteParser(id: ID!): Parser @auth(requires: ADMIN)
  }
  
  input ParserInput {
    id: ID
    institution: ParserRefInput
    url: String
    period: ParserPeriodEnum
    processedAt: String
    quotes: [ParserQuoteInput]
  }
  
  input ParserWhereInput {
    id: ID
    institution: ParserRefInput
    period: ParserPeriodEnum
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

  enum ParserPeriodEnum {
    daily
    monthly
  }
  
  enum ParserOrderByEnum {
    id_ASC
    id_DESC
    institution_ASC
    institution_DESC
    period_ASC
    period_DESC
    processedAt_ASC
    processedAt_DESC
  }
`;
