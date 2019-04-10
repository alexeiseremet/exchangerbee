const {
  Institution
} = require('../../models')

module.exports = {
  Query: {
    institution (_, args) {
      return new Promise((resolve, reject) => {
        Institution.findOne(args).exec((err, res) => {
          err ? reject(err) : resolve(res)
        })
      })
    },
    allInstitution () {
      return new Promise((resolve, reject) => {
        Institution.find({}).exec((err, res) => {
          err ? reject(err) : resolve(res)
        })
      })
    }
  },
  Mutation: {
    async createInstitution (_, args) {
      const newInstitution = await new Institution({
        ...args.institution
      })

      return new Promise((resolve, reject) => {
        newInstitution.save((err, res) => {
          err ? reject(err) : resolve(res)
        })
      })
    },
    async deleteInstitution (_, args) {
      return new Promise((resolve, reject) => {
        Institution.findOneAndDelete(args).exec((err, res) => {
          err ? reject(err) : resolve(res)
        })
      })
    },
    async updateInstitution (_, {id, institution}) {
      return new Promise((resolve, reject) => {
        Institution.findOneAndUpdate(
          {id}, {$set: institution}
        ).exec((err, res) => {
          err ? reject(err) : resolve(res)
        })
      })
    },
  },
}
