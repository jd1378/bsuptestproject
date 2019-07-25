module.exports = {
  devServer: {
    proxy: "http://hiring.bsup.tk/api/"
  },
  configureWebpack: {
    devtool: "source-map"
  }
};
