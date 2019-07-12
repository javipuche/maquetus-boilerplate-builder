const { resolve } = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const TerserPlugin = require('terser-webpack-plugin')
const folders = require('../lib/folders')
const env = require('../lib/environment')
const alias = require('../lib/alias')
const config = require('../config.json')

const webpackConfig = () => {
    let options = {
        output: {
            path: resolve(folders.dist.root),
            filename: `[name].js`,
            publicPath: config.publicPath.root
        },
        resolve: {
            alias: alias
        },
        module: {
            rules: [
                {
                    test: /\.js$/,
                    exclude: /node_modules/,
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env']
                    }
                },
                {
                    test: /\.(css|scss)$/,
                    use: [
                        'style-loader',
                        MiniCssExtractPlugin.loader,
                        {
                            loader: 'css-loader',
                            options: {
                                sourceMap: !env.isProduction
                            }
                        },
                        {
                            loader: 'postcss-loader',
                            options: {
                                ident: 'postcss',
                                sourceMap: !env.isProduction,
                                plugins: (loader) => [
                                    require('autoprefixer')()
                                ]
                            }
                        },
                        {
                            loader: 'sass-loader',
                            options: {
                                // implementation: require('sass'),
                                sourceMap: !env.isProduction,
                                outputStyle: env.isProduction ? 'compressed' : 'expanded',
                                includePaths: [
                                    folders.src.sass
                                ]
                            }
                        }

                    ]
                },
                {
                    test: /\.(gif|png|jpe?g|svg)$/i,
                    exclude: /(a-z A-Z 0-9)*\/(font?s)\//,
                    use: [{
                        loader: 'file-loader',
                        options: {
                            name: '[name].[ext]',
                            outputPath: config.sources.images,
                            publicPath: config.publicPath.images
                        }
                    },
                    {
                        loader: 'image-webpack-loader',
                        options: {
                            bypassOnDebug: true
                        }
                    }
                    ]
                },
                {
                    test: /\.(eot|ttf|svg|woff|woff2)$/i,
                    exclude: /(a-z A-Z 0-9)*\/(img|image?s)\//,
                    use: [{
                        loader: 'file-loader',
                        options: {
                            name: '[name].[ext]',
                            outputPath: config.sources.fonts,
                            publicPath: config.publicPath.fonts
                        }
                    }]
                }
            ]
        },
        plugins: [
            new MiniCssExtractPlugin({
                filename: `[name].css`
            })
        ]
    }

    if (!env.isProduction) {
        options = Object.assign(options, {
            mode: 'development',
            devtool: 'source-map'
        })
    }

    if (env.isProduction) {
        options = Object.assign(options, {
            mode: 'production',
            optimization: {
                minimizer: [new TerserPlugin()]
            }
        })
    }

    return options
}

module.exports = webpackConfig
