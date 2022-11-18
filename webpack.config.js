const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const webpack = require('webpack');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const TerserWebpackPlugin = require('terser-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
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

const client_common_pages = ['index', 'rooms', 'services', 'sales', 'contacts', 'cart', 'profile_active', 'profile_history', 'profile_info'];
const client_info_pages = ['room', 'service', 'sale', 'profile_history_item'];
const admin_common_pages = ['admin_clients', 'admin_manage_client', 'admin_manage_order', 'admin_manage_property', 'admin_manage_role', 'admin_manage_room', 
                            'admin_manage_sale', 'admin_manage_service', 'admin_manage_tag', 'admin_manage_worker', 'admin_orders', 'admin_profile', 'admin_properties', 
                            'admin_roles', 'admin_rooms', 'admin_sales', 'admin_services', 'admin_set_main', 'admin_tags', 'admin_weekends', 'admin_workers',
                            'admin_show_room', 'admin_show_order'];
const multileHtmlWebpackPages = [                                                   
    ...client_common_pages.map(name => {                                            
        return new HtmlWebpackPlugin({
            template: path.resolve(__dirname, `src/templates/${name}.html`), 
            filename: path.resolve(__dirname, `dist/pages/${name}.html`), 
            chunks: ['common'],
            inject: true || 'head',
            scriptLoading: 'defer'
        })
    }),
    ...client_info_pages.map(name => {                                             
        return new HtmlWebpackPlugin({
            template: path.resolve(__dirname, `src/templates/${name}.html`), 
            filename: path.resolve(__dirname, `dist/pages/${name}.html`), 
            chunks: ['info', 'common'],
            inject: true || 'head',
            scriptLoading: 'defer'
        })
    }),
    ...admin_common_pages.map(name => {                                             
        return new HtmlWebpackPlugin({
            template: path.resolve(__dirname, `src/templates/${name}.html`), 
            filename: path.resolve(__dirname, `dist/pages/${name}.html`), 
            chunks: ['info', 'admin'],
            inject: true || 'head',
            scriptLoading: 'defer'
        })
    })
];

module.exports = {
    mode: isDev ? 'development' : 'production',
    entry: {
        common: [
            path.resolve(__dirname,'src/scss/style.scss'),
            path.resolve(__dirname,'src/js/header_burger.js'),
            path.resolve(__dirname,'src/js/redirect.js'),
            path.resolve(__dirname,'src/js/login_popup.js'),
            path.resolve(__dirname,'src/js/offers_slider.js'),
            path.resolve(__dirname,'src/js/profile_burger.js'),
            path.resolve(__dirname,'src/js/filter_mobile.js'),
            path.resolve(__dirname,'src/js/infinity_catalog.js')
        ],
        info: [
            path.resolve(__dirname,'src/js/picked_time.js'),
            path.resolve(__dirname,'src/js/slick-slider/slick_starter.js'),
            path.resolve(__dirname,'src/js/evo-calendar/evo-starter.js'),
        ],
        admin: [
            path.resolve(__dirname,'src/scss/admin.scss'),
            path.resolve(__dirname,'node_modules/bootstrap/dist/js/bootstrap.bundle.min.js')
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
        new CleanWebpackPlugin({
            cleanOnceBeforeBuildPatterns: [
                './*'
            ],
        }),
    ].concat(multileHtmlWebpackPages),
    resolve: {
        alias:{
            '@scss': path.resolve(__dirname, 'src/scss')
        }
    },
    optimization: optimize()
};