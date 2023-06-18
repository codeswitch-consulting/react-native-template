import React, {useState, useEffect} from 'react';
import {StyleSheet} from 'react-native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {ModalPortal} from 'react-native-modals';
import SplashScreen from 'react-native-splash-screen';
import {
  NavigationContainer,
  useNavigationContainerRef,
} from '@react-navigation/native';

import {PostSplash} from '@screens/splash/PostSplash';
import {RootNavigator} from '@navigators/RootNavigator';
import {useApp} from '@hooks/App';
import {APP_STATE} from '@models/app';
import {DeepLinkingConfig} from '@utils/navigation';
import {ContextWrapper} from './src/contexts/ContextWrapper';

function App(): JSX.Element {
  const {appState} = useApp();
  const [navReady, setNavReady] = useState<boolean>(false);
  const navRef = useNavigationContainerRef();

  useEffect(() => {
    if (appState === APP_STATE.LOADING) {
      SplashScreen.hide();
    }
  }, [appState]);

  useEffect(() => {
    navRef.addListener('state', () => {
      navRef.isReady() && setNavReady(true);
    });
  }, [navRef.current]);

  console.log('app state: ', appState);
  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <NavigationContainer linking={DeepLinkingConfig} ref={navRef}>
        <ContextWrapper navRef={navReady ? navRef : undefined}>
          <SafeAreaProvider>
            {appState === APP_STATE.LOADING && <PostSplash />}
            {appState === APP_STATE.LANDING && <RootNavigator />}
            <ModalPortal />
          </SafeAreaProvider>
        </ContextWrapper>
      </NavigationContainer>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({});

export default App;
