import React, {useRef} from 'react';
import {StyleSheet, View, StyleProp, ViewStyle, TextStyle} from 'react-native';
import CheckBoxBase, {CheckBoxProps} from '@react-native-community/checkbox';

import {Fonts, Variant} from '@components/design';

export type CheckboxParams = {
  label?: string;
  labelSide?: 'left' | 'right';
  styles?: {
    container?: StyleProp<ViewStyle>;
    label?: StyleProp<TextStyle>;
    checkbox?: StyleProp<ViewStyle>;
  };
  variants?: {
    label?: Variant;
  };
} & CheckBoxProps;

export const CheckBox: React.FC<CheckboxParams> = ({
  label,
  labelSide = 'right',
  styles: customStyles = {},
  ...checkBoxProps
}) => {
  const ref = useRef<CheckBoxBase>(null);

  function _onCheck(value: boolean) {
    checkBoxProps?.onValueChange?.(value);
  }

  return (
    <View
      style={[styles.container, checkBoxProps.style, customStyles.container]}>
      {label && labelSide === 'left' && (
        <Fonts
          accessibilityRole="text"
          accessibilityLabel={`${label}-left-label`}
          variant="body-medium"
          size={16}
          style={[styles.label, customStyles.label]}>
          {label}
        </Fonts>
      )}
      <CheckBoxBase
        accessibilityRole="checkbox"
        accessibilityLabel={`${label}-checkbox`}
        ref={ref}
        disabled={false}
        boxType="square"
        {...checkBoxProps}
        onValueChange={_onCheck}
        style={[styles.checkbox, customStyles.checkbox || {}]}
      />
      {label && labelSide === 'right' && (
        <Fonts
          accessibilityRole="text"
          accessibilityLabel={`${label}-right-label`}
          variant="body-medium"
          size={16}
          style={[styles.label, customStyles.label]}>
          {label}
        </Fonts>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  /** Checkbox size does not update with Fast Refresh (known bug) */
  checkbox: {
    width: 28,
    height: 28,
    paddingTop: 0,
    paddingBottom: 0,
  },
  label: {
    marginLeft: 10,
  },
});
