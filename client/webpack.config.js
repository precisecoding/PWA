const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const path = require('path');
const { InjectManifest } = require('workbox-webpack-plugin');


module.exports = () => {
  return {
    mode: 'development',
    // entry: {} is defining the starting file path of static or raw files. then output: {} is rendering the files after applying webpack plugins allowing for custom functionality from webpack
    entry: {
      main: './src/js/index.js',
      install: './src/js/install.js'
    },
    output: {
      filename: '[name].bundle.js',
      path: path.resolve(__dirname, 'dist'),
    },
    plugins: [
      // defines files to apply plugins
      new HtmlWebpackPlugin({
        template: './index.html',
        title: 'Jate Cards'
      }),
     
      // Injects our custom service worker
      new InjectManifest({
        swSrc: './src-sw.js',
        swDest: 'src-sw.js',
      }),

      // Creates a manifest.json file. allows for icon for in taskbar
      new WebpackPwaManifest({
        fingerprints: false,
        inject: true,
        name: 'Jate Cards',
        short_name: 'Jate',
        description: 'Never forget your jate!',
        background_color: '#225ca3',
        theme_color: '#225ca3',
        start_url: './',
        publicPath: './',
        icons: [
          {
            src: path.resolve('src/images/logo.png'),
            sizes: [96, 128, 192, 256, 384, 512],
            destination: path.join('assets', 'icons'),
          },
        ],
      }),
    ],
// rules to apply to webpack plug ins
    module: {
        rules: [
          {
            test: /\.css$/i,
            use: ['style-loader', 'css-loader'],
          },
          {
            // for javascript files exclude node_moduels and apply the following rules
            test: /\.m?js$/,
            exclude: /node_modules/,
            // We use babel-loader in order to use ES6. compiles ES6 into the older javascript format allowing for compatability with many browsers. 
            use: {
              loader: 'babel-loader',
              options: {
                presets: ['@babel/preset-env'],
                plugins: ['@babel/plugin-proposal-object-rest-spread', '@babel/transform-runtime'],
              },
            },
          },
        ],
    },
  };
};
