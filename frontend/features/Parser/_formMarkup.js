import React from 'react';
import { FieldArray } from 'formik';

import { SelectInstitution } from '../Institution';
import { SelectCurrency } from '../Currency';
import Form from '../Form';
import Input from '../Input';
import Select from '../Input/select';
import Button from '../Button';

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
  <>
    <div className="text">
      <h1>
        {'Parser'}
        {' '}
        {action}
      </h1>
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
        ...parser,
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
        component="input"
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
        {({ form, push /* remove */ }) => (
          <>
            {
                form.values.quotes.map((item, index) => (
                  <div className="flex" key={index}>
                    <Input
                      values={form.values}
                      name={`quotes.${index}.amount`}
                      id={`quotes.${index}.amount`}
                      component="input"
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
                      component="input"
                      labelText="XPath Bid"
                      required
                    />
                    <Input
                      values={form.values}
                      name={`quotes.${index}.xPaths.ask`}
                      id={`quotes.${index}.xPaths.ask`}
                      component="input"
                      labelText="XPath Ask"
                      required
                    />
                    <Input
                      values={form.values}
                      name={`quotes.${index}.xPaths.code`}
                      id={`quotes.${index}.xPaths.code`}
                      component="input"
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

          </>
        )}
      </FieldArray>
    </Form>
  </>
);

export default FormMarkup;
