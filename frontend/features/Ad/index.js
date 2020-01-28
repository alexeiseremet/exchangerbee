import React from 'react';
import { siteGads } from '../../server.config';

export default () => {
  if (!siteGads) {
    return null;
  }

  return (
    <div style={{ margin: '1rem 0', minHeight: '2rem' }} dangerouslySetInnerHTML={{
      __html: `
        <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"></script>
        <ins class="adsbygoogle"
             style="display:block"
             data-ad-client="ca-pub-7297847103287274"
             data-ad-slot="1546820547"
             data-ad-format="auto"
             data-full-width-responsive="true"
        />
        <script>(adsbygoogle = window.adsbygoogle || []).push({});</script>
      `,
    }} />
  );
};
