const { Quote } = require('../../models');
const flattenObject = require('../../lib/flattenObject');

module.exports = {
  Query: {
    quote(_, { id, ...args }) {
      return new Promise((resolve, reject) => {
        Quote.findOne({ _id: id, ...args })
          .populate({
            'path': 'institutionVObj',
            'select': 'name slug'
          })
          .populate({
            'path': 'currencyVObj',
            'select': 'name slug'
          })
          .exec((err, res) => {
            err ? reject(err) : resolve(res)
          })
      })
    },
    allQuote(_, { where }) {
      where = flattenObject(where);

      return new Promise((resolve, reject) => {
        Quote.find(where)
          .populate({
            'path': 'institutionVObj',
            'select': 'name slug'
          })
          .populate({
            'path': 'currencyVObj',
            'select': 'name slug'
          })
          .sort({
            'date': 'desc',
            'institution.refSlug': 'asc',
            'currency.refSlug': 'asc'
          })
          .exec((err, res) => {
            err ? reject(err) : resolve(res)
          })
      })
    },
  },
  Mutation: {
    async createQuote(_, { quote }) {
      const newQuote = await new Quote(quote);

      return new Promise((resolve, reject) => {
        newQuote.save((err, res) => {
          err ? reject(err) : resolve(res)
        })
      })
    },
    deleteQuote(_, { id }) {
      return new Promise((resolve, reject) => {
        Quote.findOneAndDelete({ _id: id })
          .exec((err, res) => {
            err ? reject(err) : resolve(res)
          })
      })
    },
    updateQuote(_, { where, quote }) {
      console.log('quote', quote);

      return new Promise((resolve, reject) => {
        Quote.findOneAndUpdate(
          where,
          { $set: quote },
          {
            new: true,
            upsert: true,
            setDefaultsOnInsert: true,
            omitUndefined: true,
          }
        )
          .exec((err, res) => {
            err ? reject(err) : resolve(res)
          })
      })
    },
  },
};
