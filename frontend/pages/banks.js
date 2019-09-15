import React from 'react';
import { gql } from 'apollo-boost';
import { graphql } from 'react-apollo';
import _compose from 'lodash/flowRight';

import { Link, withTranslation } from '../lib/i18n';
import { textIndexPage as t } from '../lib/locale';

import Metadata from '../features/Metadata';
import Layout from '../features/Layout';
import Page from '../features/Page';
import BankCard from '../features/BankCard';
import { CreateInstitution } from '../features/Institution';

const BanksPageMarkup = ({ query: { action }, allInstitution, post }) => (
  <Layout>
    <Metadata
      title={t.metaTitle}
      description={t.metaDescription}
      ogTitle={t.ogTitle}
      ogDescription={t.ogDescription}
    />
    <Page>
      {
        !action && allInstitution && (
          <>
            <Link href="/currencies?action=create" as="/banks/create">
              <a>Create</a>
            </Link>
            <hr />

            {
              <div className="page-heading">
                <h1>
                  {
                    post
                      ? post.title
                      : `Cursul valutar la băncile din Moldova`
                  }
                </h1>
              </div>
            }

            <section>
              {
                allInstitution.map((bank, i) => <BankCard key={i} bank={bank} />)
              }
            </section>
          </>
        )
      }

      {action && <CreateInstitution />}
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
      id
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
