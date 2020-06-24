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
  devServer: {
    proxy: `http://localhost:3000`,
  },
  pages: {
    index: {
      entry: `src/main.js`,
      filename: `index.html`,
      template: `public/index.html`,
      title: `ITSC Flipbook`,
    },
    login: {
      entry: `src/login.js`,
      filename: `login.html`,
      template: `public/login.html`,
      title: `ITSC Flipbook - Login`,
    },
  },
  pluginOptions: {
    express: {
      serverDir: `./srv`,
    },
  },
};
