export interface IColors {
  PRIMARY: string;
  SECONDARY: string;
  ERROR: string;
  DISABLED: string;
  TEXT: {
    DEFAULT: string;
  };
}

export interface IColorMap {
  LIGHT: IColors;
  DARK: IColors;
}

export const Colors: IColorMap = {
  LIGHT: {
    PRIMARY: 'blue',
    SECONDARY: 'blue',
    ERROR: 'red',
    DISABLED: 'gray',
    TEXT: {
      DEFAULT: 'black',
    },
  },
  DARK: {
    PRIMARY: 'blue',
    SECONDARY: 'blue',
    ERROR: 'red',
    DISABLED: 'gray',
    TEXT: {
      DEFAULT: 'black',
    },
  },
};

export type ThemeColorsProp =
  | (typeof Colors)['LIGHT']
  | (typeof Colors)['DARK'];
