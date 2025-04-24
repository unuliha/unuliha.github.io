import webpack from 'webpack';

const resolve = {
    alias: {
        vue: 'vue/dist/vue.esm-bundler.js' // 指定 Vue 的构建版本 
    }
}
const entry = {
    main: './src/main.js'
}
const output = {
    path: './dist',
    publicPath: 'dist/',
    filename: 'build.min.js'
}
const module = {
    loaders: [
        {
            test: /\.vue$/,
            loader: 'vue'
        },
        {
            test: /\.(png|jpg|gif)$/,
            loader: 'url-loader?limit=819200'
        },
        {
            test: /\.js$/,
            exclude: /node_modules|vue\/dist|vue-router\/|vue-loader\/|vue-hot-reload-api\//,
            loader: 'babel'
        },
        {
            test: /\.css$/,
            loader: 'style-loader!css-loader?sourceMap'
        },
        {
            test: /\.(woff|svg|eot|ttf)\??.*$/,
            loader: 'url-loader?limit=50000&name=[path][name].[ext]'
        }
    ]
}
const babel = {
    presets: ['es2015', 'stage-0'],
    plugins: ['transform-runtime']
}

module.exports = {resolve,entry,output,module,babel}

if (process.env.NODE_ENV === 'production') {
    module.exports.plugins = [
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: '"production"'
            }
        }),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            }
        }),
        new webpack.optimize.OccurenceOrderPlugin()
    ]
} else {
    module.exports.devtool = '#source-map'
}