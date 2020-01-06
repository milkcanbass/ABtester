const path = require('path');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const { GenerateSW } = require('workbox-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

console.log('dev');

module.exports = {
  entry: ['babel-polyfill', './src/client/index.js'],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: 'html-loader',
          },
        ],
      },
      {
        test: /\.s[ac]ss$/i,
        loaders: ['style-loader', 'css-loader', 'sass-loader'],
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[hash].[ext]',
              outputPath: 'imgs',
            },
          },
        ],
      },
      {
        enforce: 'pre',
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'eslint-loader',
        options: {
          emitWarning: true,
          failOnError: false,
          failOnWarning: false,
          fix: true,
        },
      },
    ],
  },
  devServer: {
    port: 3000,
    open: true,
    proxy: {
      '/**': 'http://localhost:8080',
    },
  },
  resolve: {
    modules: ['src', 'node_modules'],
    extensions: ['.js', '.jsx'],
    alias: {
      'react-dom$': 'react-dom/profiling',
      'scheduler/tracing': 'scheduler/tracing-profiling',
    },
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebPackPlugin({
      template: './public/index.html',
      filename: './index.html',
      excludeChunks: ['server'],
    }),
    new WebpackPwaManifest({
      name: 'ShinCat and HanDog',
      short_name: 'S and H',
      description: 'ShinCat and HanDog web store',
      background_color: '#ffffff',
      theme_color: '#2196F3',
      inject: true,
      crossorigin: 'use-credentials', // can be null, use-credentials or anonymous
      ios: true,
      destination: path.join('/manifest'),
      icons: [
        {
          src: path.resolve('public/pngicon.png'),
          sizes: [120, 152, 167, 180, 1024],
          destination: path.join('/manifest/icons/ios'),
          ios: true,
        },
        {
          src: path.resolve('public/pngicon.png'),
          size: 1024,
          destination: path.join('/manifest/icons/ios'),
          ios: 'startup',
        },
        {
          src: path.resolve('public/pngicon.png'),
          sizes: [36, 48, 72, 96, 144, 192, 512],
          destination: path.join('/manifest/icons/android'),
        },
      ],
    }),
    new GenerateSW({
      // these options encourage the ServiceWorkers to get in there fast
      // and not allow any straggling "old" SWs to hang around
      clientsClaim: true,
      skipWaiting: true,
      importScripts: ['./workboxInject.js'],
    }),
    // new BundleAnalyzerPlugin(),
  ],
};
