import React from 'react';
import { gql } from 'apollo-boost';
import { graphql } from 'react-apollo';
import _compose from 'lodash/flowRight';

import { withTranslation } from '../../lib/i18n';
import securePage from '../../lib/securePage';

import Layout from '../../features/Layout';
import Page from '../../features/Page';
import { UpdateInstitution, DeleteInstitution } from '../../features/Institution';
import { UpdateTranslation } from '../../features/Translation';

const AdminBankPageMarkup = ({ institution }) => {
  if (!institution) {
    return null;
  }

  return (
    <Layout metadata={{ title: institution.name }} type="admin">
      <Page>
        <DeleteInstitution institution={institution}/>
        <hr/>
        <UpdateInstitution institution={institution}/>
        <hr/>
        <UpdateTranslation translation={{
          locale: 'ru',
          fields: {
            name: '',
          },
          model: {
            refId: institution.id,
            refSlug: institution.slug,
            refType: 'institution',
          },
          ...institution.translationVObj,
        }}/>
      </Page>
    </Layout>
  );
};

// getInitialProps.
AdminBankPageMarkup.getInitialProps = async ({ query }) => ({
  query,
});

// i18n.
const AdminBankPageI18N = withTranslation()(AdminBankPageMarkup);

// Container.
const GQL_BANK_PAGE = gql`
  query BankPage ($slug: String!) {
    institution(slug: $slug) {
      id
      slug
      name
      translationVObj {
        id
        locale
        model {
          refId
          refSlug
          refType
        }
        fields {
          name
        }
      }
    }
  }
`;

const AdminBankPageGQL = _compose(
  graphql(
    GQL_BANK_PAGE,
    {
      options: ({ query }) => ({
        variables: {
          slug: query.slug,
        },
      }),
      props: ({ data: { institution } }) => ({
        institution,
      }),
    },
  ),
)(AdminBankPageI18N);

export default securePage(AdminBankPageGQL);
