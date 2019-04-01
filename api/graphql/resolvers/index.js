const {mergeResolvers} = require('merge-graphql-schemas')
const InstitutionResolver = require('./_institution.resolver')

const resolvers = [InstitutionResolver]

module.exports = mergeResolvers(resolvers)
