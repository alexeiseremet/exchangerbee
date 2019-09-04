module.exports = {
  'root': true,
  'parser': 'babel-eslint',
  'extends': ['eslint:recommended', 'plugin:react/recommended', 'airbnb-base'],
  'env': {
    'es6': true,
    'browser': true,
    'node': true,
  },
  'rules': {
    'react/prop-types': 0,
    'react/display-name': 0,
    'react/no-danger': 0,
    'jsx-a11y/href-no-hash': 0,
    'react/jsx-filename-extension': [2, {
      'extensions': ['.js']
    }],
    'quote-props': [1, 'consistent'],
    'no-unused-expressions': [1, {
      'allowShortCircuit': true,
      'allowTernary': true
    }],
  },
  'settings': {
    'react': {
      'pragma': 'React',
      'version': 'detect',
    },
  },
};
