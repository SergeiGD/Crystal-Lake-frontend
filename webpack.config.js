const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const webpack = require("webpack");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const TerserWebpackPlugin = require("terser-webpack-plugin");
const {CleanWebpackPlugin} = require('clean-webpack-plugin');

const isDev = process.env.PROJECT_ENV == "development";
const isProd = !isDev;

const optimize = () => {
    if (isProd) {
        return {
            minimizer: [
                new CssMinimizerPlugin(),
                new TerserWebpackPlugin()
            ]
        }
    }
    return {}
}

module.exports = {
    mode: 'development',
    entry: {
        client_critical: [
            path.resolve(__dirname,'src/js/client_critical.js'),
        ],
        client: [
            path.resolve(__dirname,'src/js/client_main.js'),
            path.resolve(__dirname,'src/js/login_popup.js'),
            path.resolve(__dirname,'src/js/offers_slider.js'),
            path.resolve(__dirname,'src/js/profile_burger.js'),
            path.resolve(__dirname,'src/js/filter_mobile.js'),
            path.resolve(__dirname,'src/js/slick-slider/slick_starter.js'),
            path.resolve(__dirname,'src/js/picked_time.js'),
            path.resolve(__dirname,'src/js/infinity_catalog.js')
        ],
        calendar_serivce: [
            path.resolve(__dirname,'src/js/evo-calendar/calendar_service.js'),
        ],
        calendar_room: [
            path.resolve(__dirname,'src/js/evo-calendar/calendar_room.js'),
        ],
        admin: [
            path.resolve(__dirname,'src/js/admin_main.js')
        ]
    },
    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, 'dist/js'),
    },
    devtool: "source-map",
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
                    {loader: 'sass-loader', options: {sourceMap: true}},
                ]
            },
        ]
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: '../css/[name].bundle.css'
        }),
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery',
        }),
        new CleanWebpackPlugin()
    ],
    resolve: {
        alias:{
            '@scss': path.resolve(__dirname, 'src/scss')
        }
    },
    optimization: optimize()
};