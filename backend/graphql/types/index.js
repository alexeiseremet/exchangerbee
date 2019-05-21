const {mergeTypes} = require('merge-graphql-schemas')

const Currency = require('./_currency.type')
const Institution = require('./_institution.type')
const Parser = require('./_parser.type')
const Quote = require('./_quote.type')

const types = [
  Currency,
  Institution,
  Parser,
  Quote,
]

module.exports = mergeTypes(types, {all: true})
