import React from 'react'
import { gql } from 'apollo-boost'
import { compose, graphql } from 'react-apollo'
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

export default compose(
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
