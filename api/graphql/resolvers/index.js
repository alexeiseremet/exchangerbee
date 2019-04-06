const {mergeResolvers} = require('merge-graphql-schemas')
const CountryResolver = require('./_country.resolver')
const CurrencyResolver = require('./_currency.resolver')
const InstitutionResolver = require('./_institution.resolver')

const resolvers = [
  CountryResolver,
  CurrencyResolver,
  InstitutionResolver,
]

module.exports = mergeResolvers(resolvers)
