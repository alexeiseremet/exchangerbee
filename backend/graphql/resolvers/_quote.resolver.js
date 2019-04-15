const {
  Quote
} = require('../../models')

module.exports = {
  Query: {
    quote (_, args) {
      return new Promise((resolve, reject) => {
        Quote.findOne(args).exec((err, res) => {
          err ? reject(err) : resolve(res)
        })
      })
    },
    allQuote () {
      return new Promise((resolve, reject) => {
        Quote.find({})
          .populate('institution')
          .populate('currency')
          .populate('baseCurrency')
          .exec((err, res) => {
          err ? reject(err) : resolve(res)
        })
      })
    }
  },
  Mutation: {
    async createQuote (_, {quote}) {
      const newQuote = await new Quote(quote)

      return new Promise((resolve, reject) => {
        newQuote.save((err, res) => {
          err ? reject(err) : resolve(res)
        })
      })
    },
    async deleteQuote (_, {id}) {
      return new Promise((resolve, reject) => {
        Quote.findOneAndDelete({_id: id}).exec((err, res) => {
          err ? reject(err) : resolve(res)
        })
      })
    },
    async updateQuote (_, {id, quote}) {
      return new Promise((resolve, reject) => {
        Quote.findOneAndUpdate(
          {_id: id}, {$set: quote}, {new: true}
        ).exec((err, res) => {
          err ? reject(err) : resolve(res)
        })
      })
    },
  },
}
