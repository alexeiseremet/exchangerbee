import React from 'react';
import { isUserLogged } from './session';
import redirect from './redirect';


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
     * @returns pageProps Props for page.
     */
    static getInitialProps(ctx) {
      const pageProps = Page.getInitialProps && Page.getInitialProps(ctx);
      const isLogged = isUserLogged(ctx.req);

      // Redirect if not logged.
      if (!isLogged) {
        const { lng } = ctx.req || ctx.query;
        redirect(`/${lng}/admin/login`, ctx);
      }

      return pageProps;
    }

    render() {
      return <Page {...this.props} />;
    }
  }
);
