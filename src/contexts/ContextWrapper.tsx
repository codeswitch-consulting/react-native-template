import React from 'react';
import {NavigationContainerRefWithCurrent} from '@react-navigation/native';

import AppProvider from './AppProvider';

interface IContextWrapper {
  navRef:
    | NavigationContainerRefWithCurrent<ReactNavigation.RootParamList>
    | undefined;
  children: JSX.Element | JSX.Element[];
}

export const ContextWrapper: React.FC<IContextWrapper> = ({
  navRef,
  children,
}) => <AppProvider navRef={navRef}>{children}</AppProvider>;
