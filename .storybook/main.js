module.exports = {
  stories: ['../stories/**/*.stories.[tj]s'],
  addons: ['@storybook/addon-actions', '@storybook/addon-links'],
  webpackFinal: async config => {
    config.module.rules.push({
      test: /\.(js|jsx|ts|tsx)$/,
      loader: require.resolve('babel-loader'),
      options: {
        presets: [['@babel/react', { flow: false, typescript: true }]],
      },
    });

    config.resolve.extensions.push('.ts', '.tsx', '.js', '.jsx');

    return config;
  },
};
