import React, {useState} from 'react';
import {render, screen, fireEvent} from '@testing-library/react-native';
import {InputNumericStepper} from './InputNumericStepper';
import AppProvider from '@contexts/AppProvider';

const setValueMock = jest.fn();
const TestContainer = ({inputProps}: {inputProps?: any}) => {
  const [value, setValue] = useState(1);
  return (
    <InputNumericStepper
      label="input"
      value={value}
      setValue={setValue}
      {...inputProps}
    />
  );
};
const renderButton = ({inputProps}: {inputProps?: any}) =>
  render(
    <AppProvider navRef={undefined}>
      <TestContainer {...inputProps} />
    </AppProvider>,
  );
describe('InputNumericStepper', () => {
  it('changes value up', () => {
    renderButton({});
    expect(
      screen.getByRole(/text/i, {name: 'label-text-input'}).props.value,
    ).toBe('1');
    fireEvent.press(
      screen.getByRole(/image/i, {name: 'input-numeric-stepper-up'}),
    );
    expect(
      screen.getByRole(/text/i, {name: 'label-text-input'}).props.value,
    ).toBe('2');
  });
  it('changes value down', () => {
    renderButton({});
    expect(
      screen.getByRole(/text/i, {name: 'label-text-input'}).props.value,
    ).toBe('1');
    fireEvent.press(
      screen.getByRole(/image/i, {name: 'input-numeric-stepper-down'}),
    );
    expect(
      screen.getByRole(/text/i, {name: 'label-text-input'}).props.value,
    ).toBe('0');
  });
});
