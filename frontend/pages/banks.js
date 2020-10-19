import React from 'react';
import { gql } from 'apollo-boost';
import { graphql } from 'react-apollo';
import _compose from 'lodash/flowRight';

import { getTranslatedConfig } from '../server.config';
import { withTranslation } from '../lib/i18n';

import Layout from '../features/Layout';
import Page from '../features/Page';
import BankCard from '../features/BankCard';

const BanksPageMarkup = (props) => {
  const { t, allInstitution, fullPath } = props;
  const { baseCountry } = getTranslatedConfig(t);
  const [tBCN, tBCS] = [baseCountry.name, baseCountry.slug];

  return (
    <Layout metadata={{
      url: `${fullPath}`,
      title: `${t('Lista bănci')} — ${tBCN} (${tBCS})`,
      description: `${t('✅ Cursul valutar afişat la băncile din {{tBCN}} pentru azi', { tBCN })}.`,
    }}>
      <Page
        heading={`(${tBCS}) ${tBCN}: ${t('Lista bănci').toLowerCase()}`}
        breadcrumb={[
          { href: '/', label: t('Curs valutar') },
          { href: null, label: t('Lista bănci') },
        ]}
      >
        {
          allInstitution && (
            <section className="bank-list">
              {
                allInstitution.map((b, i) => <BankCard key={i} bank={b}/>)
              }
            </section>
          )
        }
      </Page>
    </Layout>
  );
};

// getInitialProps.
BanksPageMarkup.getInitialProps = async ({ query, req, asPath }) => {
  const fullPath = req ? `/${req.lng}${asPath}` : asPath;

  return {
    query,
    fullPath,
  };
};

// i18n.
const BanksPageI18N = withTranslation()(BanksPageMarkup);

// Container.
const GQL_ALL_INSTITUTION = gql`
  query AllInstitution {
    allInstitution {
      slug
      name
    }
  }
`;

export default _compose(
  graphql(
    GQL_ALL_INSTITUTION,
    {
      props: ({ data: { allInstitution } }) => ({
        allInstitution,
      }),
    },
  ),
)(BanksPageI18N);
