const { Post } = require('../../models');

module.exports = {
  Query: {
    post(_, { id, ...args }) {
      const fields = [{ _id: id }, args].filter(obj => Object.keys(obj).length);

      return new Promise((resolve, reject) => {
        Post.findOne({ $or: fields })
          .exec((err, res) => {
            err ? reject(err) : resolve(res)
          })
      })
    },
    allPost(_, args) {
      return new Promise((resolve, reject) => {
        Post.find(args)
          .sort({ slug: 'asc' })
          .exec((err, res) => {
            err ? reject(err) : resolve(res)
          })
      })
    },
  },
  Mutation: {
    async createPost(_, { post }) {
      const newPost = await new Post(post);

      return new Promise((resolve, reject) => {
        newPost.save((err, res) => {
          err ? reject(err) : resolve(res)
        })
      })
    },
    deletePost(_, { id }) {
      return new Promise((resolve, reject) => {
        Post.findOneAndDelete({ _id: id })
          .exec((err, res) => {
            err ? reject(err) : resolve(res)
          })
      })
    },
    updatePost(_, { id, post }) {
      return new Promise((resolve, reject) => {
        Post.findOneAndUpdate(
          { _id: id },
          { $set: post },
          { new: true }
        )
          .exec((err, res) => {
            err ? reject(err) : resolve(res)
          })
      })
    },
  },
};
