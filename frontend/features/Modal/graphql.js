export const ModalType = `
  type Author {
    id: Int!
    firstName: String
    lastName: String
  }
  
  extend type Query {
    show(id: Int!): Author
  }
`

export const ModalResolvers = {
  Query: {
    show: () => ({}),
  }
}
