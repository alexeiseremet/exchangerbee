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
    bestTodayQuote(_, { currencies, centralBankSlug }) {
      return new Promise((resolve, reject) => {
        Quote.aggregate([
          { $sort: { date: -1, bid: -1 } },
          {
            $match: {
              $and: [
                { 'currency.refSlug': { $in: currencies } },
                { 'institution.refSlug': { $ne: centralBankSlug } },
                { 'error': 'no' },
              ]
            }
          },
          {
            $group: {
              '_id': '$currency.refSlug',
              'quote': { $first: '$_id' }
            }
          },
        ])
          .exec(async (err, res) => {
            if (err) {
              reject(err);
              return undefined;
            }

            try {
              const ids = res.map(item => item.quote);
              const quotes = (
                await Quote.find({ '_id': { $in: ids } })
                  .populate({
                    'path': 'institutionVObj',
                    'select': 'name slug'
                  })
                  .populate({
                    'path': 'currencyVObj',
                    'select': 'name slug'
                  })
              );

              resolve(quotes);
            }
            catch (error) {
              console.error(error);
            }
          });
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
