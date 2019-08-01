const { mergeResolvers } = require('merge-graphql-schemas');
const CurrencyResolver = require('./_currency.resolver');
const InstitutionResolver = require('./_institution.resolver');
const ParserResolver = require('./_parser.resolver');
const QuoteResolver = require('./_quote.resolver');

const resolvers = [
  CurrencyResolver,
  InstitutionResolver,
  ParserResolver,
  QuoteResolver,
];

module.exports = mergeResolvers(resolvers);
