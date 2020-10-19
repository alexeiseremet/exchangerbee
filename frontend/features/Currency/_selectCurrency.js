import React from 'react';
import { gql } from 'apollo-boost';
import { graphql } from 'react-apollo';
import _compose from 'lodash/flowRight';

import SelectReference from '../SelectReference';

const SelectCurrency = ({
  allCurrency,
  name,
  id,
  readOnly,
  required,
  setFieldValue,
  labelText = 'Currency',
}) => (
  <SelectReference
    items={allCurrency}
    id={id}
    name={name}
    required={required}
    readOnly={readOnly}
    setFieldValue={setFieldValue}
    labelText={labelText}
  />
);

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

export default _compose(
  graphql(
    GQL_ALL_CURRENCY,
    {
      props: ({ data: { allCurrency } }) => ({
        allCurrency,
      }),
    },
  ),
)(SelectCurrency);
