import './styles.scss';
import React from 'react';
import InputValue from './InputValue';

class ConverterCard extends React.Component {
  isCardActive = () => {
    const { quote, payCurrencySlug } = this.props;

    return (
      quote.slug === payCurrencySlug
    );
  };

  handlerCardSelect = () => {
    const { selectCurrency, quote } = this.props;
    selectCurrency(quote.slug);
  };

  render() {
    const { baseAmount, quote, handlerCurrencyChange } = this.props;
    const resultValue = Number(baseAmount / quote.bid).toFixed(2);
    const isActive = this.isCardActive();

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
                      handlerCurrencyChange({
                        value: target.currentTarget.value,
                        bid: quote.bid,
                      });
                    }}
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
