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

        <section className="page__content">
          {children}
        </section>
      </div>
    </div>
  );
};

export default Page;
