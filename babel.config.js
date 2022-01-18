module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      'babel-plugin-root-import',
      // 'react-native-reanimated/plugin',
      {
        strictMode: false,
        allowTopLevelThis: true,
        loose: true,
        paths: [
          {
            rootPathSuffix: './src',
            rootPathPrefix: '@src',
          },
          {
            rootPathSuffix: './src/utils',
            rootPathPrefix: '!/',
          },
        ],
      },
    ],
  ],
};
