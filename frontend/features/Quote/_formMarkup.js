import React from 'react'

import { textAdminPage as t } from '../../lib/locale'
import { inputDate } from '../../lib/moment'
import { SelectInstitution } from '../Institution'
import { SelectCurrency } from '../Currency'
import Form from '../Form'
import Input from '../Input'

const FormMarkup = ({
  quote,
  onSubmit,
  action,
}) => (
    <React.Fragment>
      <div className="text">
        <h1>{t.quote} {action}</h1>
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
          type="date"
          labelText="Updated at"
          required
        />
        <Input
          name="amount"
          id="quote-amount"
          type="text"
          labelText="Amount"
          required
        />
        <Input
          name="bid"
          id="quote-bid"
          type="text"
          labelText="Bid"
          required
        />
        <Input
          name="ask"
          id="quote-ask"
          type="text"
          labelText="Ask"
          required
        />
        <Input
          name="period"
          id="quote-period"
          type="text"
          labelText="Period"
          required
        />
        <Input
          name="error"
          id="quote-error"
          type="text"
          labelText="Has error"
          required
        />
      </Form>
    </React.Fragment>
  );

export default FormMarkup
