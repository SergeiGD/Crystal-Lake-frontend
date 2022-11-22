const path = require('path');
const fs = require('fs');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const webpack = require('webpack');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const TerserWebpackPlugin = require('terser-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const isDev = process.env.PROJECT_ENV == 'development';
const isProd = !isDev;

const optimize = () => {
    const conf = {
        splitChunks: {
            chunks: 'all'
        }
    };

    if (isProd) {
        conf.minimizer = [
            new CssMinimizerPlugin(),
            new TerserWebpackPlugin()
        ]
        
    }
    return conf;
}

const multileHtmlWebpackPages = [                                                   
    ...fs.readdirSync(path.resolve(__dirname, 'src/templates/client/')).map(name => { 
        return new HtmlWebpackPlugin({
            template: path.resolve(__dirname, `src/templates/client/${name}`), 
            filename: path.resolve(__dirname, `dist/pages/client/${name}`), 
            chunks: ['client'],
            inject: true || 'head',
            scriptLoading: 'defer'
        })
    }),
    ...fs.readdirSync(path.resolve(__dirname, 'src/templates/admin/')).map(name => {                                           
        return new HtmlWebpackPlugin({
            template: path.resolve(__dirname, `src/templates/admin/${name}`), 
            filename: path.resolve(__dirname, `dist/pages/admin/${name}`), 
            chunks: ['admin'],
            inject: true || 'head',
            scriptLoading: 'defer'
        })
    })
];

module.exports = {
    mode: isDev ? 'development' : 'production',
    entry: {
        client: [
            path.resolve(__dirname,'src/scss/style.scss'),
            path.resolve(__dirname,'src/js/common/redirect.js'),
            path.resolve(__dirname,'src/js/client/header_burger.js'),
            path.resolve(__dirname,'src/js/client/login_popup.js'),
            path.resolve(__dirname,'src/js/client/offers_slider.js'),
            path.resolve(__dirname,'src/js/client/profile_burger.js'),
            path.resolve(__dirname,'src/js/client/filter_mobile.js'),
            path.resolve(__dirname,'src/js/client/infinity_catalog.js'),
            path.resolve(__dirname,'src/js/client/picked_time.js'),
            path.resolve(__dirname,'src/js/client/slick-slider/slick_starter.js'),
            path.resolve(__dirname,'src/js/common/evo-calendar/evo-starter.js'),
        ],
        admin: [
            path.resolve(__dirname,'src/scss/admin.scss'),
            path.resolve(__dirname,'src/js/common/redirect.js'),
            path.resolve(__dirname,'src/js/common/evo-calendar/evo-starter.js'),
            path.resolve(__dirname,'node_modules/bootstrap/dist/js/bootstrap.bundle.min.js'),
            path.resolve(__dirname,'src/js/admin/show_img.js'),
            path.resolve(__dirname,'src/js/admin/move_img.js'),
        ]
    },
    output: {
        filename: 'js/[name].bundle.js',
        path: path.resolve(__dirname, 'dist'),
    },
    devtool: isDev ? 'source-map' : false,
    module: {
        rules: [
            {
                test: /\.(scss|css)$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    {
                        loader: 'css-loader',
                        options: {
                            url: true,
                            sourceMap: true,
                        }
                    },
                    {loader: 'resolve-url-loader'},
                    {loader: 'sass-loader', options: {sourceMap: true}},
                ]
            },
            {
                test: /\.html$/,
                use: [
                  {
                    loader: 'html-loader',
                    // options: {
                    //     sources: false                       нужно будет настроить, когда будут пути на картинки с БД
                    // }
                  }
                ],
            },
            {
                test: /\.(png|jpg|webp)$/i,
                type: 'asset/resource',
                generator: {
                    filename: 'images/[name]-[hash][ext]'
                }
            }
        ]
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: 'css/[name].bundle.css'
        }),
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery',
        }),
        ...multileHtmlWebpackPages
    ],
    resolve: {
        alias:{
            '@scss': path.resolve(__dirname, 'src/scss')
        }
    },
    optimization: optimize()
};