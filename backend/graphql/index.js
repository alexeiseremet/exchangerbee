const { makeExecutableSchema } = require('graphql-tools');

const typeDefs = require('./types');
const resolvers = require('./resolvers');
const directiveResolvers = require('./resolvers/_directive.resolver');

const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
  directiveResolvers,
});

module.exports = schema;
