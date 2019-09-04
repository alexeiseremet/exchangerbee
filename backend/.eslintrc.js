module.exports = {
  'root': true,
  'parser': 'babel-eslint',
  'extends': ['eslint:recommended', 'airbnb-base'],
  'env': {
    'es6': true,
    'browser': true,
    'node': true,
  },
  'rules': {
    'quote-props': ['warn', 'consistent'],
  },
};
