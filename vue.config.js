const { ProvidePlugin } = require(`webpack`);

module.exports = {
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
