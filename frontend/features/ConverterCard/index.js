import './styles.scss';
import React from 'react';
import InputValue from './InputValue';

class ConverterCard extends React.Component {
  payValue = 100;

  handlerCardSelect = () => {
    const { selectCurrency, quote } = this.props;
    selectCurrency(quote.slug);
  };

  resetCard = () => {
    this.props.selectCurrency(null);
  };

  componentDidMount() {
    const { quote, currencyChange, payCurrencySlug } = this.props;

    if (quote.slug === payCurrencySlug) {
      currencyChange({
        payValue: this.payValue,
        bid: quote.bid,
      });
    }
  }

  render() {
    const {
      baseAmount, quote, currencyChange, selectedCurrencySlug,
    } = this.props;
    const resultValue = Number(baseAmount / quote.bid).toFixed(2);
    const isActive = quote.slug === selectedCurrencySlug;

    return (
      <button
        onClick={this.handlerCardSelect}
        className="converter-card"
      >
        <div className={`converter-card__inner ${isActive ? 'is-active' : ''}`}>
          <h3 className="converter-card__label">{quote.name}</h3>
          <div className="converter-card__value-wrapper">
            {
              isActive
                ? (
                  <InputValue
                    defaultValue={resultValue}
                    onChange={(target) => {
                      currencyChange({
                        payValue: target.currentTarget.value,
                        bid: quote.bid,
                      });
                    }}
                    resetCard={this.resetCard}
                    className="converter-card__input"
                  />
                )
                : (
                  <span className="converter-card__value">{resultValue}</span>
                )
            }
            <span className="converter-card__slug">{quote.slug}</span>
          </div>
        </div>
      </button>
    );
  }
}

export default ConverterCard;
