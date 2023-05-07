import {NavigationContainerRefWithCurrent} from '@react-navigation/native';

import {Colors} from '@components/design';

export interface IAppProviderContext {
  navRef?: NavigationContainerRefWithCurrent<ReactNavigation.RootParamList>;
  colors: (typeof Colors)['LIGHT'] | (typeof Colors)['DARK'];
}
