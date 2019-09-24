import './styles.scss';
import React from 'react';
import classnames from 'classnames';
import { siteMenu, adminMenu } from '../../server.config';

import MainMenu from '../MainMenu';

const renderSidebar = (type) => (
  <MainMenu items={type === 'admin' ? adminMenu : siteMenu}/>
);

const Page = ({
  children, top, type, aside = true,
}) => {
  const classes = classnames(
    'page',
    {
      'page--has-top': top,
      'page--no-aside': !aside,
    },
  );

  return (
    <div className={classes}>
      <div className="page__inner">
        {
          top && (
            <section className="page__top">
              {top}
            </section>
          )
        }

        <main className="page__content">
          {children}
        </main>

        {
          aside && (
            <aside className="page__aside">
              {renderSidebar(type)}
            </aside>
          )
        }
      </div>
    </div>
  );
};

export default Page;
