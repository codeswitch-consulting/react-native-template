import React from 'react';
import {render, screen, fireEvent} from '@testing-library/react-native';
import {Input} from './Input';

import AppProvider from '@contexts/AppProvider';

const onChangeTextMock = jest.fn();
const renderComponent = ({inputProps}: {inputProps?: any}) =>
  render(
    <AppProvider navRef={undefined}>
      <Input label="input" onChangeText={onChangeTextMock} {...inputProps} />
    </AppProvider>,
  );
describe('Input', () => {
  it('changes value', () => {
    renderComponent({});
    fireEvent.changeText(screen.getByRole(/text/i), 'text');
    expect(screen.getByRole(/text/i, {name: 'input-text-input'})).toBeDefined();
    expect(onChangeTextMock).toHaveBeenCalled();
  });
});
