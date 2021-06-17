import { Color, makeStyles, Theme } from '@material-ui/core';
import { createMuiTheme } from '@material-ui/core/styles';
import createPalette, { Palette, PaletteColor, SimplePaletteColorOptions } from '@material-ui/core/styles/createPalette';
import { Styles } from '@material-ui/core/styles/withStyles';
import { blue, green } from 'styles/colorVariants'

interface IPalette extends Palette {
  primary: PaletteColor & Partial<Color>,
  surface?: SimplePaletteColorOptions
}

interface TAwesomeTheme extends Theme {
  palette: IPalette
}

export const AwesomeTheme: TAwesomeTheme = createMuiTheme({
  palette: {
    primary: {
      main: blue[500],
      dark: blue[800],
      light: blue[400],
      ...blue
    },
    secondary: {
      main: green[500],
      ...green
    },
    background: {
      default: "#fcfcfc",
      paper: "#ffffff"
    },
    text: {
      primary: "#000000"
    },
    error: {
      main: "#F9DEE6",
      contrastText: "#EB2131"
    }
  },
  typography: {
    h1: {
      fontFamily: 'Montserrat, Verdana',
      fontSize: "80px",
      fontWeight: 'bold',
      lineHeight: "112px"
    },
    h2: {
      fontFamily: 'Montserrat, Verdana',
      fontSize: "60px",
      fontWeight: 'bold',
      lineHeight: "72px"
    },
    h3: {
      fontFamily: 'Montserrat, Verdana',
      fontSize: "48px",
      fontWeight: 'bold',
      lineHeight: "56px"
    },
    h4: {
      fontFamily: 'Montserrat, Verdana',
      fontSize: "34px",
      fontWeight: 'bold',
      lineHeight: "40px"
    },
    h5: {
      fontFamily: 'Montserrat, Verdana',
      fontSize: "24px",
      fontWeight: 700,
      lineHeight: "24px"
    },
    h6: {
      fontFamily: 'Montserrat, Verdana',
      fontSize: "20px",
      fontWeight: 700,
      lineHeight: "24px"
    },
    subtitle1: {
      fontFamily: 'Inter, Verdana',
      fontSize: "16px",
      fontWeight: 500,
      lineHeight: "20px"
    },
    subtitle2: {
      fontFamily: 'Inter, Verdana',
      fontSize: "14px",
      fontWeight: 500,
      lineHeight: "18px"
    },
    body1: {
      fontFamily: 'Inter, Verdana',
      fontSize: "16px",
      fontWeight: "normal",
      lineHeight: "24px"
    },
    body2: {
      fontFamily: 'Inter, Verdana',
      fontSize: "14px",
      fontWeight: "normal",
      lineHeight: "20px"
    },
    button: {
      fontFamily: 'Inter, Verdana',
      fontSize: "13px",
      fontWeight: 600,
      lineHeight: "16px"
    },
    caption: {
      fontFamily: 'Inter, Verdana',
      fontSize: "12px",
      fontWeight: "normal",
      lineHeight: "16px"
    },
    overline: {
      fontFamily: 'Inter, Verdana',
      fontSize: "11px",
      fontWeight: "normal",
      lineHeight: "12px"
    }
  }
});

export const makeStylesWithAwesomeTheme = <
  Props extends object = {},
  ClassKey extends string = string
>(customTheme: Styles<TAwesomeTheme, Props, ClassKey>) => makeStyles(customTheme, { defaultTheme: AwesomeTheme })
