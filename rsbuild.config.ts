import { defineConfig, rspack } from '@rsbuild/core';
import { pluginReact } from '@rsbuild/plugin-react';
import { TanStackRouterRspack } from '@tanstack/router-plugin/rspack';

import { mfConfig } from './module-federation.config';

export default defineConfig({
  plugins: [pluginReact()],
  tools: {
    rspack: {
      plugins: [TanStackRouterRspack()],
    },
  },
  moduleFederation: {
    options: mfConfig,
  },
  server: {
    port: 116,
  },
  output: {
    distPath: {
      // root: '../datav-assembly/webapp/build/',
      //root: '../datav-assembly/webapp/',
      // root: './DATAV/dist/',
    },
    assetPrefix: './', // 指定静态资源的相对路径前缀，
    // minify: {
    //   jsOptions: {
    //     exclude: /^\/src\//,
    //     minimizerOptions: {
    //       mangle: false,
    //     },
    //   },
    // },
    // filename: {
    //   js: 'static/js/[name].js',
    // },
  },

  // environments: {
  // node: {
  //   output: {
  //     target: 'node',
  //   },
  // },
  // },
  // web: {
  //   output: {
  //     target: 'web',
  //   },
  // },
  // },
});
