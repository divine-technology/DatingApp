import {Controller} from 'react-hook-form';
import {TextInput} from 'react-native';
import {styles} from '../screens/login/Login.styles';
import React from 'react';

interface ControlledInputProps {
  control: any;
  name: string;
  isRequired: boolean;
  placeHolder: string;
  placeHolderTextColor: string;
}

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
      render={({field: {onChange, onBlur, value}}) => (
        <TextInput
          style={styles.inputText}
          placeholder={placeHolder}
          placeholderTextColor={placeHolderTextColor}
          onBlur={onBlur}
          onChangeText={value => onChange(value)}
          value={value}
        />
      )}
    />
  );
};
