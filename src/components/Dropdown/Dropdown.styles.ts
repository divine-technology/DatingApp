import {StyleSheet} from 'react-native';
import {themeColors} from '../../themes/colors';

export const styles = StyleSheet.create({
  errorText: {
    fontSize: 10,
    paddingHorizontal: 20,
    height: 14,
    color: themeColors.backgroundColor,
    width: '100%',
    textAlign: 'left',
  },
});
