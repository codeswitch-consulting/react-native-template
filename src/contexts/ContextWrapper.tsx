import React from 'react';

import AppProvider from './AppProvider';

interface IContextWrapper {
  children: JSX.Element | JSX.Element[];
}

export const ContextWrapper: React.FC<IContextWrapper> = ({children}) => (
  <AppProvider>{children}</AppProvider>
);
