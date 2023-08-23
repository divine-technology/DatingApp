import React from 'react';
import {Dropdown as LibDropdown} from 'react-native-element-dropdown';
import {DropdownProps as LibDropdownProps} from 'react-native-element-dropdown/src/components/Dropdown/model';
import {themeColors} from '../../themes/colors';
import {
  Controller,
  FieldError,
  FieldValues,
  UseControllerProps,
} from 'react-hook-form';
import {Text, View} from 'react-native';
import {styles} from './Dropdown.styles';

export type DropdownDefaultDataProps = {value: string; label: string};

export type DropdownProps<T = DropdownDefaultDataProps> =
  LibDropdownProps<T> & {
    error?: FieldError;
  };

export const Dropdown: React.FC<DropdownProps> = ({error, ...rest}) => {
  console.log('STA DODJE OVDJE: ', {error});
  return (
    <View style={{width: '100%'}}>
      <LibDropdown
        placeholderStyle={{
          color: themeColors.primaryTextColor,
          paddingHorizontal: 8,
          margin: 0,
        }}
        iconStyle={{tintColor: themeColors.primaryTextColor}}
        containerStyle={{
          borderRadius: 24,
          overflow: 'hidden',
        }}
        selectedTextStyle={{
          color: themeColors.primaryTextColor,
          paddingHorizontal: 8,
        }}
        itemTextStyle={{color: themeColors.backgroundColor}}
        activeColor={`${themeColors.primaryColor}50`}
        style={{
          width: '100%',
          height: 44,
          borderRadius: 24,
          backgroundColor: themeColors.primaryColor,
          paddingHorizontal: 12,
        }}
        {...rest}
      />
      <Text style={styles.errorText}>{error?.message}</Text>
    </View>
  );
};

export type ControlledDropdownProps<
  T extends FieldValues,
  K = DropdownDefaultDataProps,
> = UseControllerProps<T> & Omit<DropdownProps<K>, 'onChange'>;

export const ControlledDropdown = <T extends FieldValues>({
  control,
  name,
  ...rest
}: ControlledDropdownProps<T>) => {
  return (
    <Controller
      control={control}
      name={name}
      render={({field: {ref: _ref, ...restField}, fieldState: {error}}) => (
        <Dropdown {...restField} {...rest} error={error} />
      )}
    />
  );
};
