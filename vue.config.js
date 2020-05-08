const { ProvidePlugin } = require(`webpack`);

module.exports = {
  chainWebpack: config => {
    config
      .plugin(`html`)
      .tap(args => {
        args[0].title = `SoIT Annual Report`;
        return args;
      });
  },
  configureWebpack: {
    plugins: [
      new ProvidePlugin({
        '$': `jquery`,
        'jQuery': `jquery`,
        'window.$': `jquery`,
        'window.jQuery': `jquery`,
      }),
    ],
  },
  publicPath: process.env.NODE_ENV === `production` ? `/vue-flipbook` : `/`,
};
