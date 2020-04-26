const path = require('path');

module.exports = {
  stories: ['../stories/**/*.stories.[tj]s'],
  addons: [
    '@storybook/addon-storysource',
    '@storybook/addon-knobs/register',
    '@storybook/addon-actions',
    '@storybook/addon-links',
    '@storybook/addon-notes/register'
  ],
  webpackFinal: async config => {
    config.module.rules.push({
      test: /\.(js|jsx|ts|tsx)$/,
      loader: require.resolve('babel-loader'),
      options: {
        presets: [['@babel/react', { flow: false, typescript: true }]],
      },
    });

    config.resolve.extensions.push('.ts', '.tsx', '.js', '.jsx');
    config.resolve.alias = {
      ...config.resolve.alias,
      '@shared': path.resolve(__dirname, '../src/shared')
    }

    return config;
  },
};
