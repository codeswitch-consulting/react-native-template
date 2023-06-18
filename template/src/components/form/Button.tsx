import React, {useContext} from 'react';
import {
  Platform,
  View,
  StyleSheet,
  StyleProp,
  TextStyle,
  ViewStyle,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import {AppContext} from '@contexts/AppProvider';
import {Fonts, Colors} from '@components/design';
import {NO_OP} from '@utils/app';

export type Variant = 'primary' | 'secondary' | 'outline';

type ButtonProps = {
  onPress: () => void;
  variant?: Variant;
  buttonStyles?: {
    container?: StyleProp<ViewStyle>;
    label?: StyleProp<TextStyle>;
  };
  label?: string;
  disabled?: boolean;
  componentLabel?: JSX.Element | any;
  leftAdornment?: string | JSX.Element;
  leftAdornmentStyles?: StyleProp<any>;
};

export const Button: React.FC<ButtonProps> = ({
  onPress = NO_OP,
  variant = 'primary',
  buttonStyles = {},
  label,
  disabled = false,
  componentLabel: ComponentLabel,
  leftAdornment: LeftAdornment,
  leftAdornmentStyles,
}) => {
  const {colors} = useContext(AppContext);
  const styles = getStyles(colors);

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled}
      style={[
        styles?.container,
        styles[variant] || {},
        buttonStyles?.container,
        disabled && variant !== 'outline' ? styles.disabled : {},
      ]}>
      {LeftAdornment && typeof LeftAdornment === 'string' && (
        <Icon
          accessibilityRole="image"
          accessibilityLabel={`${LeftAdornment}-icon`}
          name={LeftAdornment}
          size={12}
          color={colors.PRIMARY}
          style={leftAdornmentStyles || {}}
        />
      )}
      {LeftAdornment && typeof LeftAdornment !== 'string' && (
        <View style={styles.leftAdornment}>{LeftAdornment}</View>
      )}

      {label && (
        <Fonts
          variant="body-bold"
          size={16}
          style={[styles[`${variant}Label`], buttonStyles.label || {}]}>
          {label}
        </Fonts>
      )}
      {ComponentLabel && ComponentLabel}
    </TouchableOpacity>
  );
};

const getStyles = (
  colors: (typeof Colors)['LIGHT'] | (typeof Colors)['DARK'],
) =>
  StyleSheet.create({
    container: {
      width: '100%',
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 16,
      paddingVertical: 15,
      paddingHorizontal: 5,
      elevation: 2,
    },
    label: {},
    leftAdornment: {
      position: 'absolute',
      top: 12,
      left: '5%',
      width: 24,
    },
    rightAdornment: {},
    disabled: {
      borderColor: colors.DISABLED,
      backgroundColor: colors.DISABLED,
    },
    primary: {
      backgroundColor: colors.PRIMARY,
      borderColor: colors.PRIMARY,
      borderWidth: 1,
    },
    primaryLabel: {
      flex: 1,
      textAlign: 'center',
      color: colors.TEXT.DEFAULT,
    },
    secondary: {
      backgroundColor: colors.SECONDARY,
    },
    secondaryLabel: {
      flex: 1,
      textAlign: 'center',
      color: colors.TEXT.DEFAULT,
    },
    outline: {
      backgroundColor: Platform.OS === 'android' ? 'white' : 'transparent',
      borderColor: colors.PRIMARY,
      borderWidth: 1,
    },
    outlineLabel: {
      flex: 1,
      textAlign: 'center',
      color: colors.PRIMARY,
    },
  });
