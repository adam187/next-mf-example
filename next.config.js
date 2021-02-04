const {
  withModuleFederation,
  MergeRuntime,
} = require("@module-federation/nextjs-mf");
const path = require("path");

module.exports = {
  webpack: (config, options) => {
    const { buildId, dev, isServer, defaultLoaders, webpack } = options;
    const mfConf = {
      name: "next-mf-example",
      library: { type: config.output.libraryTarget, name: "next-mf-example" },
      filename: "static/runtime/remoteEntry.js",
      remotes: {
        // test1: isServer
        //   ? path.resolve(
        //       __dirname,
        //       "../test1/.next/server/static/runtime/remoteEntry.js"
        //     )
        //   : "test1", // for client, treat it as a global
      },
      exposes: {},
      shared: [],
    };

    // Configures ModuleFederation and other Webpack properties
    withModuleFederation(config, options, mfConf);

    config.plugins.push(new MergeRuntime());

    if (!isServer) {
      config.output.publicPath = "http://localhost:3000/_next/";
    }

    return config;
  },
  future: {
    webpack5: true,
  },
};
