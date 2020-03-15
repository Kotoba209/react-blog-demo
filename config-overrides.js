// const { injectBabelPlugin } = require('react-app-rewired');

const {
  override,
  fixBabelImports,
  addDecoratorsLegacy,
  addLessLoader
} = require('customize-cra');

// const {
//   addLessLoader,
//   fixBabelImports,
//   addBabelPlugin,
//   addBabelPlugins,
//   useBabelRc
// } = require('customize-cra');


module.exports = override(
  addLessLoader({
    strictMath: true,
    noIeCompat: true,
    javascriptEnabled: true,
    modifyVars: { "@primary-color": "#1DA570" }
  }),
  fixBabelImports('import', {
    libraryName: 'antd',
    libraryDirectory: 'es',
    style: 'css',
  }),
  addDecoratorsLegacy(),
);