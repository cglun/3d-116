import { defineConfig } from '@rsbuild/core';
import { pluginReact } from '@rsbuild/plugin-react';
import { TanStackRouterRspack } from '@tanstack/router-plugin/rspack'

export default defineConfig({
  plugins: [pluginReact()],
  tools:{
    rspack:{
      plugins:[TanStackRouterRspack()]
    }
  },
  server: {
    port:  9002
  },
  output: {
    distPath: {
      // root: '../datav-assembly/webapp/build/',
        root: '../datav-assembly/webapp/',
     
    },
  },
});
