import './styles.scss';
import React from 'react';
import { Link } from '../../lib/i18n';
import { country } from '../../server.config';

const menu = [
  // { url: '/converter', label: 'Convertor valutar' },
  { url: '/banks', label: 'Cursul la bănci' },
  { url: '/currencies', label: 'Lista valute' },
  { url: '/parsers', label: 'Parsers' },
  { url: '/quotes', label: 'Quotes' },
  { url: '/posts', label: 'Posts' },
  { url: '/admin', label: 'Admin' },
];

const MainMenu = () => (
  <>
    <Link href="/">
      <a role="brand" style={{ display: 'inline-block', marginBottom: '2rem' }}>
        {country}
      </a>
    </Link>

    <nav role="navigation">
      <ul className="main-memu">
        {
          menu.map((item, i) => (
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
  </>
);

export default MainMenu;
