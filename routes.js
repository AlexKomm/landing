const routes = require('next-routes');

// @see https://github.com/fridays/next-routes
// Additional dynamic routes.
module.exports = routes()
  // Single landing path pattern.
  .add('index', '/:path+');
