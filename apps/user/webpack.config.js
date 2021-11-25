const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");
const ExternalTemplateRemotesPlugin = require("external-remotes-plugin");
const mf = require("@angular-architects/module-federation/webpack");
const path = require("path");
const shareAll = mf.shareAll;

const sharedMappings = new mf.SharedMappings();
sharedMappings.register(
  path.join(__dirname, '../../tsconfig.base.json'),
  [/* mapped paths to share */]);

module.exports = {
  output: {
    uniqueName: "user",
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
      name: "user",
      filename: "remoteEntry.js",
      shared:{
        ...shareAll({
          singleton: true,
          strictVersion: true,
          requiredVersion: 'auto',
          eager: true
        }),
        ...sharedMappings.getDescriptors()
      },
      exposes: {
        './public-api': './apps/user/public-api.ts'
      },

    }),
    sharedMappings.getPlugin(),
    new ExternalTemplateRemotesPlugin()
  ],
};
