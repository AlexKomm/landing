const compression = require('compression');
// const session = require('cookie-session');
const express = require('express');
const nextjs = require('next');
const routes = require('./routes');

process.env.NODE_ENV = process.env.NODE_ENV || 'development';

const port = process.env.PORT || 3000;
const dev = process.env.NODE_ENV !== 'production';
const app = nextjs({ dev });
const handler = routes.getRequestHandler(app);

app
  .prepare()
  .then(() => {
    const server = express();

    server.use(compression());

    // const expiryDate = new Date(Date.now() + 60 * 60 * 24 * 1000);

    // server.use(
    //   session({
    //     name: 'cm_njs',
    //     keys: [process.env.KEY],
    //     cookie: {
    //       secure: true,
    //       httpOnly: true,
    //       domain: '.caterme.lo',
    //       path: '/',
    //       expires: expiryDate,
    //     },
    //   }),
    // );

    server.get('/favicon.ico', (req, res) =>
      res.status(200).sendFile('favicon.ico', {
        root: `${__dirname}/static/`,
      }),
    );

    server.get('*', (req, res) => handler(req, res));

    server.listen(port, err => {
      if (err) throw err;
      console.log('> Ready on http://localhost:3000');
    });
  })
  .catch(ex => {
    console.error(ex.stack);
    process.exit(1);
  });
