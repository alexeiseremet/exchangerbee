const { Quote } = require('../../models');
const flattenObject = require('../../flattenObject');

module.exports = {
  Query: {
    quote(_, { id, ...args }) {
      return new Promise((resolve, reject) => {
        Quote.findOne({ _id: id, ...args })
          .exec((err, res) => {
            err ? reject(err) : resolve(res)
          })
      })
    },
    allQuote(_, { where }) {
      where = flattenObject(where);

      return new Promise((resolve, reject) => {
        Quote.find(where)
          .sort({ 'date': 'desc', 'institution.refSlug': 'asc', 'currency.refSlug': 'asc' })
          // .populate({
          //   path: 'currency.refId',
          //   // options: { limit: 5 }
          //   // Explicitly exclude `_id`, see http://bit.ly/2aEfTdB
          //   select: 'name -_id',
          // })
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
