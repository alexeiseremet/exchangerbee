import React, { Fragment } from 'react'
import { gql } from 'apollo-boost'
import { graphql } from 'react-apollo'

import { textAdminPage as t } from '../../lib/locale'
import Form from '../Form'
import Input from '../Input'

const AddInstitutionMarkup = ({mutate}) => (
  <Fragment>
    <div className="text">
      <h1>{t.institution}</h1>
    </div>

    <Form
      initialValues={{
        name: '',
        slug: '',
        country: ''
      }}
      onSubmit={institution => {
        mutate({
          variables: {institution}
        })
      }}
    >
      <Input
        name="name"
        id="institution-name"
        type="text"
        labelText="Name"
        required
      />
      <Input
        name="slug"
        id="institution-slug"
        type="text"
        labelText="Slug"
        required
      />
      <Input
        name="country"
        id="institution-country"
        type="text"
        labelText="Country"
        required
      />
    </Form>
  </Fragment>
)

const GQL_CREATE_INSTITUTION = gql`
  mutation CreateInstitution ($institution: CreateInstitutionInput!) {
    createInstitution(institution: $institution) {
      slug,
      country
    }
  }
`

export default graphql(
  GQL_CREATE_INSTITUTION
)(AddInstitutionMarkup)
