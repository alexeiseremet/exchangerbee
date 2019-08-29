import './styles.scss'
import React from 'react'
import classnames from 'classnames'
import MainMenu from '../MainMenu'


const DefaultSidebar = (
  <React.Fragment>
    <MainMenu/>
  </React.Fragment>
);

const Page = ({ children, top, aside = DefaultSidebar }) => {
  const classes = classnames(
    'page',
    {
      'page--has-top': top,
      'page--no-aside': aside === null
    }
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
              {aside}
            </aside>
          )
        }
      </div>
    </div>
  )
};

export default Page
