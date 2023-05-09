import React, {Component} from 'react';
import {render, screen, fireEvent} from '@testing-library/react-native';
import {Text} from 'react-native';
jest.mock('react-native-vector-icons/MaterialCommunityIcons');
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {Button} from './Button';
import AppProvider from '@contexts/AppProvider';
import {IconProps} from 'react-native-vector-icons/Icon';

const onPressMock = jest.fn();

const renderButton = ({buttonProps}: {buttonProps?: any}) =>
  render(
    <AppProvider navRef={undefined}>
      <Button label="button" onPress={onPressMock} {...buttonProps} />
    </AppProvider>,
  );
describe('Button', () => {
  it('fires on press action when pressed', () => {
    renderButton({});
    const button = screen.getByText(/button/i);
    fireEvent.press(button);
    expect(onPressMock).toHaveBeenCalled();
  });

  it('displays custom left adornment', () => {
    const leftAdornment = <Text>hello world</Text>;
    renderButton({buttonProps: {leftAdornment}});
    const button = screen.getByText(/hello world/i);
    expect(button).toBeVisible();
  });

  it('displays icon when left adornment is string', () => {
    renderButton({buttonProps: {leftAdornment: 'exclamation'}});
  });
});
