import {StyleSheet} from 'react-native';

export const styles = (paddingTop?: number) =>
  StyleSheet.create({
    headerContainer: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingHorizontal: 24,
      paddingBottom: 8,
      backgroundColor: 'white',
      borderBottomWidth: 1,
      borderBottomColor: 'silver',
      paddingTop,
      elevation: 2,
      shadowOpacity: 0.58,
      marginBottom: 4
    }
  });
