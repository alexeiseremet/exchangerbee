import './styles.scss';
import React from 'react';
import classnames from 'classnames';

const Page = ({
  children, heading,
}) => {
  const classes = classnames(
    'page',
  );

  return (
    <div className={classes}>
      <div className="page__inner">
        {
          <section className="page__top">
            {
              heading && (
                <div className="page-heading">
                  <h1 dangerouslySetInnerHTML={{ __html: heading }}/>
                </div>
              )
            }
          </section>
        }

        <main className="page__content">
          {children}
        </main>
      </div>
    </div>
  );
};

export default Page;
