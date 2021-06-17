const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = env => {
    return {
        entry: './src/index.tsx',
        output: {
            filename: 'index.bundle.js',
            path: path.join(env.ROOTPATH, '/dist')
        },
        target: "web",
        devServer: {
            host: '0.0.0.0', // This is necessary for webpack to serve from within a docker container. [See this for more info](https://okteto.com/docs/tutorials/webpack/index.html)
            port: 3000,
            watchContentBase: true,
            historyApiFallback: true // Webpack doesn't know how to handler paths manipulated with React Router. This tells webpack to serve index.html for any paths other than root
        },
        module: { // Rules of how webpack will take our files, complie & bundle them for the browser 
            /** Considerations taken for [modules]:
             * We don't need ts-loader because we are using Babel instead of tsc to transpile TS to JS
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
                // { test: /\.css$/,  use: ['style-loader', 'css-loader'] } // Probably not necessary since we are using styled components
            ]
        },
        resolve: {
            preferRelative: true,
            extensions: ['.js', '.jsx', '.ts', '.tsx'],
            modules: [path.resolve(process.cwd(), './src'), 'node_modules']
        },
        plugins: [new HtmlWebpackPlugin({ template: './public/index.html' })],
    }
}
