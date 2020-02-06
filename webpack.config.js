const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserJSPlugin = require('terser-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const fs = require('fs');
const data = require('./data/data');
const FileManagerPlugin = require('filemanager-webpack-plugin');
const SpritesmithPlugin = require('webpack-spritesmith');
const SvgSpriteLoaderPlugin = require('svg-sprite-loader/plugin');
const split = require('webpack')
const glob = require('glob').sync;


const TEMPLATES_DIR = './src/templates/pages';
const TEMPLATES = fs.readdirSync(TEMPLATES_DIR).filter(filename => filename.endsWith('.pug'));

module.exports = (env, argv) => {


  return {
    entry: {
      app: [
        "./src/js/app.js",
        "./src/scss/style.scss",
      ],
    },
    output: {
      filename: 'js/[name].js',
      chunkFilename: 'js/[name].js',
      path: path.resolve(__dirname, 'dist')
    },
    devtool: argv.mode !== 'production' ? 'source-map' : false,
    optimization: {
      minimizer: [
        new TerserJSPlugin({ sourceMap: true }),
        new OptimizeCSSAssetsPlugin({
          cssProcessorOptions: {

            map: argv.mode !== 'production' ? {
              inline: false // set to false if you want CSS source maps
            } : null
          }
        })],
      splitChunks: {
        cacheGroups: {
          vendor: {
            test: /node_modules/,
            chunks: 'initial',
            name: 'vendor',
            enforce: true
          }
        }
      }
    },
    plugins: [
      new MiniCssExtractPlugin({
        // Options similar to the same options in webpackOptions.output
        // both options are optional
        filename: 'css/[name].css',
        chunkFilename: '[id].css',
      }),
      new FileManagerPlugin({
        onStart: {
          copy: [
            { source: 'src/images', destination: 'dist/images' },
          ]
        },
        onEnd: {
          copy: [
            { source: 'dist', destination: 'docs' },
          ]
        }
      }),
      new SpritesmithPlugin({
        src: {
          cwd: path.resolve(__dirname, 'src/sprites'),
          glob: '*.png'
        },
        target: {
          image: path.resolve(__dirname, 'src/images/sprite.png'),
          css: path.resolve(__dirname, 'src/scss/sprites/_sprite.scss')
        },
        apiOptions: {
          cssImageRef: "../images/sprite.png",

        }
      }),
      new SvgSpriteLoaderPlugin({
        plainSprite: true,
        spriteAttrs: {
          id: 'spriteSheet'
        }
      }),
      ...TEMPLATES.map(template => new HtmlWebpackPlugin({
        template: `${TEMPLATES_DIR}/${template}`,
        filename: `./${template.replace(/\.pug/, '.html')}`,
        global: data,
        minify: false,
      }))
    ],
    devServer: {
      port: 80,
      compress: true,
      hot: true,
      contentBase: path.join(__dirname, 'src'),
      watchContentBase: true,
      disableHostCheck: true
    },
    watchOptions: {
      aggregateTimeout: 300,
      poll: 1000, // How often check for changes (in milliseconds)
    },
    module: {
      rules: [
        {
          test: /\.pug$/,
          loader: 'pug-loader',
          query: {
            pretty: true
          }
        },
        {
          test: /\.js$/,
          use: [
            {
              loader: "babel-loader",
            }
          ]
        },
        {
          test: /\.png$/, use: [
            'file-loader?name=i/[hash].[ext]'
          ]
        },
        {
          test: /\.s?css$/,
          exclude: [path.resolve("/node_modules/")],
          use: [
            {
              loader: MiniCssExtractPlugin.loader,
              options: {
                // you can specify a publicPath here
                // by default it uses publicPath in webpackOptions.output
                publicPath: '../',
                hmr: process.env.NODE_ENV === 'development',
              },
            }, {
              loader: "css-loader",
              options: {
                sourceMap: true,
                url: false,
              }

            }, {
              loader: 'postcss-loader',
              options: {
                sourceMap: true
              }
            }, {
              loader: "sass-loader",
              options: {
                sourceMap: true,
                includePaths: [path.resolve('src/scss')],
              }
            }
          ]
        },
        {
          test: /\.svg$/,
          loader: 'svg-sprite-loader',
          include: path.resolve(__dirname, 'src/sprites'),
          options: {
            spriteFilename: '../src/images/sprite.svg',
            spriteAttrs: {
              id: 'spriteSheet'
            }
          }
        },
      ]
    }
  }
};