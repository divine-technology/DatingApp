import {StyleSheet} from 'react-native';
import {themeColors} from '../../themes/colors';
import {FieldError} from 'react-hook-form';

export const styles = ({error}: {error?: FieldError}) =>
  StyleSheet.create({
    textInput: {
      width: '100%',
      height: 44,
      padding: 10,
      paddingHorizontal: 20,
      margin: 0,
      borderRadius: 24,
      backgroundColor: themeColors.primaryColor,
      color: themeColors.primaryTextColor,
      ...(error?.message
        ? {borderWidth: 1, borderColor: themeColors.primaryTextColor}
        : {}),
    },
    errorText: {
      fontSize: 10,
      paddingHorizontal: 20,
      height: 12,
      color: themeColors.primaryTextColor,
      width: '100%',
      textAlign: 'left',
    },
  });
