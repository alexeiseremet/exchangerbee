import React from 'react';
import { gql } from 'apollo-boost';
import { graphql } from 'react-apollo';
import _compose from 'lodash/flowRight';

import { Link, withTranslation } from '../lib/i18n';
import { textIndexPage as t } from '../lib/locale';

import Metadata from '../features/Metadata';
import Layout from '../features/Layout';
import Page from '../features/Page';
import { UpdateParser, DeleteParser } from '../features/Parser';

const ParserPageMarkup = ({ query: { action }, parser }) => {
  if (!parser) {
    return null;
  }

  const { id, url } = parser;

  return (
    <Layout>
      <Metadata
        title={t.metaTitle}
        description={t.metaDescription}
        ogTitle={t.ogTitle}
        ogDescription={t.ogDescription}
      />
      <Page>
        {
          !action && (
            <>
              <Link href={`/parser?id=${id}&action=update`} as={`/parsers/${id}/update`}>
                <a>Update</a>
              </Link>
              &nbsp;|&nbsp;
              <DeleteParser parser={parser} />
              <hr />

              <h1>{url}</h1>
            </>
          )
        }

        {action && <UpdateParser parser={parser} />}
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

export default _compose(
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
