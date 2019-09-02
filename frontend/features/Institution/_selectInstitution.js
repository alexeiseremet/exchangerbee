import React from 'react';
import { gql } from 'apollo-boost';
import { graphql } from 'react-apollo';
import _compose from 'lodash/flowRight';

import SelectReference from '../SelectReference';

const SelectInstitution = ({
  allInstitution,
  name,
  id,
  readOnly,
  required,
  setFieldValue,
}) => (
  <SelectReference
    items={allInstitution}
    id={id}
    name={name}
    required={required}
    readOnly={readOnly}
    setFieldValue={setFieldValue}
    labelText="Institution"
  />
);

// Container.
const GQL_ALL_INSTITUTION = gql`
  query AllInstitution {
    allInstitution {
      id
      slug
      name
    }
  }
`;

export default _compose(
  graphql(
    GQL_ALL_INSTITUTION,
    {
      props: ({ data: { allInstitution } }) => ({
        allInstitution,
      }),
    },
  ),
)(SelectInstitution);
