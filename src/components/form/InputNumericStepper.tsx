import React, {Dispatch, SetStateAction, useContext} from 'react';
import {StyleSheet, View, StyleProp, ViewStyle} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

import {AppContext} from '@contexts/AppProvider';
import {ThemeColorsProp} from '@components/design';
import {Input} from './Input';

interface IInputNumericStepper {
  value: number;
  maxValue?: number;
  setValue: Dispatch<SetStateAction<number>>;
  styles?: {
    container: StyleProp<ViewStyle>;
  };
}

export const InputNumericStepper: React.FC<IInputNumericStepper> = ({
  value,
  maxValue,
  setValue,
  styles: customStyles = {},
}) => {
  const {colors} = useContext(AppContext);

  function _onIncrease() {
    setValue(state => (maxValue ? Math.min(maxValue, +state + 1) : +state + 1));
  }

  function _onDecrease() {
    setValue(state => Math.max(+state - 1, 0));
  }

  const styles = getStyles(colors);

  return (
    <View style={[styles.container, customStyles.container]}>
      <Input
        variant="small"
        value={`${value}`}
        styles={{container: styles.input}}
        disabled
      />
      <View style={styles.steppers}>
        <Icon
          accessibilityRole="image"
          accessibilityLabel="input-numeric-stepper-up"
          name="chevron-up"
          size={20}
          onPress={_onIncrease}
          style={styles.up}
        />
        <Icon
          accessibilityRole="image"
          accessibilityLabel="input-numeric-stepper-down"
          name="chevron-down"
          size={20}
          onPress={_onDecrease}
          style={styles.down}
        />
      </View>
    </View>
  );
};

const getStyles = (colors: ThemeColorsProp) =>
  StyleSheet.create({
    container: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    input: {
      marginLeft: 10,
      width: 50,
    },
    steppers: {
      marginLeft: 10,
    },
    up: {},
    down: {
      marginTop: 10,
    },
  });
