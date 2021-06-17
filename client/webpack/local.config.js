const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
    entry: ['react-hot-loader/patch', './src/index.tsx'],
    output: {
        filename: 'index.bundle.js',
        path: path.join(__dirname, '/../dist')
    },
    target: "web",
    devServer: {
        host: '0.0.0.0', // Required to serve from within a docker container. [See this for more info](https://okteto.com/docs/tutorials/webpack/index.html)
        port: 3000,
        watchContentBase: true,
        historyApiFallback: true, // Webpack doesn't know how to handler paths manipulated with React Router. This tells webpack to serve index.html for any paths other than root
        hot: true,
        liveReload: false
    },
    // Rules of how webpack will take our files, complie & bundle them for the browser 
    module: {
        /**  Considerations taken for [modules]:
            *   We don't need ts-loader because we are using Babel instead of tsc to transpile TS to JS
            *   We don't need style-loaders or css-loaders because this project is currently relying entirely on Material-UI
         */
        rules: [
            {
                test: /\.(tsx|ts|js)$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader'
                }
            },
            {
                test: /\.(png|svg|jpg|jpeg|gif)$/i,
                type: 'asset/resource',
            }
            // { test: /\.css$/,  use: ['style-loader', 'css-loader'] } 
        ]
    },
    resolve: {
        preferRelative: true,
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
        modules: [path.resolve(process.cwd(), './src'), 'node_modules']
    },
    plugins: [new HtmlWebpackPlugin({ template: './public/index.html' })],
}