/**
 * @format
 */

import React from 'react';
jest.mock('react-native-gesture-handler');
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import App from './App';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';

it('renders correctly', () => {
  jest
    .mocked(GestureHandlerRootView)
    .mockImplementation(({children}) => <>{children}</>);
  renderer.create(<App />);
});
