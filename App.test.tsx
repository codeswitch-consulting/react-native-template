import React from 'react';
import App from './App';
import {render} from '@testing-library/react-native';

jest.mock('react-native-gesture-handler', () => {
  return {
    GestureHandlerRootView: ({children}: {children: JSX.Element}) => (
      <>{children}</>
    ),
  };
});

describe('App', () => {
  it('renders correctly', () => {
    render(<App />);
  });
});
