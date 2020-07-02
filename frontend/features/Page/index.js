import './styles.scss';
import React from 'react';
import classnames from 'classnames';
import Breadcrumb from '../Breadcrumb';

const Page = ({ children, heading, breadcrumb }) => {
  const classes = classnames(
    'page',
  );

  return (
    <div className={classes}>
      <div className="page__inner">
        {
          breadcrumb && (
            <div className="page__breadcrumb">
              <Breadcrumb items={breadcrumb}/>
            </div>
          )
        }

        <div className="page__top">
          {
            heading && (
              <div className="page-heading">
                <h1 dangerouslySetInnerHTML={{ __html: heading }}/>
              </div>
            )
          }
        </div>

        <div className="page__content">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Page;
