import React from 'react';
import Widget from './Widget';

class ConverterWidget extends React.Component {
  state = {
    activeWidget: 'bid',
    bidAmount: '10',
    bidCurrency: this.props.baseCurrency,
    askAmount: '10',
    askCurrency: this.props.baseCurrency,
  };

  componentDidMount() {
    const { defaultAsk, baseCurrenciesArr } = this.props;
    let askValue = defaultAsk;

    if (!baseCurrenciesArr.includes(defaultAsk)) {
      [askValue] = baseCurrenciesArr;
    }

    this.currencyHandler(askValue, 'bid');
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
    const { baseCurrency } = this.props;
    let currency = baseCurrency;

    if (this.props.centralQuote && (baseCurrency.slug !== slug)) {
      [currency] = this.props.centralQuote.filter((quote) => quote.currencyVObj.slug === slug);
    }

    this.setState({
      [`${type}Currency`]: currency,
    });

    this.amountHandler(null, type, currency);
  };

  render() {
    const { centralQuote, baseCurrency, baseCurrenciesArr } = this.props;

    if (!centralQuote || !centralQuote.length) {
      return null;
    }

    return (
      <section className="converter-widget">
        <Widget
          quoteType="bid"
          label="plătesc"
          data={this.state}
          amountHandler={this.amountHandler}
          currencyHandler={this.currencyHandler}
          {... { baseCurrency, baseCurrenciesArr } }
        />

        <Widget
          quoteType="ask"
          label="primesc"
          data={this.state}
          amountHandler={this.amountHandler}
          currencyHandler={this.currencyHandler}
          {... { baseCurrency, baseCurrenciesArr } }
        />
      </section>
    );
  }
}

export default ConverterWidget;
