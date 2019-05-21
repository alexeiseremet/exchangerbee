const {Parser} = require('../../models')

module.exports = {
  Query: {
    parser (_, args) {
      return new Promise((resolve, reject) => {
        Parser.findOne(args)
          .populate('institution')
          .populate('quotes.currency')
          .exec((err, res) => {
            err ? reject(err) : resolve(res)
          })
      })
    },
    allParser (_, args) {
      return new Promise((resolve, reject) => {
        Parser.find(args)
          .populate('institution')
          .populate('quotes.currency')
          .exec((err, res) => {
            err ? reject(err) : resolve(res)
          })
      })
    }
  },
  Mutation: {
    async createParser (_, {parser}) {
      const newParser = await new Parser(parser)

      return new Promise((resolve, reject) => {
        newParser.save((err, res) => {
          err ? reject(err) : resolve(res)
        })
      })
    },
    async deleteParser (_, {id}) {
      return new Promise((resolve, reject) => {
        Parser.findOneAndDelete({_id: id})
          .exec((err, res) => {
            err ? reject(err) : resolve(res)
          })
      })
    },
    async updateParser (_, {id, parser}) {
      return new Promise((resolve, reject) => {
        Parser.findOneAndUpdate({_id: id}, {$set: parser}, {new: true})
          .exec((err, res) => {
            err ? reject(err) : resolve(res)
          })
      })
    },
  },
}
