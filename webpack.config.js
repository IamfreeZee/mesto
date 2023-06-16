const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
  entry: { main: './src/pages/index.js' },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'main.js',
    publicPath: ''
  },
  mode: 'development',
  devtool: 'eval-source-map',
  devServer: {
    static: path.resolve(__dirname, './dist'), // путь, куда "смотрит" режим разработчика
    compress: true, // это ускорит загрузку в режиме разработки
    port: 8080, // порт, чтобы открывать сайт по адресу localhost:8080, но можно поменять порт
    open: true // сайт будет открываться сам при запуске npm run dev
  },
  module: {
    rules: [
      {
        test: /\.js$/, // регулярное выражение, которое ищет все js файлы
        use: 'babel-loader', // при обработке этих файлов нужно использовать babel-loader
        exclude: '/node_modules/' // исключает папку node_modules, файлы в ней обрабатывать не нужно
      },
      {
        test: /\.css$/, // ищет все файлы css
        use: [MiniCssExtractPlugin.loader, {
          loader: 'css-loader',
          options: { importLoaders: 1 }
        },
        'postcss-loader']
      },
      {
        test: /\.(png|svg|jpg|gif)$/, // регулярное выражение, которое ищет все файлы с такими расширениями
        type: 'asset/resource',
        generator: {
          filename: 'images/[hash][ext]'
        }
      },
      {
        test: /\.(woff(2)?|eot|ttf|otf)$/, // регулярное выражение, которое ищет все файлы с такими расширениями
        type: 'asset/resource',
        generator: {
          filename: 'fonts/[hash][ext]'
        }
      },
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html' // путь к файлу index.html
    }),
    new MiniCssExtractPlugin(),
    new CleanWebpackPlugin(),
  ]
}
