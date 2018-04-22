import { StyleSheet } from 'react-native';

import { secondaryBackground, white } from '../../../../../constants/colors';

const CARD_SIZE = 325;
const BORDER_RADIUS = 10;

const styles = StyleSheet.create({
  container: {
    backgroundColor: white,
    height: CARD_SIZE,
    width: CARD_SIZE,
    borderTopLeftRadius: BORDER_RADIUS,
    borderTopRightRadius: BORDER_RADIUS,
    position: 'absolute'
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    width: CARD_SIZE,
    height: 100,
    backgroundColor: secondaryBackground,
    borderBottomLeftRadius: BORDER_RADIUS,
    borderBottomRightRadius: BORDER_RADIUS,
    position: 'absolute',
    top: CARD_SIZE
  }
});

export default styles;
