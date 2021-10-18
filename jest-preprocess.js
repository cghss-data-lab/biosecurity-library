// The transform section of `jest.config.js` tells Jest that all js or jsx
// files need to be transformed using a jest-preprocess.js file in the
// project root.
// https://www.gatsbyjs.com/docs/how-to/testing/unit-testing/
const babelOptions = {
  presets: ['babel-preset-gatsby', '@babel/preset-typescript'],
}

module.exports = require('babel-jest').default.createTransformer(babelOptions)
