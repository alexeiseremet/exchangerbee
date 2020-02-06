import './styles.scss';
import React from 'react';
import { Link } from '../../lib/i18n';
import {
  siteName, siteMenu, adminMenu, baseCountry,
} from '../../server.config';
import Svg from '../Svg';
// eslint-disable-next-line
import iconClose from '../../assets/images/logo.svg?sprite';

const MainMenu = ({ type }) => {
  const items = type === 'admin' ? adminMenu : siteMenu;

  return (
    <div className="header">
      <div className="header__inner">
        <div className="header__brand">
          <Link href="/">
            <a className="brand" title={siteName}>
              <Svg glyph={iconClose.id} />
              <span className="brand__slag">
                {`(${String(baseCountry.slug).toUpperCase()}) Curs valutar`}
              </span>
            </a>
          </Link>
        </div>

        <nav className="header__menu" role="navigation">
          <ul className="main-memu">
            {
              items.map((item, i) => (
                <li className="main-memu__item" key={i}>
                  <Link href={item.url}>
                    <a className="main-memu__link">
                      {item.label}
                    </a>
                  </Link>
                </li>
              ))
            }
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default MainMenu;
