import './styles.scss'
import React from 'react'
import { gql } from 'apollo-boost'
import { compose, graphql } from 'react-apollo'

import Button from '../Button'

const AnyTypeContent = (
  <button style={{color: 'red'}} onClick={() => alert('hi')}>
    Any type content
  </button>
)

const ModalHandlerMarkup = ({openModal}) => (
  <Button
    onClick={() => openModal({
      title: 'Any title',
      content: AnyTypeContent
    })}
    labelText="Open modal"
  />
)

// Container.
const GQL_OPEN_MODAL = gql`
  mutation OpenModal($title: title, $content: content) {
    modalToggle(title: $title, content: $content) @client
  }
`

export default compose(
  graphql(
    GQL_OPEN_MODAL,
    {
      props: ({mutate}) => ({
        openModal: ({title, content}) => mutate({
          variables: {
            title,
            content
          }
        })
      })
    }
  ),
)(ModalHandlerMarkup)

