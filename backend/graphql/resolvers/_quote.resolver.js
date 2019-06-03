const {Quote} = require('../../models')

module.exports = {
  Query: {
    quote (_, {id, ...args}) {
      return new Promise((resolve, reject) => {
        Quote.findOne({_id: id, ...args})
          .exec((err, res) => {
            err ? reject(err) : resolve(res)
          })
      })
    },
    allQuote (_, args) {
      return new Promise((resolve, reject) => {
        Quote.find(args)
          .sort({date: 'asc'})
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
    deleteQuote (_, {id}) {
      return new Promise((resolve, reject) => {
        Quote.findOneAndDelete({_id: id})
          .exec((err, res) => {
            err ? reject(err) : resolve(res)
          })
      })
    },
    updateQuote (_, {id, quote}) {
      return new Promise((resolve, reject) => {
        Quote.findOneAndUpdate({_id: id}, {$set: quote}, {new: true})
          .exec((err, res) => {
            err ? reject(err) : resolve(res)
          })
      })
    },
  },
}
