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
    'quote-props': [1, 'consistent'],
    'no-unused-expressions': [1, {
      'allowShortCircuit': true,
      'allowTernary': true
    }],
  },
};
