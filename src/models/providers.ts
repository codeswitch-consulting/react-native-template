import {NavigationContainerRefWithCurrent} from '@react-navigation/native';

import {Colors} from '@components/design';
import {LightMode} from './app';

export interface IAppProviderContext {
  navRef?: NavigationContainerRefWithCurrent<ReactNavigation.RootParamList>;
  colors: (typeof Colors)['LIGHT'] | (typeof Colors)['DARK'];
  setMode?: React.Dispatch<React.SetStateAction<LightMode>>;
}
