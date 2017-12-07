const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const AssetsPlugin = require('assets-webpack-plugin');
const autoprefixer = require('autoprefixer');
const WebpackChunkHash = require('webpack-chunk-hash');

const isProduction = process.env.NODE_ENV === 'production';
const proj = '.';

let publicPath = '/static/';
let extraPlugins = [];
let chunkhashPlaceholder = '';
let contenthashPlaceholder = '';

if (isProduction) {
    publicPath = ``; //线上cdn环境
    extraPlugins = [
        new webpack.LoaderOptionsPlugin({
            minimize: true,
            debug: false,
        }),
        new webpack.optimize.UglifyJsPlugin({
            beautify: false,    // 最紧凑的输出
            comments: false,    // 删除所有的注释
            sourceMap: true,
            compress: {
                warnings: false,        // 在UglifyJs删除没有用到的代码时不输出警告
                drop_console: true,     // 删除所有的 `console` 语句，可以兼容ie浏览器
                collapse_vars: true,    // 内嵌定义了但是只用到一次的变量
                reduce_vars: true,      // 提取出出现多次但是没有定义成变量去引用的静态值
            },
        }),
    ];
    chunkhashPlaceholder = '[chunkhash:16].';
    contenthashPlaceholder = '[contenthash:16].';
} else {
    extraPlugins = [
        new webpack.LoaderOptionsPlugin({
            debug: true,
        }),
    ];
}

const rootAssetPath = path.resolve(__dirname, proj);

const config = {
    context: rootAssetPath,
    resolve: {
        modules: [rootAssetPath, 'node_modules'],
        extensions: ['.js', '.jsx'],
    },
    entry: {
        bundle: './entry.jsx',
    },
    output: {
        publicPath,
        path: path.resolve(__dirname, `${proj}/static`),
        filename: `[name].${chunkhashPlaceholder}js`,
        chunkFilename: `[name].${chunkhashPlaceholder}js`,
    },
    plugins: [
        new webpack.NamedModulesPlugin(),
        new WebpackChunkHash(),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'commons',
            filename: `commons.${chunkhashPlaceholder}js`,
            minChunks: 3,
        }),
        new ExtractTextPlugin(`[name].${contenthashPlaceholder}css`),
        new AssetsPlugin({
            filename: isProduction ? 'manifest.json' : 'manifest_debug.json',
            path: rootAssetPath,
            prettyPrint: true,
        }),
    ].concat(extraPlugins),
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: 'babel-loader',
                        options: {
                            presets: ["react", "env"],
                            cacheDirectory: true,
                        },
                    },
                ],
            },
            {
                test: /\.css$/,
                use: [
                    "style-loader",
                    `css-loader?-autoprefixer`,
                ],
            },
            {
                test: /\.scss$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: [
                        `css-loader?-autoprefixer&sourceMap`,
                        {
                            loader: 'postcss-loader',
                            options: {
                                ident: 'postcss',
                                sourceMap: true,
                                plugins: () => [autoprefixer({ browsers: [
                                    '> 1%',
                                    'IE >= 10',
                                    'Chrome >= 39',
                                    'Safari >= 4',  // for phantomjs
                                    'ios >= 8',
                                    'Android >= 4.0',
                                    'last 2 versions',
                                ] })],
                            },
                        },
                        'resolve-url-loader?sourceMap',
                        'sass-loader?sourceMap',
                    ],
                    publicPath,
                }),
            },
            {
                test: /\.png|\.jpg|\.gif$/,
                use: [
                    "url-loader?limit=5000&name=img/[name].[hash:8].[ext]",
                    {
                        loader: 'image-webpack-loader',
                        options: {
                            optipng: { optimizationLevel: 3 },
                            pngquant: { enabled: true },
                            bypassOnDebug: true,
                        },
                    },
                ],
            },
        ],
    },
    externals: {
        // react: "React",
        // "react-dom": "ReactDOM",
        // "react-router-dom": "ReactRouterDOM",
    },
    devtool: isProduction ? 'source-map' : 'cheap-module-source-map',
    stats: {
        children: false,
    },
};

module.exports = config;
