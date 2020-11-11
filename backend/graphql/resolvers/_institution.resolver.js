const { Institution } = require('../../models');
const excludeEmptyObject = require('../../lib/excludeEmptyObject');

module.exports = {
  Query: {
    institution(_, { id, ...args }, ctx) {
      return new Promise((resolve, reject) => {
        Institution.findOne({ $or: excludeEmptyObject([{ _id: id }, args]) })
          .populate({
            path: 'translationVObj',
            match: { locale: ctx.lng },
          })
          .exec((err, res) => {
            err ? reject(err) : resolve(res);
          });
      });
    },
    allInstitution(_, args, ctx) {
      return new Promise((resolve, reject) => {
        Institution.find(args)
          .populate({
            path: 'translationVObj',
            match: { locale: ctx.lng },
          })
          .sort({ id: 'asc' })
          .exec((err, res) => {
            err ? reject(err) : resolve(res);
          });
      });
    },
  },
  Mutation: {
    async createInstitution(_, { institution }) {
      const newInstitution = await new Institution(institution);

      return new Promise((resolve, reject) => {
        newInstitution.save((err, res) => {
          err ? reject(err) : resolve(res);
        });
      });
    },
    deleteInstitution(_, { id }) {
      return new Promise((resolve, reject) => {
        Institution.findOneAndDelete({ _id: id })
          .exec((err, res) => {
            err ? reject(err) : resolve(res);
          });
      });
    },
    updateInstitution(_, { id, institution }) {
      return new Promise((resolve, reject) => {
        Institution.findOneAndUpdate(
          { _id: id },
          { $set: institution },
          { new: true },
        )
          .exec((err, res) => {
            err ? reject(err) : resolve(res);
          });
      });
    },
  },
};
