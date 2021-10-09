// import {environment} from "./src/environments/environment";

const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");
const mf = require("@angular-architects/module-federation/webpack");
const {getEndpoints} = require("../../config/endpoints");
const path = require("path");
const shareAll = mf.shareAll;
const sharedMappings = new mf.SharedMappings();

sharedMappings.register(
  path.join(__dirname, '../../tsconfig.base.json'),
  [/* mapped paths to share */]);

process.endpoints = process['endpoints'] || getEndpoints('local');
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

      remotes: process['endpoints'],
      shared: {
        ...shareAll({
          singleton: true,
          strictVersion: true,
          requiredVersion: 'auto',
          eager: true
        }),
        ...sharedMappings.getDescriptors()
      }
    }),
    sharedMappings.getPlugin()
  ],
};
