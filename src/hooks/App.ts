import {useState, useEffect} from 'react';

import {IAppState, APP_STATE} from '@models/app';

export function useApp() {
  const [appState, setAppState] = useState<IAppState>(APP_STATE.SPLASH);

  useEffect(() => {
    initializeApp();
  }, []);

  async function initializeApp() {
    await showSplashScreen();
    await loadApp();
  }

  async function showSplashScreen() {
    return new Promise(resolve => {
      setTimeout(() => {
        setAppState(APP_STATE.LOADING);
        resolve(true);
      }, 200);
    });
  }

  async function loadApp() {
    setAppState(APP_STATE.LANDING);
  }

  return {
    appState,
  };
}
