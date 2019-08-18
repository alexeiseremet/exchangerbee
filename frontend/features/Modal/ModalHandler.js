import './styles.scss';
import React from 'react';
import { gql } from 'apollo-boost'
import { graphql } from 'react-apollo'
import _compose from 'lodash/flowRight'

import Button from '../Button';

const ModalHandlerMarkup = ({ openModal }) => (
  <Button
    onClick={openModal}
    labelText="Open modal"
  />
);

// Container.
const GQL_OPEN_MODAL = gql`
  mutation OpenModal($title: title, $content: content) {
    modalToggle(title: $title, content: $content) @client
  }
`;

export default _compose(
  graphql(
    GQL_OPEN_MODAL,
    {
      props: ({ mutate, ownProps: { title, content } }) => ({
        openModal: () => mutate({
          variables: {
            title,
            content,
          },
        }),
      }),
    }
  ),
)(ModalHandlerMarkup);

