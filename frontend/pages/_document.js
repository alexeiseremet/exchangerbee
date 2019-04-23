import React from 'react'
import Document, { Head, Main, NextScript } from 'next/document'
import { googleSiteVerification, yandexSiteVerification } from '../server.config'
import sprite from 'svg-sprite-loader/runtime/sprite.build'

export default class ExbeeDocument extends Document {
  static getInitialProps ({renderPage}) {
    const spriteContent = sprite.stringify()
    const pageProps = renderPage()

    return {spriteContent, ...pageProps}
  }

  render () {
    return (
      <html prefix="og: http://ogp.me/ns#">
      <Head>
        <meta httpEquiv="X-UA-Compatible" content="IE=edge"/>
        <meta name='viewport' content='width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0'/>
        <meta name="google-site-verification" content={googleSiteVerification}/>
        <meta name="yandex-verification" content={yandexSiteVerification}/>
        <link href='//fonts.googleapis.com/css?family=Montserrat+Alternates:400,700&amp;subset=cyrillic'
              rel='stylesheet'/>
      </Head>
      <body itemScope itemType={'http://schema.org/WebPage'}>
      <div className="sprite"
           dangerouslySetInnerHTML={{__html: this.props.spriteContent}}
           aria-hidden="true"
      />
      <Main/>
      <div id="modal-portal"/>
      <NextScript/>
      </body>
      </html>
    )
  }
}
