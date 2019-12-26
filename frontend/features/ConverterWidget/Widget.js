import './styles.scss';
import React from 'react';
import classnames from 'classnames';
import { baseCurrency, baseCurrenciesArr } from '../../server.config';
import Input from './Input';

class Widget extends React.Component {
  state = {
    inputIsActive: false,
  };

  setInputActive = (bool) => {
    this.setState({ inputIsActive: bool });
  };

  onInputChange = (value) => {
    const { amountHandler, type } = this.props;
    amountHandler(value, type);
  };

  render() {
    const { data, label, type } = this.props;
    const [currency, amount] = [data[`${type}Currency`], data[`${type}Amount`]];
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
                  <Input type={type}
                         defaultValue={amount}
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

            <div style={{ overflowX: 'auto', overflowY: 'hidden' }}>
              <div className="flex flex--fit">
                <button type="button"
                        className={btnClasses(baseCurrency.slug)}
                        onClick={() => this.props.currencyHandler(baseCurrency.slug, type)}
                >
                  {baseCurrency.slug}
                </button>

                {
                  baseCurrenciesArr.map((slug, i) => (
                    <button key={i} type="button"
                            onClick={() => this.props.currencyHandler(slug, type)}
                            className={btnClasses(slug)}
                    >
                      {slug}
                    </button>
                  ))
                }

                <button type="button" hidden="true" className={btnClasses(null, 'more')}>
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
