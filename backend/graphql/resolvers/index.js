const { mergeResolvers } = require('merge-graphql-schemas');

const CurrencyResolver = require('./_currency.resolver');
const InstitutionResolver = require('./_institution.resolver');
const ParserResolver = require('./_parser.resolver');
const QuoteResolver = require('./_quote.resolver');
const PostResolver = require('./_post.resolver');
const UserResolver = require('./_user.resolver');
const TranslationResolver = require('./_translation.resolver');

const resolvers = [
  CurrencyResolver,
  InstitutionResolver,
  ParserResolver,
  QuoteResolver,
  PostResolver,
  UserResolver,
  TranslationResolver,
];

module.exports = mergeResolvers(resolvers);
