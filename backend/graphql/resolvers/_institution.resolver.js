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
    async deleteInstitution (_, {_id}) {
      return new Promise((resolve, reject) => {
        Institution.findByIdAndDelete(_id).exec((err, res) => {
          err ? reject(err) : resolve(res)
        })
      })
    }
  },
}
