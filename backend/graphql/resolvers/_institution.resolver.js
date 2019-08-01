const { Institution } = require('../../models');

module.exports = {
  Query: {
    institution(_, args) {
      return new Promise((resolve, reject) => {
        Institution.findOne(args)
          .exec((err, res) => {
            err ? reject(err) : resolve(res)
          })
      })
    },
    allInstitution(_, args) {
      return new Promise((resolve, reject) => {
        Institution.find(args)
          .sort({ slug: 'asc' })
          .exec((err, res) => {
            err ? reject(err) : resolve(res)
          })
      })
    }
  },
  Mutation: {
    async createInstitution(_, { institution }) {
      const newInstitution = await new Institution(institution);

      return new Promise((resolve, reject) => {
        newInstitution.save((err, res) => {
          err ? reject(err) : resolve(res)
        })
      })
    },
    deleteInstitution(_, { id }) {
      return new Promise((resolve, reject) => {
        Institution.findOneAndDelete({ _id: id })
          .exec((err, res) => {
            err ? reject(err) : resolve(res)
          })
      })
    },
    updateInstitution(_, { id, institution }) {
      return new Promise((resolve, reject) => {
        Institution.findOneAndUpdate(
          { _id: id },
          { $set: institution },
          { new: true }
        )
          .exec((err, res) => {
            err ? reject(err) : resolve(res)
          })
      })
    },
  },
};
