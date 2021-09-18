module.exports = {
  plugins: [
    // 前缀追加
    require("autoprefixer")({
      overrideBrowserslist: [
        `> 1%`,
        `last 2 versions`,
        `not dead`,
        `not ie <= 8`,
        `Firefox > 20 `,
        `safari >= 7`,
      ],
      grid: true,
    }),
    require("postcss-flexbugs-fixes"),
  ],
};
