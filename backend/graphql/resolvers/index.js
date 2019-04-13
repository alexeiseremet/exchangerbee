const {mergeResolvers} = require('merge-graphql-schemas')
const CountryResolver = require('./_country.resolver')
const CurrencyResolver = require('./_currency.resolver')
const InstitutionResolver = require('./_institution.resolver')
const QuoteResolver = require('./_quote.resolver')

const resolvers = [
  CountryResolver,
  CurrencyResolver,
  InstitutionResolver,
  QuoteResolver,
]

module.exports = mergeResolvers(resolvers)
