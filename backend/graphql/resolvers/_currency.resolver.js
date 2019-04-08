const {
  Currency
} = require('../../models')

module.exports = {
  Query: {
    currency (_, args) {
      return new Promise((resolve, reject) => {
        Currency.findOne(args).exec((err, res) => {
          err ? reject(err) : resolve(res)
        })
      })
    },
    allCurrency () {
      return new Promise((resolve, reject) => {
        Currency.find({}).exec((err, res) => {
          err ? reject(err) : resolve(res)
        })
      })
    }
  },
  Mutation: {
    async createCurrency (_, args) {
      const newInstitution = await new Currency({
        ...args.currency
      })

      return new Promise((resolve, reject) => {
        newInstitution.save((err, res) => {
          err ? reject(err) : resolve(res)
        })
      })
    },
    async deleteCurrency (_, {slug}) {
      return new Promise((resolve, reject) => {
        Currency.findOneAndDelete(slug).exec((err, res) => {
          err ? reject(err) : resolve(res)
        })
      })
    }
  },
}
