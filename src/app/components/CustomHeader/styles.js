import { StyleSheet } from 'react-native';

import { background } from '../../../constants/colors';

const ICON_SIZE = 20;

const styles = StyleSheet.create({
  container: {
    backgroundColor: background,
    height: 80,
    paddingHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 0
  },
  icon: {
    height: ICON_SIZE,
    width: ICON_SIZE
  }
});

export default styles;
