import {Controller, FieldValues, UseControllerProps} from 'react-hook-form';
import {TextInput, TextInputProps} from 'react-native';
import {styles} from '../../screens/login/Login.styles';
import React from 'react';

type ControlledInputProps<T extends FieldValues> = UseControllerProps<T> &
  InputProps;

type InputProps = TextInputProps & {};

export const Input: React.FC<InputProps> = props => {
  return <TextInput style={styles.inputText} {...props} />;
};

export const ControlledInput = <T extends FieldValues>({
  control,
  name,
  ...rest
}: ControlledInputProps<T>) => {
  return (
    <Controller
      control={control}
      name={name}
      rules={{}}
      render={({field: {ref: _ref, onChange, ...restField}}) => (
        <Input onChangeText={onChange} {...restField} {...rest} />
      )}
    />
  );
};
