const { Parser } = require('../../models');

module.exports = {
  Query: {
    parser(_, { id, ...args }) {
      return new Promise((resolve, reject) => {
        Parser.findOne({ _id: id, ...args })
          .exec((err, res) => (
            err ? reject(err) : resolve(res)
          ));
      });
    },
    allParser(_, args) {
      return new Promise((resolve, reject) => {
        Parser.find(args)
          .sort({ processedAt: 'asc' })
          .exec((err, res) => (
            err ? reject(err) : resolve(res)
          ));
      });
    },
  },
  Mutation: {
    async createParser(_, { parser }) {
      const newParser = await new Parser(parser);

      return new Promise((resolve, reject) => {
        newParser.save((err, res) => (
          err ? reject(err) : resolve(res)
        ));
      });
    },
    deleteParser(_, { id }) {
      return new Promise((resolve, reject) => {
        Parser.findOneAndDelete({ _id: id })
          .exec((err, res) => (
            err ? reject(err) : resolve(res)
          ));
      });
    },
    updateParser(_, { id, parser }) {
      return new Promise((resolve, reject) => {
        Parser.findOneAndUpdate(
          { _id: id },
          { $set: parser },
          { new: true },
        )
          .exec((err, res) => (
            err ? reject(err) : resolve(res)
          ));
      });
    },
  },
};
