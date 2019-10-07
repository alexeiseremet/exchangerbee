import React from 'react';
import Document, { Head, Main, NextScript } from 'next/document';
import sprite from 'svg-sprite-loader/runtime/sprite.build';

import { siteGtagId } from '../server.config';

export default class ExbeeDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx);
    const spriteContent = sprite.stringify();

    return {
      spriteContent,
      ...initialProps,
    };
  }

  render() {
    return (
      <html prefix="og: http://ogp.me/ns#">
        <Head>
          <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
          <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0" />

          {/* Global site tag (gtag.js) - Google Analytics */}
          <script async src={`https://www.googletagmanager.com/gtag/js?id=${siteGtagId}`}/>
          <script dangerouslySetInnerHTML={{
            __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments)}
            gtag('js', new Date());
            gtag('config', '${siteGtagId}');
          `,
          }} />
        </Head>

        <body itemScope itemType="http://schema.org/WebPage">
          <Main />
          <div id="modal-portal" />
          <div
            className="sprite"
            dangerouslySetInnerHTML={{ __html: this.props.spriteContent }}
            aria-hidden="true"
          />
          <NextScript />
        </body>
      </html>
    );
  }
}
