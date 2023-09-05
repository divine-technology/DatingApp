import {
  Controller,
  FieldError,
  FieldValues,
  UseControllerProps
} from 'react-hook-form';
import {Text, TextInput, TextInputProps, View} from 'react-native';
import React, {LegacyRef, forwardRef} from 'react';
import {styles} from './Input.styles';
import {themeColors} from '../../themes/colors';

type ControlledInputProps<T extends FieldValues> = UseControllerProps<T> &
  InputProps;

const InputType = {
  text: 'text',
  number: 'number'
};

type InputProps = TextInputProps & {
  error?: FieldError;
  type?: keyof typeof InputType;
  startAdornment?: React.ReactElement;
  onChangeText?: (text: string | number | undefined | null) => void;
};

export const Input: React.FC<InputProps> = forwardRef(
  (
    {error, startAdornment, type = 'text', value, onChangeText, ...rest},
    ref: LegacyRef<TextInput>
  ) => {
    const style = styles({error, multiline: rest.multiline});

    const valueOnChangeMap: {
      [key in keyof typeof InputType]: {
        onChangeText?: (text: string) => void;
        value?: string;
      };
    } = {
      number: {
        onChangeText: text => {
          onChangeText &&
            onChangeText(isNaN(Number(text)) ? null : Number(text));
        },
        value: value?.toString()
      },
      text: {
        onChangeText: onChangeText,
        value: value
      }
    };

    return (
      <View>
        <View style={style.textInputWrapper}>
          {startAdornment && (
            <View>
              <View
                style={{
                  height: 28,
                  width: 28,
                  alignSelf: 'flex-start'
                }}>
                {startAdornment}
              </View>
            </View>
          )}
          <TextInput
            ref={ref}
            style={style.textInput}
            placeholderTextColor={themeColors.primaryTextColor}
            maxLength={rest.multiline ? 150 : undefined}
            {...rest}
            {...valueOnChangeMap[type]}
          />
        </View>
        <Text style={style.errorText}>{error?.message}</Text>
      </View>
    );
  }
);

export const ControlledInput = <T extends FieldValues>({
  control,
  name,
  ...rest
}: ControlledInputProps<T>) => {
  return (
    <Controller
      control={control}
      name={name}
      render={({field: {onChange, ...restField}, fieldState: {error}}) => (
        <Input onChangeText={onChange} {...restField} {...rest} error={error} />
      )}
    />
  );
};
