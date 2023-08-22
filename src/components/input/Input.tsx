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
  startAdornment?: React.ReactElement;
};

export const Input: React.FC<InputProps> = ({
  error,
  startAdornment,
  ...rest
}) => {
  const style = styles({error, multiline: rest.multiline});
  return (
    <View>
      <View style={style.textInputWrapper}>
        {startAdornment && (
          <View
            style={{
              height: 28,
              width: 28,
              marginVertical: 8,
              alignSelf: 'flex-start',
            }}>
            {startAdornment}
          </View>
        )}
        <TextInput
          style={style.textInput}
          placeholderTextColor={themeColors.primaryTextColor}
          maxLength={rest.multiline ? 150 : undefined}
          {...rest}
        />
      </View>
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
