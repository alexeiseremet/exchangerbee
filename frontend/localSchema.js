import {
  ModalType,
  ModalResolvers,
  ModalDefaultState,
} from './features/Modal/graphql'

export const typeDefs = [ModalType]
export const resolvers = [ModalResolvers]
export const defaultState = {...ModalDefaultState}
