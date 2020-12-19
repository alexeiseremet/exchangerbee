import React from 'react';
import Document, { Head, Main, NextScript } from 'next/document';
import sprite from 'svg-sprite-loader/runtime/sprite.build';

import {
  host, siteGdpr, siteGtagId, siteGads,
} from '../server.config';
import { i18n } from '../lib/i18n';
import script from '../lib/script';

export default class XezoomDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx);
    const spriteContent = sprite.stringify();

    const { lng } = ctx.req ?? i18n;

    return {
      lng,
      spriteContent,
      ...initialProps,
    };
  }

  render() {
    const { lng } = this.props;

    return (
      <html prefix="og: http://ogp.me/ns#" lang={lng}>
        <Head>
          <meta httpEquiv="content-type" content="text/html; charset=utf-8" />
          <meta httpEquiv="x-ua-compatible" content="IE=edge" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <meta name="theme-color" content="#111111" />
          <link rel="manifest" href="/manifest.json" />
          <link rel="apple-touch-icon" href="/static/images/icons/icon-192x192.png" />

          <link href={`${host}/ro`} rel="alternate" hrefLang="ro"/>
          <link href={`${host}/ru`} rel="alternate" hrefLang="ru"/>

          {/* Global site tag (gtag.js) - Google Analytics */}
          {
            !!siteGtagId && (
              <>
                <script src={`//www.googletagmanager.com/gtag/js?id=${siteGtagId}`}
                        async
                />
                <script dangerouslySetInnerHTML={{
                  __html: `
                    window.dataLayer = window.dataLayer || [];
                    function gtag(){dataLayer.push(arguments)}
                    gtag('js', new Date());
                    gtag('config', '${siteGtagId}', { 'anonymize_ip': true });
                  `,
                }}/>
              </>
            )
          }

          {
            !!siteGdpr && (
              <>
                <script src="//config.metomic.io/config.js?id=prj:48fa7355-78a1-42bb-bd23-2d549b346058"
                        crossOrigin="true"
                />
                <script src="//consent-manager.metomic.io/embed.js" crossOrigin="true" />
              </>
            )
          }

          {
            !!siteGads && (
              <script data-ad-client="ca-pub-7297847103287274" async
                      src="//pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"
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
