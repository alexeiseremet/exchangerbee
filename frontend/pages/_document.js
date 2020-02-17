import React from 'react';
import Document, { Head, Main, NextScript } from 'next/document';
import sprite from 'svg-sprite-loader/runtime/sprite.build';

import { i18n } from '../lib/i18n';
import { siteGdpr, siteGtagId, siteGads } from '../server.config';
import script from '../lib/script';

export default class XezoomDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx);
    const spriteContent = sprite.stringify();

    const { lng } = ctx.req ? ctx.req : i18n;

    return {
      lng,
      spriteContent,
      ...initialProps,
    };
  }

  render() {
    return (
      <html prefix="og: http://ogp.me/ns#" lang={this.props.lng}>
        <Head>
          <meta httpEquiv="content-type" content="text/html; charset=utf-8" />
          <meta httpEquiv="x-ua-compatible" content="IE=edge" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <meta name="theme-color" content="#111111" />
          <link rel="manifest" href="/manifest.json" />
          <link rel="apple-touch-icon" href="/static/images/icons/icon-192x192.png" />

          {/* Global site tag (gtag.js) - Google Analytics */}
          {
            siteGtagId && (
              <>
                <script data-cookieconsent="ignore"
                        async
                        src={`https://www.googletagmanager.com/gtag/js?id=${siteGtagId}`}
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
            siteGdpr && (
              <script id="Cookiebot"
                      src="https://consent.cookiebot.com/uc.js"
                      data-cbid="9d78ff36-0af6-463e-b7e3-67642678e2cd"
                      data-blockingmode="auto"
                      data-culture={String(this.props.lng).toUpperCase()}
              />
            )
          }

          {
            siteGads && (
              <script data-ad-client="ca-pub-7297847103287274" async
                      src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"
              />
            )
          }
        </Head>

        <body itemScope itemType="https://schema.org/WebPage">
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
