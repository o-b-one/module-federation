// import {environment} from "./src/environments/environment";

const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");
const mf = require("@angular-architects/module-federation/webpack");
const path = require("path");
const share = mf.share;
const sharedMappings = new mf.SharedMappings();

sharedMappings.register(
  path.join(__dirname, '../../tsconfig.base.json'),
  [/* mapped paths to share */]);
const endpoints = {
  "feed": 'http://localhost:4201/remoteEntry.js',
  "user": 'http://localhost:4202/remoteEntry.js',
  "navigation_bar": 'http://localhost:4204/remoteEntry.js',
  "login": 'http://localhost:4203/remoteEntry.js',
}

function normalizeMappings(endpoints) {
  const mappings = {};
  Object.entries(endpoints).forEach(value => mappings[value[0]] = value[0]+'@'+ value[1])
  return mappings;
}

module.exports = {
  output: {
    uniqueName: "shell",
    publicPath: "auto"
  },
  optimization: {
    runtimeChunk: false
  },
  resolve: {
    alias: {
      ...sharedMappings.getAliases(),
    }
  },
  plugins: [
    new ModuleFederationPlugin({

        remotes: normalizeMappings(endpoints),
        shared: share({
          "@angular/core": { singleton: true, strictVersion: true, requiredVersion: 'auto' },
          "@angular/common": { singleton: true, strictVersion: true, requiredVersion: 'auto' },
          "@angular/common/http": { singleton: true, strictVersion: true, requiredVersion: 'auto' },
          "@angular/router": { singleton: true, strictVersion: true, requiredVersion: 'auto' },
          "@ngrx/store": { singleton: true, strictVersion: true, requiredVersion: 'auto' },
          "@ngrx/effects": { singleton: true, strictVersion: true, requiredVersion: 'auto' },
          "@ngrx/entity": { singleton: true, strictVersion: true, requiredVersion: 'auto' },

          ...sharedMappings.getDescriptors()
        })

    }),
    sharedMappings.getPlugin()
  ],
};
