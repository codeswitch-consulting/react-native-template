import React, {useState} from 'react';
import {render, screen, fireEvent} from '@testing-library/react-native';
import {InputNumericStepper} from './InputNumericStepper';
import AppProvider from '@contexts/AppProvider';

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
const renderComponent = ({inputProps}: {inputProps?: any}) =>
  render(
    <AppProvider navRef={undefined}>
      <TestContainer {...{inputProps}} />
    </AppProvider>,
  );

describe('InputNumericStepper', () => {
  it('changes value up', () => {
    renderComponent({});
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
    renderComponent({});
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

  it('does not go higher than the max', () => {
    renderComponent({inputProps: {maxValue: 2}});
    fireEvent.press(
      screen.getByRole(/image/i, {name: 'input-numeric-stepper-up'}),
    );
    fireEvent.press(
      screen.getByRole(/image/i, {name: 'input-numeric-stepper-up'}),
    );
    expect(
      screen.getByRole(/text/i, {name: 'label-text-input'}).props.value,
    ).toBe('2');
  });

  it('does not go lower than the min', () => {
    renderComponent({inputProps: {minValue: 0}});
    fireEvent.press(
      screen.getByRole(/image/i, {name: 'input-numeric-stepper-down'}),
    );
    fireEvent.press(
      screen.getByRole(/image/i, {name: 'input-numeric-stepper-down'}),
    );
    expect(
      screen.getByRole(/text/i, {name: 'label-text-input'}).props.value,
    ).toBe('0');
  });
});
