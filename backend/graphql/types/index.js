const { mergeTypes } = require('merge-graphql-schemas');

const Currency = require('./_currency.type');
const Institution = require('./_institution.type');
const Parser = require('./_parser.type');
const Quote = require('./_quote.type');
const Post = require('./_post.type');
const User = require('./_user.type');
const Translation = require('./_translation.type');

const types = [
  Currency,
  Institution,
  Parser,
  Quote,
  Post,
  User,
  Translation,
];

module.exports = mergeTypes(types, { all: true });
