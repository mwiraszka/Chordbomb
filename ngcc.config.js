/* Removes 'deep imports' error - https://github.com/angular/angular/issues/35615 */
module.exports = {
  packages: {
    'angular-instantsearch': {
      ignorableDeepImportMatchers: [
        /algoliasearch\//,
        /instantsearch.js\//,
        /querystring-es3\//
      ]
    },
  },
};