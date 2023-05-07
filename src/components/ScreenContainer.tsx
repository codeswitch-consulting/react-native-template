import React, {useContext} from 'react';
import {
  ActivityIndicator,
  StyleSheet,
  StyleProp,
  ViewStyle,
  View,
  KeyboardAvoidingView,
  StatusBar,
  Platform,
} from 'react-native';
import {useSafeAreaInsets, EdgeInsets} from 'react-native-safe-area-context';

import {AppContext} from '@contexts/AppProvider';

interface IScreenContainer {
  loading?: boolean;
  notchColor?: string;
  style?: StyleProp<ViewStyle>;
  notchStyle?: StyleProp<ViewStyle>;
  contentContainerStyle?: StyleProp<ViewStyle>;
  children?: React.ReactNode | JSX.Element | JSX.Element[];
  avoidKeyboard?: boolean;
}

export const ScreenContainer: React.FC<IScreenContainer> = ({
  loading,
  notchColor,
  style: customStyle = {},
  contentContainerStyle = {},
  notchStyle = {},
  avoidKeyboard,
  children,
}) => {
  const insets = useSafeAreaInsets();

  const styles = getStyles(insets, notchColor);

  if (avoidKeyboard) {
    return (
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={[styles.container, customStyle]}
        contentContainerStyle={contentContainerStyle}>
        <StatusBar backgroundColor={notchColor} barStyle="dark-content" />
        <View style={[styles.topNotch, notchStyle]} />
        {children}
        {loading && <ActivityIndicator style={styles.loading} />}
      </KeyboardAvoidingView>
    );
  }

  console.log('using screen container...');
  return (
    <View style={[styles.container, customStyle]}>
      <StatusBar backgroundColor={notchColor} barStyle="dark-content" />
      <View style={[styles.topNotch, notchStyle]} />
      {children}
      {loading && <ActivityIndicator style={styles.loading} />}
    </View>
  );
};

const getStyles = (insets: EdgeInsets, notchColor?: string) =>
  StyleSheet.create({
    container: {
      flex: 1,
      paddingBottom: insets.bottom,
    },
    topNotch: {
      height: insets.top,
      backgroundColor: notchColor,
    },
    loading: {
      position: 'absolute',
      top: 0,
      right: 0,
      bottom: 0,
      left: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.25)',
    },
  });
