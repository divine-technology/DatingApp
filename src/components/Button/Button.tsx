import {Pressable, PressableProps, Text} from 'react-native';
import React from 'react';
import {ButtonStyleProps, Color, Size, Variant, styles} from './Button.styles';

type ButtonProps = PressableProps & {
  text: string;
  isLoading?: boolean;
} & Partial<ButtonStyleProps>;

export const Button: React.FC<ButtonProps> = ({
  text,
  isLoading,
  variant = Variant.FILLED,
  color = Color.PRIMARY,
  size = Size.MEDIUM,
  ...rest
}) => {
  const style = styles({variant, color, size});
  return (
    <Pressable style={style.loginBtn} disabled={isLoading} {...rest}>
      <Text style={style.loginText}>{text}</Text>
      {/* {isLoading && <Loader />} */}
    </Pressable>
  );
};
