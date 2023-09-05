import {
  DimensionValue,
  Pressable,
  PressableProps,
  Text,
  TextStyle
} from 'react-native';
import React from 'react';
import {ButtonStyleProps, Color, Size, Variant, styles} from './Button.styles';

type ButtonProps = PressableProps & {
  text: string;
  isLoading?: boolean;
  width?: DimensionValue;
  textStyle?: TextStyle;
} & Partial<ButtonStyleProps>;

export const Button: React.FC<ButtonProps> = ({
  text,
  isLoading,
  textStyle,
  width = '100%',
  variant = 'filled',
  color = 'primary',
  size = 'medium',
  shape = 'round',
  ...rest
}) => {
  const style = styles({variant, color, size, width, shape});
  return (
    <Pressable
      style={state => style(state).loginBtn}
      disabled={isLoading}
      {...rest}>
      <Text style={[style().loginText, textStyle]}>{text}</Text>
      {/* {isLoading && <Loader />} */}
    </Pressable>
  );
};
