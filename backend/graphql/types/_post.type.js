module.exports = `
  type Post {
    id: ID!
    slug: String!
    title: String!
    description: String
    heading: String
    textFirst: String
    textSecond: String
  }
  
  type Query {
    post(id: ID, slug: String): Post
    allPost(
      where: PostWhereInput
      orderBy: PostOrderByEnum
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
    description: String
    heading: String
    textFirst: String
    textSecond: String
  }
  
  input PostWhereInput {
    id: ID
    slug: String
  }
  
  enum PostOrderByEnum {
    id_ASC
    id_DESC
    slug_ASC
    slug_DESC
  }
`;
