import './styles.scss';
import React from 'react';
import { Link } from '../../lib/i18n';
import { baseCountry } from '../../server.config';

const MainMenu = ({ items }) => (
  <>
    <Link href="/">
      <a role="brand"
         dangerouslySetInnerHTML={{
           __html: (`Curs valutar (${String(baseCountry.slug).toUpperCase()})`),
         }}
         style={{ display: 'inline-block', marginBottom: '2rem' }}
         title={siteName}
      />
    </Link>

    <nav role="navigation">
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
  </>
);

export default MainMenu;
