import React from 'react'
import { FieldArray } from 'formik'

import { textAdminPage as t } from '../../lib/locale'
import { SelectInstitution } from '../Institution'
import { SelectCurrency } from '../Currency'
import Form from '../Form'
import Input from '../Input'
import Select from '../Input/select'
import Button from '../Button'

const emptyQuote = {
  amount: '1',
  currency: {
    refId: '',
    refSlug: '',
  },
  xPaths: {
    ask: '',
    bid: '',
    code: '',
  },
};

const FormMarkup = ({
  parser = null,
  onSubmit,
  action,
}) => (
    <React.Fragment>
      <div className="text">
        <h1>{t.parser} {action}</h1>
      </div>

      <Form
        initialValues={{
          institution: {
            refId: '',
            refSlug: '',
          },
          url: '',
          period: 'daily',
          quotes: [emptyQuote],
          ...parser
        }}
        onSubmit={onSubmit}
      >
        <SelectInstitution
          name="institution"
          id="parser-institution"
          readOnly={action === 'update'}
          required
        />
        <Input
          name="url"
          id="parser-url"
          type="text"
          labelText="URL"
          required
        />
        <Select
          name="period"
          id="parser-period"
          labelText="Period"
          required
        >
          <option value="daily">daily</option>
          <option value="monthly">monthly</option>
        </Select>
        <FieldArray
          name="quotes"
        >
          {({ form, push, remove }) => (
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
                    <SelectCurrency
                      name={`quotes.${index}.currency`}
                      id={`quotes.${index}.currency`}
                      readOnly={action === 'update'}
                      setFieldValue={form.setFieldValue}
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
  );

export default FormMarkup
