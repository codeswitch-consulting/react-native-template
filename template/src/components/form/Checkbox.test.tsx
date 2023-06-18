import React from 'react';
import {render, screen, fireEvent} from '@testing-library/react-native';
import {Text} from 'react-native';
import {CheckBox} from './Checkbox';
import AppProvider from '@contexts/AppProvider';

const onPressMock = jest.fn();

const renderComponent = ({checkboxProps}: {checkboxProps?: any}) =>
  render(
    <AppProvider navRef={undefined}>
      <CheckBox
        label="checkbox"
        onValueChange={onPressMock}
        {...checkboxProps}
      />
    </AppProvider>,
  );
describe('CheckBox', () => {
  it('fires on press action when pressed', () => {
    renderComponent({});
    fireEvent(screen.getByRole(/checkbox/i), 'onValueChange');
    expect(screen.getByRole(/checkbox/i)).toBeDefined();
    expect(onPressMock).toHaveBeenCalled();
  });
  it('defaults to label being on the right', () => {
    renderComponent({});
    expect(screen.getByRole(/checkbox/i)).toBeDefined();
    expect(
      screen.getByRole('text', {name: 'checkbox-right-label'}),
    ).toBeDefined();
  });
});
