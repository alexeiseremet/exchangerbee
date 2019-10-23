import React from 'react';
import { gql } from 'apollo-boost';
import { graphql } from 'react-apollo';
import _compose from 'lodash/flowRight';

import { withTranslation } from '../../lib/i18n';
import securePage from '../../lib/securePage';

import Layout from '../../features/Layout';
import Page from '../../features/Page';
import { UpdateParser, DeleteParser } from '../../features/Parser';

const ParserPageMarkup = ({ parser }) => {
  if (!parser) {
    return null;
  }

  return (
    <Layout metadata={{ title: parser.url }} type="admin">
      <Page>
        <DeleteParser parser={parser}/>
        <hr/>
        <UpdateParser parser={parser}/>
      </Page>
    </Layout>
  );
};

// getInitialProps.
ParserPageMarkup.getInitialProps = async ({ query }) => ({
  namespacesRequired: ['common'],
  query,
});

// i18n.
const ParserPageI18N = withTranslation('common')(ParserPageMarkup);

// Container.
const GQL_PARSER = gql`
  query Parser ($id: ID!) {
    parser(id: $id) {
      id
      institution {
        refId
        refSlug
      }
      url
      period
      processedAt
      quotes {
        amount
        currency {
          refId
          refSlug
        }
        xPaths {
          bid
          ask
          code
        }
      }
    }
  }
`;

const ParserPageGQL = _compose(
  graphql(
    GQL_PARSER,
    {
      options: ({ query }) => ({
        variables: {
          id: query.id,
        },
      }),
      props: ({ data: { parser } }) => ({
        parser,
      }),
    },
  ),
)(ParserPageI18N);

export default securePage(ParserPageGQL);
