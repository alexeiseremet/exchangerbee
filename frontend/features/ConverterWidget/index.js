import React from 'react';
import { gql } from 'apollo-boost';
import { graphql } from 'react-apollo';
import _compose from 'lodash/flowRight';
import { centralBank, baseCurrency, baseCurrenciesArr } from '../../server.config';
import { today } from '../../lib/moment';
import Widget from './Widget';

class ConverterWidget extends React.Component {
  state = {
    activeWidget: 'bid',
    bidAmount: '10',
    bidCurrency: baseCurrency,
    askAmount: '10',
    askCurrency: baseCurrency,
  };

  componentDidMount() {
    let { defaultAsk } = this.props;

    if (!baseCurrenciesArr.includes(defaultAsk)) {
      [defaultAsk] = baseCurrenciesArr;
    }

    this.currencyHandler(defaultAsk, 'bid');
  }

  amountHandler = (value, type, newCurrency) => {
    const {
      activeWidget, bidAmount, bidCurrency, askAmount, askCurrency,
    } = this.state;

    let newBidAmount = value || bidAmount;
    let newAskAmount = value || askAmount;
    const newBidCurrency = newCurrency || bidCurrency;
    const newAskCurrency = newCurrency || askCurrency;

    if ((value && type === 'bid') || (!value && activeWidget === 'bid' && type === 'ask')) {
      newAskAmount = Number((newBidAmount * bidCurrency.bid) / newAskCurrency.ask).toFixed(2);
    }

    if (!value && activeWidget === 'bid' && type === 'bid') {
      newAskAmount = Number((newBidAmount * newBidCurrency.bid) / askCurrency.ask).toFixed(2);
    }

    if ((value && type === 'ask') || (!value && activeWidget === 'ask' && type === 'bid')) {
      newBidAmount = Number((newAskAmount * askCurrency.ask) / newBidCurrency.bid).toFixed(2);
    }

    if (!value && activeWidget === 'ask' && type === 'ask') {
      newBidAmount = Number((newAskAmount * newAskCurrency.ask) / bidCurrency.bid).toFixed(2);
    }

    this.setState({
      ...(value && type ? { activeWidget: type } : null),
      bidAmount: newBidAmount,
      askAmount: newAskAmount,
    });
  };

  currencyHandler = (slug, type) => {
    let currency = baseCurrency;

    if (this.props.allQuote && (baseCurrency.slug !== slug)) {
      [currency] = this.props.allQuote.filter((quote) => quote.currencyVObj.slug === slug);
    }

    this.setState({
      [`${type}Currency`]: currency,
    });

    this.amountHandler(null, type, currency);
  };

  render() {
    const { allQuote } = this.props;

    if (!allQuote || !allQuote.length) {
      return null;
    }

    return (
      <section className="converter-widget">
        <Widget
          type="bid"
          label="plătesc"
          data={this.state}
          amountHandler={this.amountHandler}
          currencyHandler={this.currencyHandler}
          allQuote={allQuote}
        />

        <Widget
          type="ask"
          label="primesc"
          data={this.state}
          amountHandler={this.amountHandler}
          currencyHandler={this.currencyHandler}
          allQuote={allQuote}
        />
      </section>
    );
  }
}

// Container.
const GQL_CONVERTER_WIDGET = gql`
  query ConverterWidget ($where: QuoteWhereInput!) {
    allQuote (where: $where) {
      currencyVObj {
        name
        slug
      }
      amount
      bid
      ask
    }
  }
`;

export default _compose(
  graphql(
    GQL_CONVERTER_WIDGET,
    {
      options: () => ({
        variables: {
          where: {
            institution: { refSlug: centralBank.slug },
            date: [today()],
            error: 'no',
          },
        },
      }),
      props: ({ data: { allQuote } }) => ({
        allQuote,
      }),
    },
  ),
)(ConverterWidget);
