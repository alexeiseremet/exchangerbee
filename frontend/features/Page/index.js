import './styles.scss';
import React from 'react';
import classnames from 'classnames';
import { siteMenu, adminMenu } from '../../server.config';

import MainMenu from '../MainMenu';

const renderTop = (type) => (
  <MainMenu items={type === 'admin' ? adminMenu : siteMenu}/>
);

const Page = ({
  children, top = true, type, heading,
}) => {
  const classes = classnames(
    'page',
    {
      'page--has-top': top,
    },
  );

  return (
    <div className={classes}>
      <div className="page__inner">
        {
          top && (
            <section className="page__top">
              {renderTop(type)}
            </section>
          )
        }

        <main className="page__content">
          {
            heading && (
              <div className="page-heading">
                <h1 dangerouslySetInnerHTML={{ __html: heading }}/>
              </div>
            )
          }

          {children}
        </main>
      </div>
    </div>
  );
};

export default Page;
