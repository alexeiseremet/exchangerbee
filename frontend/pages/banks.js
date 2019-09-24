import React from 'react';
import { gql } from 'apollo-boost';
import { graphql } from 'react-apollo';
import _compose from 'lodash/flowRight';

import { baseCountry } from '../server.config';
import { withTranslation } from '../lib/i18n';

import Layout from '../features/Layout';
import Page from '../features/Page';
import BankCard from '../features/BankCard';

const BanksPageMarkup = ({ allInstitution }) => (
  <Layout metadata={{
    title: 'Cursul la bănci',
    description: `Cursul valutar afişat la băncile din ${baseCountry.name} pentru azi.`,
  }}>
    <Page>
      <div className="page-heading">
        <h1>
          {`Cursul valutar la băncile din ${baseCountry.name}`}
        </h1>
      </div>

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

// getInitialProps.
BanksPageMarkup.getInitialProps = async ({ query }) => ({
  namespacesRequired: ['common'],
  query,
});

// i18n.
const BanksPageI18N = withTranslation('common')(BanksPageMarkup);

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
