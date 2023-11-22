module.exports = {
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: [
          "style-loader", // CSSをDOMに注入する
          "css-loader", // CSSをCommonJSに変換する
          "sass-loader", // SassをCSSにコンパイルする
        ],
      },
    ],
  },
};
