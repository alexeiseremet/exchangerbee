module.exports = `
  type Translation {
    id: ID!
    locale: String!
    model: TranslationRef!
    fields: TranslationFields
  }
  
  type Query {
    translation(model: TranslationModelInput, locale: String): Translation
    allTranslation(
      where: TranslationWhereInput
      orderBy: TranslationOrderByEnum
      skip: Int
      after: String
      before: String
      first: Int
      last: Int
    ): [Translation!] @auth(requires: ADMIN)
  }
  
  type TranslationFields {
    name: String
    symbol: String
  }
  
  type TranslationRef {
    refId: ID
    refSlug: String
    refType: TranslationModelTypeEnum
  }
  
  type Mutation {
    createTranslation(translation: TranslationInput!): Translation @auth(requires: ADMIN)
    updateTranslation(where: TranslationWhereInput!, translation: TranslationInput!): Translation @auth(requires: ADMIN)
    deleteTranslation(id: ID!): Translation @auth(requires: ADMIN)
  }
  
  input TranslationInput {
    locale: String
    model: TranslationModelInput
    fields: TranslationFieldsInput
  }
  
  input TranslationWhereInput {
    id: ID
    locale: String
    model: TranslationModelInput
  }

  input TranslationModelInput {
    refId: ID
    refSlug: String
    refType: TranslationModelTypeEnum
  }
  
  input TranslationFieldsInput {
    name: String
    symbol: String
  }
  
  enum TranslationModelTypeEnum {
    currency
    institution
  }
  
  enum TranslationOrderByEnum {
    id_ASC
    id_DESC
    name_ASC
    name_DESC
  }
`;
