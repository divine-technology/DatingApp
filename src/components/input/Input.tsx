import {
  Controller,
  FieldError,
  FieldValues,
  UseControllerProps,
} from 'react-hook-form';
import {Text, TextInput, TextInputProps, View} from 'react-native';
import React from 'react';
import {styles} from './Input.styles';
import {themeColors} from '../../themes/colors';

type ControlledInputProps<T extends FieldValues> = UseControllerProps<T> &
  InputProps;

type InputProps = TextInputProps & {
  error?: FieldError;
};

export const Input: React.FC<InputProps> = ({error, ...rest}) => {
  const style = styles({error});
  return (
    <View>
      <TextInput
        style={style.textInput}
        placeholderTextColor={themeColors.primaryTextColor}
        {...rest}
      />
      <Text style={style.errorText}>{error?.message}</Text>
    </View>
  );
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
      render={({
        field: {ref: _ref, onChange, ...restField},
        fieldState: {error},
      }) => (
        <Input onChangeText={onChange} {...restField} {...rest} error={error} />
      )}
    />
  );
};
