import React from 'react'
import { gql } from 'apollo-boost'
import { compose, graphql } from 'react-apollo'

import SelectReference from '../SelectReference'

const SelectCurrency = ({
  allCurrency,
  name,
  id,
  readOnly,
  required,
  setFieldValue
}) => (
    <SelectReference
      items={allCurrency}
      id={id}
      name={name}
      required={required}
      readOnly={readOnly}
      setFieldValue={setFieldValue}
      labelText="Currency"
    />
  )


// Container.
const GQL_ALL_CURRENCY = gql`
  query AllCurrency {
    allCurrency {
      id
      slug
      name
    }
  }
`;

export default compose(
  graphql(
    GQL_ALL_CURRENCY,
    {
      props: ({ data: { allCurrency } }) => ({
        allCurrency
      })
    }
  )
)(SelectCurrency)
