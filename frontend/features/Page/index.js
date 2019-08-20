import './styles.scss'
import React from 'react'
import classnames from 'classnames'
import { Link } from '../../lib/i18n'
import List from '../List'

const Sidebar = (
  <nav role="navigation">
    <List>
      <li>
        <Link prefetch href='/'>
          <a>Home</a>
        </Link>
      </li>
      <li>
        <Link prefetch href="/banks">
          <a>Banks</a>
        </Link>
      </li>
      <li>
        <Link prefetch href="/currencies">
          <a>Currencies</a>
        </Link>
      </li>
      <li>
        <Link prefetch href="/parsers">
          <a>Parsers</a>
        </Link>
      </li>
      <li>
        <Link prefetch href="/quotes">
          <a>Quotes</a>
        </Link>
      </li>
      <li>
        <Link prefetch href="/posts">
          <a>Posts</a>
        </Link>
      </li>
      <li>
        <Link prefetch href="/admin">
          <a>Admin</a>
        </Link>
      </li>
    </List>
  </nav>
);

const Page = ({children, top, aside = Sidebar}) => {
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
