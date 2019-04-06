import React from 'react'
import Head from 'next/head'
import { host, locale } from 'Root/server.config'
import { textMetadata as t } from 'Lib/locale'

/**
 * Component to render Metadata.
 *
 * @param {string} title Page title.
 * @param {string} url Page canonical url.
 * @param {string} description Page description.
 * @param {string} keywords Page keywords.
 * @param {string} ogDescription OpenGraph description.
 * @param {string} ogImage OpenGraph Image.
 */
export default (
  {
    title, url, ogDescription,
    description, keywords, ogImage
  }
) => {
  url = url ? `${host}/${url}` : host

  if (!ogDescription && description) {
    ogDescription = description
  }

  return (
    <Head>
      <title>{title}</title>
      <link rel="canonical" href={url}/>
      {description && <meta name="description" content={description}/>}
      {keywords && <meta name="keywords" content={keywords}/>}

      {/* Open Graph properties */}
      {ogImage && <meta property="og:image" content={ogImage}/>}
      {ogDescription && <meta property="og:description" content={ogDescription}/>}
      <meta property="og:title" content={title}/>
      <meta property="og:url" content={url}/>
      <meta property="og:locale" content={locale}/>
      <meta property="og:site_name" content={t.siteName}/>
      <meta property="og:type" content="website"/>
    </Head>
  )
}
