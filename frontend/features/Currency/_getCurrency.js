import React from 'react'
import { gql } from 'apollo-boost'
import { graphql } from 'react-apollo'
import _compose from 'lodash/flowRight'

import Loading from '../Loading'

const GetCurrency = ({ currency }) => {
  return currency ? <div>{currency.name}</div> : <Loading/>
};

// Container.
const GQL_CURRENCY = gql`
  query GetCurrency ($slug: String!) {
    currency(slug: $slug) {
      name
      numCode
      symbol
    }
  }
`;

export default _compose(
  graphql(
    GQL_CURRENCY,
    {
      options: ({ slug }) => {
        return ({
          variables: {
            slug
          },
        })
      },
      props: ({ data: { currency } }) => ({
        currency
      })
    }
  )
)(GetCurrency)
