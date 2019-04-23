import { gql } from 'apollo-boost'

const GQL_MODAL_ID = 'modal'

const query = gql`
  query Modal {
    modal @client {
      id
      show
      title
      content
      __typename
    }
  }
`

export const ModalType = `  
  type Modal {
    id: ID!
    show: Boolean
    title: String
    content: String
  }
  
  extend type Query {
    modal: Modal
  }
  
  extend type Mutation {
    modalToggle
  }
`
export const ModalDefaultState = {
  modal: {
    id: GQL_MODAL_ID,
    show: false,
    title: '',
    content: '',
    __typename: 'Modal',
  }
}

export const ModalResolvers = {
  Query: {
    modal (_, __, {cache}) {
      return cache.readQuery({query})
    },
  },
  Mutation: {
    modalToggle (_, {title, content}, {cache}) {
      const prevModal = cache.readQuery({query})

      cache.writeQuery({
        query,
        data: {
          modal: {
            ...prevModal.modal,
            show: !prevModal.modal.show,
            title,
            content,
          }
        }
      })

      return null
    },
  }
}

// Other example.
// modal (_, __, {cache, getCacheKey}) {
//   const id = getCacheKey({__typename: 'Modal', id: MODAL_ID})
//   return cache.readFragment({fragment, id})
// },
