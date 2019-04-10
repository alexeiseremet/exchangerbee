const {
  Country
} = require('../../models')

module.exports = {
  Query: {
    country (_, args) {
      return new Promise((resolve, reject) => {
        Country.findOne(args).exec((err, res) => {
          err ? reject(err) : resolve(res)
        })
      })
    },
    allCountry () {
      return new Promise((resolve, reject) => {
        Country.find({}).exec((err, res) => {
          err ? reject(err) : resolve(res)
        })
      })
    }
  },
  Mutation: {
    async createCountry (_, args) {
      const newInstitution = await new Country({
        ...args.country
      })

      return new Promise((resolve, reject) => {
        newInstitution.save((err, res) => {
          err ? reject(err) : resolve(res)
        })
      })
    },
    async deleteCountry (_, args) {
      return new Promise((resolve, reject) => {
        Country.findOneAndDelete(args).exec((err, res) => {
          err ? reject(err) : resolve(res)
        })
      })
    }
  },
}
