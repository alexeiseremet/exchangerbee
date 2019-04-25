const {mergeResolvers} = require('merge-graphql-schemas')
const CurrencyResolver = require('./_currency.resolver')
const InstitutionResolver = require('./_institution.resolver')
const QuoteResolver = require('./_quote.resolver')

const resolvers = [
  CurrencyResolver,
  InstitutionResolver,
  QuoteResolver,
]

module.exports = mergeResolvers(resolvers)
