import './styles.scss';
import React from 'react';
import { Link, withTranslation } from '../../lib/i18n';
import { getTranslatedConfig } from '../../server.config';
import Svg from '../Svg';
// eslint-disable-next-line
import iconClose from '../../assets/images/logo.svg?sprite';

const MainMenu = (props) => {
  const { type, t } = props;
  const {
    siteName, siteMenu, adminMenu, baseCountry,
  } = getTranslatedConfig(t);
  const items = type === 'admin' ? adminMenu : siteMenu;

  return (
    <div className="header">
      <div className="header__inner">
        <div className="header__brand">
          <Link href="/">
            <a className="brand" title={siteName}>
              <Svg glyph={iconClose.id} />
              <span className="brand__slag">
                {`(${baseCountry.slug}) ${siteName}`}
              </span>
            </a>
          </Link>
        </div>

        <nav className="header__menu" role="navigation">
          <ul className="main-memu">
            {
              items.map((item) => (
                <li className="main-memu__item" key={item.url}>
                  {
                    item.url.startsWith('//') ? (
                      <a href={item.url} className="main-memu__link" target="_blank" rel="noopener noreferrer">
                        {item.label}
                      </a>
                    ) : (
                      <Link href={item.url}>
                        <a className="main-memu__link">
                          {item.label}
                        </a>
                      </Link>
                    )
                  }
                </li>
              ))
            }
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default withTranslation()(MainMenu);
