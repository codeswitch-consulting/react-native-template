module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['.'],
        alias: {
          '@assets': './src/assets',
          '@components': './src/components',
          '@contexts': './src/contexts',
          '@hooks': './src/hooks',
          '@models': './src/models',
          '@navigators': './src/navigators',
          '@screens': './src/screens',
          '@services': './src/services',
          '@utils': './src/utils',
        },
      },
    ],
    'react-native-reanimated/plugin',
  ],
};
