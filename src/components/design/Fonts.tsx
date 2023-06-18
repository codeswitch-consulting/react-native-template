import React, {useContext} from 'react';
import {PixelRatio, Text, StyleProp, TextStyle, TextProps} from 'react-native';

import {AppContext} from '@contexts/AppProvider';
import {capitalize} from '@utils/app';

export type Variant =
  | 'header-bold'
  | 'header-semi'
  | 'body-bold'
  | 'body-medium'
  | 'body-regular'
  | 'error';

export interface IFontProps extends TextProps {
  variant?: Variant;
  color?: string;
  size?: number;
  style?: StyleProp<TextStyle>;
  children: string | string[] | JSX.Element | JSX.Element[];
  props?: any;
  onPress?: any;
}

const fontScale = PixelRatio.getFontScale();

export const Fonts: React.FC<IFontProps> = ({
  variant = 'body-regular',
  color,
  size = 16,
  style: customStyle = {},
  children,
  ...props
}) => {
  const {colors} = useContext(AppContext);

  const [type, style] = variant.split('-');
  const variantStyle =
    type === 'error'
      ? [styles.errorBase, {color: colors.ERROR}]
      : [
          styles[`${type}Base`],
          styles[`${type}${capitalize(style)}`],
          {color: color || colors.TEXT.DEFAULT},
          {fontSize: size - size * (Math.max(fontScale, 1) - 1.1)}, // Scale down text based on user's font scale; Using 1.1 to keep it scaled up slightly
        ];

  return (
    <Text {...props} style={[variantStyle, customStyle]}>
      {children && children}
    </Text>
  );
};

interface IStylesProp {
  [variant: string]: StyleProp<TextStyle>;
}
export const styles: IStylesProp = {
  label: {
    fontWeight: '800',
    fontSize: 11.5,
    textTransform: 'uppercase',
  },
  headerBase: {
    fontFamily: 'Montserrat',
  },
  headerBold: {
    fontWeight: '700',
  },
  headerSemi: {
    fontWeight: '600',
  },
  bodyBase: {
    fontFamily: 'Avenir',
  },
  bodyBold: {
    fontWeight: '900',
  },
  bodyMedium: {
    fontWeight: '500',
  },
  bodyRegular: {
    fontWeight: '400',
  },
  errorBase: {
    fontFamily: 'Poppins',
    fontWeight: '500',
  },
};
