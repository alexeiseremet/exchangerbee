import React from 'react';
import { gql } from 'apollo-boost';
import { graphql } from 'react-apollo';
import _compose from 'lodash/flowRight';

import excludeKeys from '../../lib/excludeKeys';
import FormMarkup from './_formMarkup';

const UpdateParserForm = ({ onSubmit, parser }) => (
  <FormMarkup
    action="update"
    onSubmit={onSubmit}
    parser={parser}
  />
);

const GQL_UPDATE_PARSER = gql`
  mutation UpdateParser ($id: ID!, $parser: ParserInput!) {
    updateParser(id: $id, parser: $parser) {
      id
    }
  }
`;

export default _compose(
  graphql(
    GQL_UPDATE_PARSER,
    {
      props: ({ mutate, ownProps: { parser } }) => ({
        onSubmit: (
          // form values & actions
          formValues,
          { setStatus, setSubmitting },
        ) => {
          mutate({
            variables: {
              id: parser.id,
              parser: excludeKeys(formValues, ['id', '__typename', 'institution']),
            },
          })
            .then(({ data: { updateParser } }) => {
              // eslint-disable-next-line no-console
              console.dir(updateParser);
            })
            .catch((err) => {
              setStatus('error');
              setSubmitting(false);
              // eslint-disable-next-line no-console
              console.error(err);
            });
        },
      }),
      options: {
        refetchQueries: [
          'AllParser',
        ],
      },
    },
  ),
)(UpdateParserForm);
