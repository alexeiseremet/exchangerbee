import React from 'react'
import { gql } from 'apollo-boost'
import { graphql } from 'react-apollo'
import _compose from 'lodash/flowRight'

import Loading from '../Loading';

const GetInstitution = ({ institution }) => {
  return institution ? <div>{institution.name}</div> : <Loading/>
};

// Container.
const GQL_INSTITUTION = gql`
  query GetInstitution ($slug: String!) {
    institution(slug: $slug) {
      name
      logo
    }
  }
`;

export default _compose(
  graphql(
    GQL_INSTITUTION,
    {
      options: ({ slug }) => {
        return ({
          variables: {
            slug
          },
        })
      },
      props: ({ data: { institution } }) => ({
        institution
      })
    }
  )
)(GetInstitution)
