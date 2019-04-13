const {mergeTypes} = require('merge-graphql-schemas')

const Country = require('./_country.type')
const Currency = require('./_currency.type')
const Institution = require('./_institution.type')
const Quote = require('./_quote.type')

const types = [
  Country,
  Currency,
  Institution,
  Quote,
]

module.exports = mergeTypes(types, {all: true})
