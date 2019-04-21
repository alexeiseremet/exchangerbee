import { gql } from 'apollo-boost'

export const ModalType = `  
  type Modal {
    id: ID!
    isActive: Boolean
  }
  
  extend type Query {
    modal(id: String!): Modal
  }
  
  extend type Mutation {
    modalToggle(id: String!): Modal
  }
`

export const ModalDefaultState = {
  modal: {
    id: 'modal',
    isActive: false,
    __typename: 'Modal'
  }
}

const fragment = gql`
  fragment modal on Modal {
    id
    isActive
    __typename
  }
`

export const ModalResolvers = {
  Query: {
    modal (_, args, {cache, getCacheKey}) {
      const id = getCacheKey({__typename: 'Modal', id: args.id})
      return cache.readFragment({fragment, id})
    },
  },
  Mutation: {
    modalToggle (_, args, {cache, getCacheKey}) {
      const id = getCacheKey({__typename: 'Modal', id: args.id})
      const prevModal = cache.readFragment({fragment, id})
      const data = {...prevModal, isActive: !prevModal.isActive}

      cache.writeData({id, data})
      return data
    },
  }
}
