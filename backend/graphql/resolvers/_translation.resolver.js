const { Translation } = require('../../models');
const flattenObject = require('../../lib/flattenObject');
const excludeEmptyObject = require('../../lib/excludeEmptyObject');

module.exports = {
  Query: {
    translation(_, { id, ...args }) {
      return new Promise((resolve, reject) => {
        Translation.findOne({ $or: excludeEmptyObject([{ _id: id }, args]) })
          .exec((err, res) => {
            err ? reject(err) : resolve(res);
          });
      });
    },
    allTranslation(_, { where }) {
      const flattenWhere = flattenObject(where);

      return new Promise((resolve, reject) => {
        Translation.find(flattenWhere)
          .sort({ id: 'asc' })
          .exec((err, res) => {
            err ? reject(err) : resolve(res);
          });
      });
    },
  },
  Mutation: {
    async createTranslation(_, { translation }) {
      const newTranslation = await new Translation(translation);

      return new Promise((resolve, reject) => {
        newTranslation.save((err, res) => {
          err ? reject(err) : resolve(res);
        });
      });
    },
    deleteTranslation(_, { id }) {
      return new Promise((resolve, reject) => {
        Translation.findOneAndDelete({ _id: id })
          .exec((err, res) => {
            err ? reject(err) : resolve(res);
          });
      });
    },
    updateTranslation(_, { where, translation }) {
      return new Promise((resolve, reject) => {
        Translation.findOneAndUpdate(
          where,
          { $set: translation },
          {
            new: true,
            upsert: true,
            setDefaultsOnInsert: true,
            omitUndefined: true,
          },
        )
          .exec((err, res) => {
            err ? reject(err) : resolve(res);
          });
      });
    },
  },
};
