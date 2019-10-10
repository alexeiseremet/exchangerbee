module.exports = `
  type Post {
    id: ID!
    slug: String!
    title: String!
    textFirst: String
    textSecond: String
  }
  
  type Query {
    post(id: ID, slug: String): Post
    allPost(
      where: PostWhereInput
      orderBy: PostOrderByInput
      skip: Int
      after: String
      before: String
      first: Int
      last: Int
    ): [Post!] @auth(requires: ADMIN)
  }
  
  type Mutation {
    createPost(post: PostInput!): Post @auth(requires: ADMIN)
    updatePost(id: ID!, post: PostInput!): Post @auth(requires: ADMIN)
    deletePost(id: ID!): Post @auth(requires: ADMIN)
  }
    
  input PostInput {
    id: ID
    slug: String
    title: String
    textFirst: String
    textSecond: String
  }
  
  input PostWhereInput {
    id: ID
    slug: String
  }
  
  enum PostOrderByInput {
    id_ASC
    id_DESC
    slug_ASC
    slug_DESC
  }
`;
