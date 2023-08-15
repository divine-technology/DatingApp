import {Controller} from 'react-hook-form';
import {TextInput, TextInputProps} from 'react-native';
import {styles} from '../../screens/login/Login.styles';
import React from 'react';

interface ControlledInputProps {
  control: any;
  name: string;
  isRequired: boolean;
  placeHolder: string;
  placeHolderTextColor: string;
}

type InputProps = TextInputProps & {};

export const Input: React.FC<InputProps> = props => {
  return <TextInput style={styles.inputText} {...props} />;
};

export const ControlledInput: React.FC<ControlledInputProps> = ({
  control,
  name,
  isRequired,
  placeHolder,
  placeHolderTextColor,
}) => {
  return (
    <Controller
      control={control}
      name={name}
      rules={{required: isRequired}}
      render={({field}) => (
        <Input
          placeholder={placeHolder}
          placeholderTextColor={placeHolderTextColor}
          {...field}
        />
      )}
    />
  );
};
