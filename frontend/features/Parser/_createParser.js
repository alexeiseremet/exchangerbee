import React from 'react'
import { gql } from 'apollo-boost'
import { compose, graphql } from 'react-apollo'

import FormMarkup from './_formMarkup'

const CreateParserForm = ({onSubmit}) => (
  <FormMarkup action={'create'} onSubmit={onSubmit}/>
)

const GQL_CREATE_PARSER = gql`
  mutation CreateParser ($parser: ParserInput!) {
    createParser(parser: $parser) {
      institution
      period
    }
  }
`

export default compose(
  graphql(
    GQL_CREATE_PARSER,
    {
      props: ({mutate}) => ({
        onSubmit: (
          // form values & actions
          formValues,
          {setStatus, setSubmitting}
        ) => {
          mutate({
            variables: {parser: formValues}
          })
            .then(({data: {createParser}}) => {
              console.dir(createParser)
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
)(CreateParserForm)
