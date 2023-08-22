import {StyleSheet} from 'react-native';
import {themeColors} from '../../themes/colors';
import {FieldError} from 'react-hook-form';

export const styles = ({
  error,
  multiline,
}: {
  error?: FieldError;
  multiline?: boolean;
}) =>
  StyleSheet.create({
    textInputWrapper: {
      alignItems: 'center',
      paddingHorizontal: 12,
      flexDirection: 'row',
      width: '100%',
      height: multiline ? 140 : 44,
      margin: 0,
      borderRadius: 24,
      backgroundColor: themeColors.primaryColor,
      color: themeColors.primaryTextColor,
      ...(error?.message
        ? {borderWidth: 1, borderColor: themeColors.primaryTextColor}
        : {}),
    },
    textInput: {
      flex: 1,
      color: themeColors.primaryTextColor,
      margin: 0,
      padding: 10,
      paddingHorizontal: 8,
      height: 'auto',
      alignSelf: multiline ? 'flex-start' : undefined,
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
