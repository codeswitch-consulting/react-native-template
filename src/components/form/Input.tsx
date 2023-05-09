import React, {useState, useContext} from 'react';
import {
  StyleSheet,
  View,
  ViewStyle,
  TextStyle,
  TextInput,
  TouchableOpacity,
  TextInputProps,
  StyleProp,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {SvgProps} from 'react-native-svg';

import {AppContext} from '@contexts/AppProvider';
import {Fonts, IFontProps, Colors} from '@components/design';
import {capitalize} from '@utils/app';

type Variant = 'primary' | 'small';
type CapitlizedVariant = 'Primary';

export type IInputField = {
  variant?: Variant;
  label?: string | JSX.Element;
  labelHint?: string;
  onHintPress?: () => void;
  leftAdornment?: React.ReactElement<SvgProps> | null | JSX.Element;
  rightButton?: () => JSX.Element;
  secure?: boolean;
  errors?: string[];
  required?: boolean;
  disabled?: boolean;
  styles?: {
    container?: StyleProp<ViewStyle>;
    label?: Partial<IFontProps>;
    textArea?: StyleProp<TextStyle | ViewStyle>;
  };
} & TextInputProps;

export const Input: React.FC<IInputField> = ({
  variant = 'primary',
  label,
  leftAdornment: LeftAdornmentComponent,
  rightButton: RightButton,
  onHintPress,
  secure = false,
  errors = [],
  required = false,
  styles: customStyle = {},
  ...textFieldProps
}) => {
  const {colors} = useContext(AppContext);

  const [secureMode, setSecureMode] = useState<boolean>(secure);

  function _toggleSecure() {
    secure && setSecureMode(state => !state);
  }

  const styles = getStyles(colors);
  const fieldHasErrors =
    errors.length > 0 && errors.some((error: string) => error !== '');
  const variantStyle: (ViewStyle & TextStyle)[] = [
    styles.variantBase,
    styles[`variant${capitalize(variant) as CapitlizedVariant}`],
    fieldHasErrors ? styles.fieldError : {},
    textFieldProps.multiline
      ? {...styles.textArea, ...((customStyle?.textArea as object) || {})}
      : {},
    LeftAdornmentComponent ? styles.withIcon : {},
  ];

  return (
    <View style={[styles.container, customStyle.container]}>
      {label && (
        <View style={styles.labelContainer}>
          <Fonts
            variant="body-medium"
            size={16}
            color={colors.TEXT.DEFAULT}
            style={styles.label}
            {...customStyle.label}>
            {label}
          </Fonts>
          {required && (
            <Fonts
              variant="body-medium"
              size={16}
              color={colors.ERROR}
              style={styles.label}
              {...customStyle.label}>
              {'  *'}
            </Fonts>
          )}
          {onHintPress && (
            <TouchableOpacity onPress={onHintPress}>
              <Icon
                name="exclamation-circle"
                size={24}
                style={styles.labelHint}
              />
            </TouchableOpacity>
          )}
        </View>
      )}
      <View style={styles.textField}>
        <TextInput
          {...textFieldProps}
          secureTextEntry={secureMode}
          placeholderTextColor={colors.TEXT.DEFAULT}
          style={[variantStyle]}
          accessibilityRole="text"
          accessibilityLabel={`${label}-text-input`}
        />
        {secure && (
          <TouchableOpacity onPress={_toggleSecure} style={styles.secureIcon}>
            <Icon name="lock" size={24} />
          </TouchableOpacity>
        )}
        {LeftAdornmentComponent && (
          <View style={styles.leftAdornment}>{LeftAdornmentComponent}</View>
        )}
        {RightButton && (
          <View style={styles.rightButton}>
            <RightButton />
          </View>
        )}
        {fieldHasErrors && (
          <View style={styles.errors}>
            {errors.map((error: string) => (
              <Fonts variant="error" size={12}>
                {error}
              </Fonts>
            ))}
          </View>
        )}
      </View>
    </View>
  );
};

const getStyles = (
  colors: (typeof Colors)['LIGHT'] | (typeof Colors)['DARK'],
) =>
  StyleSheet.create({
    container: {},
    labelContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 12,
    },
    label: {
      textTransform: 'uppercase',
    },
    textField: {
      position: 'relative',
    },
    textArea: {
      textAlignVertical: 'top',
      minHeight: 130,
    },
    fieldError: {
      borderWidth: 2,
    },
    fieldFocused: {},
    labelHint: {
      marginLeft: 10,
    },
    secureIcon: {
      position: 'absolute',
      top: 13,
      right: 10,
    },
    leftAdornment: {
      position: 'absolute',
      top: 13,
      left: 10,
    },
    rightButton: {
      position: 'absolute',
      top: 13,
      right: 10,
    },
    withIcon: {
      paddingLeft: 40,
    },
    errors: {
      marginTop: 5,
      paddingHorizontal: 5,
      borderColor: colors.ERROR,
    },
    variantBase: {
      height: 50,
      padding: 10,
      borderRadius: 12,
      borderWidth: 1,
    },
    variantPrimary: {
      // borderColor: colors.LABEL,
      color: colors.TEXT.DEFAULT,
    },
  });
