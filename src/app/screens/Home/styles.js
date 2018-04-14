import { StyleSheet } from 'react-native';

import { green, background } from '../../../constants/colors';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: background
  },
  mainButton: {
    backgroundColor: green,
    padding: 10,
    borderRadius: 3
  }
});

export default styles;
