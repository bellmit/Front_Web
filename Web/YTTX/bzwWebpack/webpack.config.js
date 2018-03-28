const webpack = require('webpack');
/*内置插件*/
const path = require('path')/*内置路径插件*/;

const HtmlWebpackPlugin = require('html-webpack-plugin')/*自动引用资源文件插件*/;


module.exports = {
    /*入口文件*/
    entry: './src/js/index.js',
    /*输出文件*/
    output: {
        filename: '[name].js'/*输出文件名*/,
        path: path.resolve(__dirname, 'dist')/*输出文件夹*/
    },
    /*模块加载配置*/
    module: {
        /*规则*/
        rules: [
            /*1:处理css文件*/
            {
                test: /\.css$/,
                use: [
                    {
                        /*a:内联样式类型*/
                        loader: ['style-loader']('/loaders/style-loader')
                    }, {
                        /*b:外链css文件形式类型*/
                        loader: ['css-loader']('/loaders/css-loader'),
                        options: {
                            modules: true
                        }
                    }
                ]
            },
            /*2:处理less*/
            {
                test: /\.less$/,
                use: [
                    {
                        /*a:内联样式类型*/
                        loader: ['style-loader']('/loaders/style-loader')
                    }, {
                        /*b:外链css文件形式类型*/
                        loader: ['css-loader']('/loaders/css-loader'),
                        options: {
                            modules: true
                        }
                    }
                ]
            }/*,*/
            /*3:处理js*/
            /*{
                test: /\.(js|jsx)$/,
                use: ['babel-loader']
            }*/
        ]
    },
    /*插件*/
    plugins: [
        new webpack.optimize.UglifyJsPlugin(), /*使用压缩工具*/
        new HtmlWebpackPlugin()/*自动帮你生成一个html 文件，并且引用相关的 assets资源文件*/
    ]
};