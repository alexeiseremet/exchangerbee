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
    async createCountry (_, {country}) {
      const newCountry = await new Country(country)

      return new Promise((resolve, reject) => {
        newCountry.save((err, res) => {
          err ? reject(err) : resolve(res)
        })
      })
    },
    async deleteCountry (_, {id}) {
      return new Promise((resolve, reject) => {
        Country.findOneAndDelete({_id: id}).exec((err, res) => {
          err ? reject(err) : resolve(res)
        })
      })
    },
    async updateCountry (_, {id, country}) {
      return new Promise((resolve, reject) => {
        Country.findOneAndUpdate(
          {_id: id}, {$set: country}, {new: true}
        ).exec((err, res) => {
          err ? reject(err) : resolve(res)
        })
      })
    },
  },
}
