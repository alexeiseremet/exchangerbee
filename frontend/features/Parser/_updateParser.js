import React from 'react'
import { gql } from 'apollo-boost'
import { compose, graphql } from 'react-apollo'
import {
  omit as _omit,
  unset as _unset,
  isArray as _isArray,
  isObject as _isObject,
  isPlainObject as _isPlainObject,
  mapValues as _mapValues,
} from 'lodash'

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

const excludeKeys = obj => {
  const unsetValues = ['id', '__typename']

  const mapValuesDeep = obj => {
    if (_isArray(obj)) {
      return obj.map(innerObj => {
        const clearedObj = _omit(innerObj, unsetValues)
        return mapValuesDeep(clearedObj)
      });
    }

    if (_isObject(obj)) {
      return _mapValues(obj, val => {
        const clearedVal = _isPlainObject(val) ? _omit(val, unsetValues) : val

        return mapValuesDeep(clearedVal)
      })
    }

    return obj
  }

  const clearedObj = _omit(obj, unsetValues)

  return mapValuesDeep(clearedObj)
}

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
              parser: excludeKeys(formValues),
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
