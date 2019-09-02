import React from 'react';

import { textAdminPage as t } from '../../lib/locale';
import { inputDate } from '../../lib/moment';
import { SelectInstitution } from '../Institution';
import { SelectCurrency } from '../Currency';
import Form from '../Form';
import Input from '../Input';

const FormMarkup = ({
  quote,
  onSubmit,
  action,
}) => (
  <>
    <div className="text">
      <h1>
        {t.quote}
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
        currency: {
          refId: '',
          refSlug: '',
        },
        amount: '1',
        bid: '',
        ask: '',
        period: 'daily',
        error: 'no',
        ...quote,
        date: quote ? inputDate(quote.date) : inputDate(),
      }}
      onSubmit={onSubmit}
    >
      <SelectInstitution
        name="institution"
        id="quote-institution"
        required
      />
      <SelectCurrency
        name="currency"
        id="quote-currency"
        required
      />
      <Input
        name="date"
        id="quote-date"
        component="input"
        type="date"
        labelText="Updated at"
        required
      />
      <Input
        name="amount"
        id="quote-amount"
        component="input"
        labelText="Amount"
        required
      />
      <Input
        name="bid"
        id="quote-bid"
        component="input"
        labelText="Bid"
        required
      />
      <Input
        name="ask"
        id="quote-ask"
        component="input"
        labelText="Ask"
        required
      />
      <Input
        name="period"
        id="quote-period"
        component="input"
        labelText="Period"
        required
      />
      <Input
        name="error"
        id="quote-error"
        component="input"
        labelText="Has error"
        required
      />
    </Form>
  </>
);

export default FormMarkup;
