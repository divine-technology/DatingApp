import {
  DimensionValue,
  ImageStyle,
  PressableStateCallbackType,
  StyleSheet,
  TextStyle,
  ViewStyle,
} from 'react-native';
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

const variants = (color: Color): {[key in Variant]: ComponentStyles} => {
  return {
    outlined: {
      pressableStyle: {
        borderWidth: 1,
        backgroundColor: undefined,
        borderColor: colors[color].backgroundColor,
      },
      textStyle: {
        color: colors[color].backgroundColor,
      },
    },
    filled: {
      pressableStyle: {
        backgroundColor: colors[color].backgroundColor,
      },
      textStyle: {
        color: colors[color].textColor,
      },
    },
    text: {
      pressableStyle: {
        backgroundColor: undefined,
      },
      textStyle: {
        color: colors[color].backgroundColor,
      },
    },
  };
};

type ComponentStyles = {
  pressableStyle?: ViewStyle | TextStyle | ImageStyle;
  textStyle?: TextStyle;
};

const colors: {[key in Color]: {textColor: string; backgroundColor: string}} = {
  primary: {
    backgroundColor: themeColors.primaryColor,
    textColor: themeColors.primaryTextColor,
  },
  secondary: {
    backgroundColor: themeColors.secondaryColor,
    textColor: themeColors.primaryTextColor,
  },
  warning: {
    backgroundColor: themeColors.warningColor,
    textColor: themeColors.primaryTextColor,
  },
};

const sizes: {[key in Size]: ViewStyle | TextStyle | ImageStyle} = {
  small: {padding: 4},
  medium: {padding: 8},
};

export type ButtonStyleProps = {
  variant: Variant;
  color?: Color;
  size: Size;
  width: DimensionValue;
};

export const styles =
  ({variant, size, color, width}: ButtonStyleProps) =>
  (state?: PressableStateCallbackType) =>
    StyleSheet.create({
      loginBtn: {
        width: width,
        borderRadius: 24,
        alignItems: 'center',
        justifyContent: 'center',
        opacity: state?.pressed ? 0.7 : 1,
        ...variants(color ?? Color.PRIMARY)[variant].pressableStyle,
        ...sizes[size],
      },
      loginText: {
        ...variants(color ?? Color.PRIMARY)[variant].textStyle,
      },
    });
