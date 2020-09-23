import React from 'react';
import Head from 'next/head';
import {
  host, locale, siteName, baseCountry,
} from '../../server.config';

/**
 * Component to render Metadata.
 *
 * @param {string} title Page title.
 * @param {string} url Page canonical url.
 * @param {string} description Page description.
 * @param {string} keywords Page keywords.
 * @param {boolean} noindex Page noindex.
 * @param {string} ogDescription OpenGraph description.
 * @param {string} ogImage OpenGraph Image.
 */
export default ({
  title, url, ogDescription, noindex,
  description, keywords, ogImage,

}) => {
  const newUrl = url ? `${host}${url}` : host;

  return (
    <Head>
      <title>{title}</title>
      <link rel="canonical" href={newUrl} />
      {description && <meta name="description" content={description} />}
      {keywords && <meta name="keywords" content={keywords} />}
      {noindex && <meta name="robots" content="noindex, nofollow" />}

      {/* Open Graph properties */}
      {ogImage && <meta property="og:image" content={ogImage} />}
      {ogDescription && <meta property="og:description" content={ogDescription || description} />}
      <meta property="og:title" content={title} />
      <meta property="og:url" content={newUrl} />
      <meta property="og:locale" content={locale} />
      <meta property="og:site_name" content={siteName} />
      <meta property="og:type" content="website" />

    </Head>
  );
};
