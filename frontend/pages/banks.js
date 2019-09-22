import React from 'react';
import { gql } from 'apollo-boost';
import { graphql } from 'react-apollo';
import _compose from 'lodash/flowRight';

import { baseCountry } from '../server.config';
import { Link, withTranslation } from '../lib/i18n';

import Layout from '../features/Layout';
import Page from '../features/Page';
import BankCard from '../features/BankCard';
import { CreateInstitution } from '../features/Institution';

const BanksPageMarkup = ({ query: { action }, allInstitution, post }) => (
  <Layout metadata={{
    title: 'Cursul la bănci',
    description: `Cursul valutar afişat la băncile din ${baseCountry.name} pentru azi.`,
  }}>
    <Page>
      {
        action
          ? <CreateInstitution/>
          : (
            <>
              <Link href="/currencies?action=create" as="/banks/create">
                <a>Create</a>
              </Link>
              <hr/>

              {
                <div className="page-heading">
                  <h1>
                    {
                      post
                        ? post.title
                        : `Cursul valutar la băncile din ${baseCountry.name}`
                    }
                  </h1>
                </div>
              }

              {
                allInstitution && (
                  <section>
                    {
                      allInstitution.map((bank, i) => <BankCard key={i} bank={bank}/>)
                    }
                  </section>
                )
              }

            </>
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
