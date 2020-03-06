import './styles.scss';
import React from 'react';
import classnames from 'classnames';
import Input from './Input';

class Widget extends React.Component {
  state = {
    inputIsActive: false,
  };

  setInputActive = (bool) => {
    this.setState({ inputIsActive: bool });
  };

  onInputChange = (value) => {
    const { amountHandler, quoteType } = this.props;
    amountHandler(value, quoteType);
  };

  render() {
    const {
      data, label, quoteType, baseCurrency, baseCurrenciesArr,
    } = this.props;
    const [currency, amount] = [data[`${quoteType}Currency`], data[`${quoteType}Amount`]];
    const currencySlug = currency.slug || currency.currencyVObj.slug;

    const btnClasses = (slug, mod) => classnames(
      'converter__currency-btn',
      {
        'is-active': currencySlug === slug,
        [`converter__currency-btn--${mod}`]: mod,
      },
    );

    return (
      <>
        <div className="converter">
          <div className="converter__inner">
            <div className="converter__label">
              {label}
            </div>

            {
              currencySlug !== baseCurrency.slug && (
                <div className="converter__rate">
                  {`${currencySlug}/${baseCurrency.slug} = ${currency.ask}`}
                </div>
              )
            }

            {
              this.state.inputIsActive
                ? (
                  <Input defaultValue={amount}
                         onInputChange={this.onInputChange}
                         onInputBlur={this.setInputActive}
                         className="converter__input"
                  />
                )
                : (
                  <div onClick={() => this.setInputActive(true)}
                       className="converter__input"
                  >
                    {amount}
                  </div>
                )
            }

            <div style={{ overflowX: 'auto', overflowY: 'hidden', WebkitOverflowScrolling: 'touch' }}>
              <div className="flex flex--fit">
                <button type="button"
                        className={btnClasses(baseCurrency.slug)}
                        onClick={() => this.props.currencyHandler(baseCurrency.slug, quoteType)}
                >
                  {baseCurrency.slug}
                </button>

                {
                  baseCurrenciesArr.map((slug, i) => (
                    <button key={i} type="button"
                            onClick={() => this.props.currencyHandler(slug, quoteType)}
                            className={btnClasses(slug)}
                    >
                      {slug}
                    </button>
                  ))
                }

                <button type="button" style={{ display: 'none' }}
                        className={btnClasses(null, 'more')}
                >
                  ...
                </button>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default Widget;
