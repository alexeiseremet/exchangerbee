module.exports = `
  type Post {
    id: ID!
    slug: String!
    title: String!
    textFirst: String
    textSecond: String
  }
  
  type Query {
    post(id: ID, slug: String): Post!
    allPost(
      where: PostWhereInput
      orderBy: PostOrderByInput
      skip: Int
      after: String
      before: String
      first: Int
      last: Int
    ): [Post!]!
  }
  
  type Mutation {
    createPost(post: PostInput!): Post
    updatePost(id: ID!, post: PostInput!): Post
    deletePost(id: ID!): Post
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
