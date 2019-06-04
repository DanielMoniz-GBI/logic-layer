/* eslint-disable import/no-extraneous-dependencies */
const createDefaultConfig = require('@open-wc/testing-karma/default-config');
const merge = require('webpack-merge');

module.exports = config => {
  config.set(
    merge(createDefaultConfig(config), {
      basePath: '',
      frameworks: ['mocha', 'chai'],
      files: [
        // runs all files ending with .test in the test folder,
        // can be overwritten by passing a --grep flag. examples:
        //
        // 'node_modules/chai/chai.js',
        // npm run test -- --grep test/foo/bar.test.js
        // npm run test -- --grep test/bar/*
        // { pattern: config.grep ? config.grep : 'test/**/*.test.browser.js', type: 'module' },
        // { pattern: 'node_modules/chai/chai.js', watched: true, included: false, served: true, type: 'module' },
        // { pattern: 'node_modules/axios/dist/axios.js', watched: true, included: false, served: true, type: 'module' },
        // { pattern: 'src/**/*.js', watched: true, included: true, served: true, type: 'module' },
        { pattern: 'test/**/*.test.browser.js', type: 'module' },
      ],

      // you can overwrite/extend the config further
    }),
  );
  return config;
};
