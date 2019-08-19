import React from 'react'
import jwtoken from 'jsonwebtoken'
import { getCookie, AUTH_COOKIE_NAME, AUTH_SECRET } from '../lib/session'
import redirect from '../lib/redirect'

/**
 * Higher Order Component that used to protect routes (pages). That'll check
 * if the user is logged in before proceeding. And if the user is not logged in,
 * then it'll redirect user to the login or main page.
 *
 * @param Page React Component from /pages folder.
 */
export default (Page) => (
  class SecurePage extends React.Component {
    /**
     * getInitialProps is an async function. In nextJs it always runs at the server,
     * if the page is called using Link then it is only called at the client side.
     * https://github.com/zeit/next.js/#fetching-data-and-component-lifecycle.
     *
     * @param ctx More about this param https://github.com/zeit/next.js/#fetching-data-and-component-lifecycle.
     * @returns {pageProps} Props for page.
     */
    static getInitialProps (ctx) {
      const userJwt = getCookie(AUTH_COOKIE_NAME, ctx.req);
      const isLoginPage = ctx.asPath.startsWith('/admin');
      const pageProps = Page.getInitialProps && Page.getInitialProps(ctx);
      let isLogged = false;

      try {
        isLogged = !!userJwt && jwtoken.verify(userJwt, AUTH_SECRET)
      } catch (err) {
        console.error(err)
      }

      // Redirect if not logged and isn't login page.
      if (!isLogged && !isLoginPage) redirect('/admin', ctx);

      // Redirect if logged and is login page.
      if (isLogged && isLoginPage) redirect('/', ctx);

      return pageProps
    }

    render () {
      return <Page {...this.props} />
    }
  }
)
