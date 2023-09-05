import {
  DimensionValue,
  ImageStyle,
  PressableStateCallbackType,
  StyleSheet,
  TextStyle,
  ViewStyle
} from 'react-native';
import {themeColors} from '../../themes/colors';

const VariantOptions = {
  outlined: 'outlined',
  filled: 'filled',
  text: 'text'
};

export type Variant = keyof typeof VariantOptions;

const ColorOptions = {
  primary: 'primary',
  secondary: 'secondary',
  warning: 'warning'
};

export type Color = keyof typeof ColorOptions;

const SizeOptions = {
  xxs: 'xxs',
  xs: 'xs',
  small: 'small',
  medium: 'medium'
};

export type Size = keyof typeof SizeOptions;

const ShapeOptions = {
  round: 'round',
  rectangle: 'rectangle'
};

export type Shape = keyof typeof ShapeOptions;

const shapes: {[key in Shape]: ViewStyle} = {
  round: {borderRadius: 24},
  rectangle: {borderRadius: 8}
};

const variants = (color: Color): {[key in Variant]: ComponentStyles} => {
  return {
    outlined: {
      pressableStyle: {
        borderWidth: 1,
        backgroundColor: undefined,
        borderColor: colors[color].backgroundColor
      },
      textStyle: {
        color: colors[color].backgroundColor
      }
    },
    filled: {
      pressableStyle: {
        backgroundColor: colors[color].backgroundColor,
        shadowColor: '#000',
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: 0.5,
        shadowRadius: 2,
        elevation: 2
      },
      textStyle: {
        color: colors[color].textColor
      }
    },
    text: {
      pressableStyle: {
        backgroundColor: undefined
      },
      textStyle: {
        color: colors[color].backgroundColor
      }
    }
  };
};

type ComponentStyles = {
  pressableStyle?: ViewStyle | TextStyle | ImageStyle;
  textStyle?: TextStyle;
};

const colors: {[key in Color]: {textColor: string; backgroundColor: string}} = {
  primary: {
    backgroundColor: themeColors.primaryColor,
    textColor: themeColors.primaryTextColor
  },
  secondary: {
    backgroundColor: themeColors.secondaryColor,
    textColor: themeColors.primaryTextColor
  },
  warning: {
    backgroundColor: themeColors.warningColor,
    textColor: themeColors.primaryTextColor
  }
};

const sizes: {[key in Size]: ViewStyle | TextStyle | ImageStyle} = {
  xxs: {padding: 0},
  xs: {padding: 2},
  small: {padding: 4},
  medium: {padding: 8}
};

export type ButtonStyleProps = {
  variant: Variant;
  color: Color;
  size: Size;
  shape: Shape;
  width: DimensionValue;
};

export const styles =
  ({variant, size, color, width, shape}: ButtonStyleProps) =>
  (state?: PressableStateCallbackType) =>
    StyleSheet.create({
      loginBtn: {
        width: width,
        borderWidth: 1,
        borderColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
        opacity: state?.pressed ? 0.7 : 1,
        ...variants(color)[variant].pressableStyle,
        ...sizes[size],
        ...shapes[shape]
      },
      loginText: {
        ...variants(color)[variant].textStyle
      }
    });
