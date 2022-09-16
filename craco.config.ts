const CracoAlias = require('craco-alias');

export var plugins = [
  {
    plugin: CracoAlias,
    options: {
      source: 'tsconfig',
      // baseUrl SHOULD be specified
      // plugin does not take it from tsconfig
      baseUrl: './src',
      // tsConfigPath should point to the file where "baseUrl" and "paths" are specified
      tsConfigPath: './tsconfig.extend.json',
    },
  },
];
// eslint-disable-next-line import/no-anonymous-default-export
export const babel={
  loaderOptions: {
    babelrc: true
  },

};
export const devServer = {
  port: process.env.APP_PORT || 3000,
};
const defaultExp = {
  plugins,
  devServer,
  babel,
};
export default defaultExp;
