import React from 'react'
import { gql } from 'apollo-boost'
import { compose, graphql } from 'react-apollo'
import { FieldArray } from 'formik'

import { textAdminPage as t } from '../../lib/locale'
import Form from '../Form'
import Input from '../Input'
import Button from '../Button'

const emptyQuote = {
  amount: '',
  currency: '',
  xPaths: {
    ask: '',
    bid: '',
    code: '',
  },
}

export const CreateParserForm = ({onSubmit, parser = null, action}) => (
  <React.Fragment>
    <div className="text">
      <h1>{t.parser}</h1>
    </div>

    <Form
      initialValues={{
        institution: '',
        url: '',
        period: '',
        quotes: [emptyQuote],
        ...parser
      }}
      onSubmit={onSubmit}
    >
      <Input
        name="institution"
        id="parser-institution"
        type="text"
        labelText="Institution"
        required
      />
      <Input
        name="url"
        id="parser-url"
        type="text"
        labelText="URL"
        required
      />
      <Input
        name="period"
        id="parser-period"
        type="text"
        labelText="Period"
        required
      />
      <FieldArray
        name="quotes"
      >
        {({form, push, remove}) => (
          <React.Fragment>
            {
              form.values.quotes.map((item, index) => (
                <div className="flex" key={index}>
                  <Input
                    values={form.values}
                    name={`quotes.${index}.amount`}
                    id={`quotes.${index}.amount`}
                    type="text"
                    labelText="Amount"
                    required
                  />
                  <Input
                    values={form.values}
                    name={`quotes.${index}.currency`}
                    id={`quotes.${index}.currency`}
                    type="text"
                    labelText="Currency"
                    required
                  />
                  <Input
                    values={form.values}
                    name={`quotes.${index}.xPaths.bid`}
                    id={`quotes.${index}.xPaths.bid`}
                    type="text"
                    labelText="XPath Bid"
                    required
                  />
                  <Input
                    values={form.values}
                    name={`quotes.${index}.xPaths.ask`}
                    id={`quotes.${index}.xPaths.ask`}
                    type="text"
                    labelText="XPath Ask"
                    required
                  />
                  <Input
                    values={form.values}
                    name={`quotes.${index}.xPaths.code`}
                    id={`quotes.${index}.xPaths.code`}
                    type="text"
                    labelText="XPath Code"
                    required
                  />
                </div>
              ))
            }
            <Button
              type="button"
              labelText="Add new currency"
              onClick={() => push(emptyQuote)}
            />

          </React.Fragment>
        )}
      </FieldArray>
    </Form>
  </React.Fragment>
)

// Container.
const GQL_CREATE_PARSER = gql`
  mutation CreateParser ($parser: ParserInput!) {
    createParser(parser: $parser) {
      url
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
          parser,
          {setStatus, setSubmitting}
        ) => {
          mutate({
            variables: {parser}
          })
            .then(({data: {createCurrency}}) => {
              console.log(createCurrency)
            })
            .catch(err => {
              setStatus('error')
              setSubmitting(false)
              console.error(err)
            })
        }
      }),
    }
  )
)(CreateParserForm)
