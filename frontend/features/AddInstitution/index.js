import React, { Fragment } from 'react'
import { gql } from 'apollo-boost'
import { compose, graphql } from 'react-apollo'

import { textAdminPage as t } from '../../lib/locale'
import Form from '../Form'
import Input from '../Input'

const AddInstitutionMarkup = ({onSubmit}) => (
  <Fragment>
    <div className="text">
      <h1>{t.institution}</h1>
    </div>

    <Form
      initialValues={{
        name: '',
        slug: '',
      }}
      onSubmit={onSubmit}
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
    </Form>
  </Fragment>
)

// Container.
const GQL_CREATE_INSTITUTION = gql`
  mutation CreateInstitution ($institution: InstitutionInput!) {
    createInstitution(institution: $institution) {
      slug
    }
  }
`

export default compose(
  graphql(
    GQL_CREATE_INSTITUTION,
    {
      props: ({mutate}) => ({
        onSubmit: (
          institution,
          // form actions
          {
            setStatus,
            setSubmitting,
            resetForm
          }
        ) => {
          mutate({
            variables: {institution}
          })
            .then(({createInstitution}) => {
              resetForm()
              console.log(createInstitution)
            })
            .catch(err => {
              setStatus('error')
              setSubmitting(false)
              console.error(err)
            })
        }
      })
    }
  )
)(AddInstitutionMarkup)
