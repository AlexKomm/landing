/* eslint-disable no-param-reassign */
require('dotenv').config();

const path = require('path');
const Dotenv = require('dotenv-webpack');

const withFonts = require('next-fonts');
const withCSS = require('@zeit/next-css');

const config = withCSS(
  withFonts({
    webpack(config) {
      config.plugins = config.plugins || [];

      config.plugins = [
        ...config.plugins,

        // Read the .env file
        new Dotenv({
          path: path.join(__dirname, '.env'),
          systemvars: true,
        }),
      ];

      return config;
    },
  }),
);

config.serverRuntimeConfig = {
  clientId: process.env.CLIENT_ID,
  clientSecret: process.env.CLIENT_SECRET,
  key: process.env.KEY,
};

module.exports = config;
