module.exports = `
  type Parser {
    id: ID!
    institution: Institution!
    url: String!
    period: String!
    processedAt: String
    quotes: [ParserQuote]
  }
  
  type ParserQuote {
    amount: String!
    currency: Currency!
    xPaths: ParserQuoteXPaths!
  }
  
  type ParserQuoteXPaths {
    ask: String!
    bid: String!
    code: String
  }
  
  type Query {
    parser(id: ID): Parser!
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
  
  type Mutation {
    createParser(parser: ParserInput!): Parser!
    updateParser(id: ID!, parser: ParserInput!): Parser!
    deleteParser(id: ID!): Parser!
  }
    
  input ParserInput {
    institution: ID
    url: String
    period: String
    processedAt: String
    quotes: [ParserQuoteInput]
  }
  
  input ParserQuoteInput {
    amount: String
    currency: ID
    xPaths: ParserQuoteXPathsInput
  }
  
  input ParserQuoteXPathsInput {
    ask: String
    bid: String
    code: String
  }
  
  input ParserWhereInput {
    id: ID
    institution: ID
    period: String
    processedAt: String
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
