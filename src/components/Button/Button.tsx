import {Pressable, PressableProps, Text} from 'react-native';
import {styles} from '../../screens/login/Login.styles';
import React from 'react';

type ButtonProps = PressableProps & {
  text: string;
};

export const Button: React.FC<ButtonProps> = ({text, ...rest}) => {
  return (
    <Pressable style={styles.loginBtn} {...rest}>
      <Text style={styles.loginText}>{text}</Text>
    </Pressable>
  );
};
