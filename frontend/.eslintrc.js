module.exports = {
  'root': true,
  'parser': 'babel-eslint',
  'extends': ["eslint:recommended", "plugin:react/recommended"],
  'env': {
    'es6': true,
    'browser': true,
    'node': true,
  },
  'rules': {
    'react/prop-types': 0,
    'react/display-name': 0,
  },
  'settings': {
    'react': {
      'pragma': 'React',
      'version': 'detect',
    }
  },
};
