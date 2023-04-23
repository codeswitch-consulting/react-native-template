import React, {createContext} from 'react';

import {IAppProviderContext} from '../models/providers';

export const AppContext = createContext<IAppProviderContext>(
  {} as IAppProviderContext,
);

export interface IAppProvider {
  children: JSX.Element | JSX.Element[];
}

const AppProvider: React.FC<IAppProvider> = ({children}) => {
  return <AppContext.Provider value={{}}>{children}</AppContext.Provider>;
};

export default AppProvider;
