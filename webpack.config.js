const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const merge = require('webpack-merge')
const validate = require('webpack-validator')
const parts = require('./libs/parts')

const pkg = require('./package.json')

const PATHS = {
  app: path.resolve(__dirname, 'frontend'),
  style: path.resolve(__dirname, 'frontend', 'styles'),
  build: path.resolve(__dirname, 'public/build')
}

const common = {
  // Entry accepts a path or an object of entries.
  // We'll be using the latter form give it's
  // convenient with more complex configurations.
  entry: {
    app: PATHS.app,
    style: PATHS.style
  },
  output: {
    path: PATHS.build,
    // Tweak this to match your GitHub project name
    publicPath: '/build/',
    filename: '[name].js',
    // This is used for require.ensure. The setup
    // will work without but this is useful to set.
    chunkFilename: '[chunkhash].js'
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Procrastilist',
      filename: path.join(__dirname, '/resources/views/index.php')
    })
  ],
  module: {
    preLoaders: [
      {
        test: /\.jsx?$/,
        loaders: ['eslint'],
        include: PATHS.app
      }
    ],
    loaders: [
      {
        test: /\.jsx?$/,
        // Enable caching for improved performance during development.
        // It uses default OS directory by default. If you need
        // something more custom, pass a path to it.
        // I.E., babel?cacheDirectory=<path>
        loaders: ['babel?cacheDirectory'],
        // Parse only App files! Without this it will go through
        // the entire project. In addition to being slow,
        // that will most likely result in an error.
        include: PATHS.app,
        exclude: PATHS.style
      }
    ]
  },
  // Important! Do not remove ''. If you do, imports without
  // an extension won't work anymore!
  resolve: {
    extensions: ['', '.js', '.jsx', '.less']
  }
}

var config

// Detect how NPM is run and branch based on that.
switch (process.env.npm_lifecycle_event) {
  case 'build':
    config = merge(
      common,
      {
        devtool: 'source-map',
        output: {
          path: PATHS.build,
          filename: '[name].[chunkhash].js',
          // This is used for require.ensure. The setup
          // will work without but this is useful to set.
          chunkFilename: '[chunkhash].js'
        }
      },
      parts.clean(PATHS.build),
      parts.setFreeVariable(
        'process.env.NODE_ENV',
        'production'
      ),
      parts.extractBundle({
        name: 'vendor',
        entries: Object.keys(pkg.dependencies)
      }),
      parts.minify(),
      parts.extractLESS(PATHS.style),
      parts.purifyCSS([PATHS.app])
    )
    break
  default:
    config = merge(
      common,
      {
        devtool: 'eval-source-map'
      },
      parts.setupLESS(PATHS.style),
      parts.devServer({
        // Customize host/port here if needed
        host: process.env.HOST,
        port: process.env.PORT
      })
    )
}

// Run validator in quiet mode to avoid output in stats.
module.exports = validate(config, {
  quiet: true
})
