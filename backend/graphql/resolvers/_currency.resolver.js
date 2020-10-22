const { Currency } = require('../../models');
const excludeEmptyObject = require('../../lib/excludeEmptyObject');

module.exports = {
  Query: {
    currency(_, { id, ...args }) {
      return new Promise((resolve, reject) => {
        Currency.findOne({ $or: excludeEmptyObject([{ _id: id }, args]) })
          .populate({
            path: 'translationVObj',
          })
          .exec((err, res) => {
            err ? reject(err) : resolve(res);
          });
      });
    },
    allCurrency(_, args) {
      return new Promise((resolve, reject) => {
        Currency.find(args)
          .populate({
            path: 'translationVObj',
          })
          .sort({ id: 'asc' })
          .exec((err, res) => {
            err ? reject(err) : resolve(res);
          });
      });
    },
  },
  Mutation: {
    async createCurrency(_, { currency }) {
      const newCurrency = await new Currency(currency);

      return new Promise((resolve, reject) => {
        newCurrency.save((err, res) => {
          err ? reject(err) : resolve(res);
        });
      });
    },
    deleteCurrency(_, { id }) {
      return new Promise((resolve, reject) => {
        Currency.findOneAndDelete({ _id: id })
          .exec((err, res) => {
            err ? reject(err) : resolve(res);
          });
      });
    },
    updateCurrency(_, { id, currency }) {
      return new Promise((resolve, reject) => {
        Currency.findOneAndUpdate(
          { _id: id },
          { $set: currency },
          { new: true },
        )
          .exec((err, res) => {
            err ? reject(err) : resolve(res);
          });
      });
    },
  },
};
