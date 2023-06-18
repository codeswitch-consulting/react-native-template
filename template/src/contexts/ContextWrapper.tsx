import React from 'react';
import {NavigationContainerRefWithCurrent} from '@react-navigation/native';

import AppProvider from './AppProvider';
import {NativeBaseProvider} from 'native-base';

interface IContextWrapper {
  navRef:
    | NavigationContainerRefWithCurrent<ReactNavigation.RootParamList>
    | undefined;
  children: JSX.Element | JSX.Element[];
}

export const ContextWrapper: React.FC<IContextWrapper> = ({
  navRef,
  children,
}) => (
  <NativeBaseProvider>
    <AppProvider navRef={navRef}>{children}</AppProvider>
  </NativeBaseProvider>
);
