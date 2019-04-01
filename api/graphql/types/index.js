const {mergeTypes} = require('merge-graphql-schemas')

const Country = require('./_country.type')
const Currency = require('./_currency.type')
const Institution = require('./_institution.type')

const types = [
  Country,
  Currency,
  Institution,
]

module.exports = mergeTypes(types, {all: true})
