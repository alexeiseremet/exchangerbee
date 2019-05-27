import React from 'react'
import { gql } from 'apollo-boost'
import { compose, graphql } from 'react-apollo'

import excludeKeys from '../../lib/excludeKeys'
import FormMarkup from './_formMarkup'

const UpdateParserForm = ({onSubmit, parser}) => (
  <FormMarkup
    action={'update'}
    onSubmit={onSubmit}
    parser={parser}
  />
)

const GQL_UPDATE_PARSER = gql`
  mutation UpdateParser ($id: ID!, $parser: ParserInput!) {
    updateParser(id: $id, parser: $parser) {
      institution
      period
    }
  }
`


export default compose(
  graphql(
    GQL_UPDATE_PARSER,
    {
      props: ({mutate, ownProps: {parser}}) => ({
        onSubmit: (
          // form values & actions
          formValues,
          {setStatus, setSubmitting}
        ) => {
          mutate({
            variables: {
              id: parser.id,
              parser: excludeKeys(formValues, ['id', '__typename']),
            }
          })
            .then(({data: {updateParser}}) => {
              console.dir(updateParser)
            })
            .catch(err => {
              setStatus('error')
              setSubmitting(false)
              console.error(err)
            })
        }
      }),
      options: {
        refetchQueries: [
          'AllParser',
        ],
      },
    }
  )
)(UpdateParserForm)
