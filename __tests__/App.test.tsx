/**
 * @format
 */

import React from 'react';
import {View} from 'react-native';
import App from '../App';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';

jest.mock('react-native-gesture-handler', () => {
  return {
    GestureHandlerRootView: ({children}) => <>{children}</>,
  };
});

it('renders correctly', () => {
  renderer.create(<App />);
});
