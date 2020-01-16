import React from 'react';
import Document, { Head, Main, NextScript } from 'next/document';
import sprite from 'svg-sprite-loader/runtime/sprite.build';

import { gdpr, siteGtagId, locale } from '../server.config';
import script from '../lib/script';

export default class XezoomDocument extends Document {
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
      <html prefix="og: http://ogp.me/ns#" lang={locale}>
        <Head>
          <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <meta name="theme-color" content="#111111" />
          <link rel="manifest" href="/ro/manifest.json" />
          <link rel="apple-touch-icon" href="/static/images/icons/icon-192x192.png" />

          {/* Global site tag (gtag.js) - Google Analytics */}
          {
            process.env.NODE_ENV === 'production' && (
              <>
                <script data-cookieconsent="ignore"
                        async
                        src={`//www.googletagmanager.com/gtag/js?id=${siteGtagId}`}
                />
                <script data-cookieconsent="ignore" dangerouslySetInnerHTML={{
                  __html: `
                    window.dataLayer = window.dataLayer || [];
                    function gtag(){dataLayer.push(arguments)}
                    gtag('js', new Date());
                    gtag('config', '${siteGtagId}');
                  `,
                }}/>
              </>
            )
          }

          {
            process.env.NODE_ENV === 'production' && gdpr && (
              <script id="Cookiebot"
                      src="//consent.cookiebot.com/uc.js"
                      data-cbid="9d78ff36-0af6-463e-b7e3-67642678e2cd"
                      data-blockingmode="auto"
                      data-culture={String(locale).toUpperCase()}
              />
            )
          }
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
