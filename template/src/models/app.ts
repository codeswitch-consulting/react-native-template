export type IAppState =
  | 'SPLASH'
  | 'NOT_STARTED'
  | 'LOADING'
  | 'LANDING'
  | 'STARTED';

export const APP_STATE: Record<IAppState, IAppState> = {
  SPLASH: 'SPLASH',
  NOT_STARTED: 'NOT_STARTED',
  LOADING: 'LOADING',
  LANDING: 'LANDING',
  STARTED: 'STARTED',
};

export type LightMode = 'LIGHT' | 'DARK';
