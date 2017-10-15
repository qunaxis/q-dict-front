var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var config = require('./webpack.config.dev');


console.log("NODE_ENV:", process.env.NODE_ENV)


new WebpackDevServer(webpack(config), {
  publicPath: config.output.publicPath,
  historyApiFallback: {
    disableDotRule: true
  },
  disableHostCheck: true,
  quiet: true,
  // inline: true,
  compress: true
}).listen(3000, 'localhost', function (err, result) {
  if (err)
    return console.error(err)

  console.log('🌎 Listening at http://localhost:3000/');
});
