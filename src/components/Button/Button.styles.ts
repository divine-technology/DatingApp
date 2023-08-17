import {ImageStyle, StyleSheet, TextStyle, ViewStyle} from 'react-native';
import {themeColors} from '../../themes/colors';

export enum Variant {
  OUTLINED = 'outlined',
  FILLED = 'filled',
  TEXT = 'text',
}

export enum Color {
  PRIMARY = 'primary',
  SECONDARY = 'secondary',
  WARNING = 'warning',
}

export enum Size {
  SMALL = 'small',
  MEDIUM = 'medium',
}

const variants: {[key in Variant]: ViewStyle | TextStyle | ImageStyle} = {
  outlined: {borderWidth: 1, backgroundColor: undefined},
  filled: {},
  text: {backgroundColor: undefined, borderWidth: 0},
};

const colors: {[key in Color]: ViewStyle | TextStyle | ImageStyle} = {
  primary: {
    backgroundColor: themeColors.primaryColor,
    borderColor: themeColors.primaryColor,
  },
  secondary: {
    backgroundColor: themeColors.secondaryColor,
    borderColor: themeColors.secondaryColor,
  },
  warning: {
    backgroundColor: themeColors.warningColor,
    borderColor: themeColors.warningColor,
  },
};

const sizes: {[key in Size]: ViewStyle | TextStyle | ImageStyle} = {
  small: {padding: 4},
  medium: {padding: 8},
};

export type ButtonStyleProps = {variant: Variant; color?: Color; size: Size};

export const styles = ({variant, size, color}: ButtonStyleProps) =>
  StyleSheet.create({
    loginBtn: {
      width: '100%',
      borderRadius: 24,
      alignItems: 'center',
      justifyContent: 'center',
      ...(color ? colors[color] : {}),
      ...variants[variant],
      ...sizes[size],
    },
    loginText: {
      color: 'white',
    },
  });
