import React, {createContext, useState} from 'react';
import {NavigationContainerRefWithCurrent} from '@react-navigation/native';

import {Colors} from '@components/design';
import {IAppProviderContext} from '../models/providers';
import {LightMode} from '@models/app';

export const AppContext = createContext<IAppProviderContext>(
  {} as IAppProviderContext,
);

export interface IAppProvider {
  navRef:
    | NavigationContainerRefWithCurrent<ReactNavigation.RootParamList>
    | undefined;
  children: JSX.Element | JSX.Element[];
}

const AppProvider: React.FC<IAppProvider> = ({navRef, children}) => {
  const [mode, setMode] = useState<LightMode>('LIGHT');

  return (
    <AppContext.Provider
      value={{
        navRef,
        colors: Colors[mode],
      }}>
      {children}
    </AppContext.Provider>
  );
};

export default AppProvider;
