import { StyleSheet } from 'react-native';

import { transparentBlack } from '../../../constants/colors';
import { WINDOW_WIDTH } from '../../../constants/platform';

const spinnerSize = '100%';
const playButtonSize = 50;
const playButtonContainerHeight = WINDOW_WIDTH / 1.8;
const playButtonContainerWidth = WINDOW_WIDTH;

const styles = StyleSheet.create({
  videoPlayer: {
    flex: 1
  },
  spinner: {
    height: spinnerSize,
    width: spinnerSize,
    backgroundColor: transparentBlack
  },
  playButtonContainer: {
    height: playButtonSize,
    width: playButtonSize,
    position: 'absolute',
    top: playButtonContainerHeight / 2 - playButtonSize / 2,
    left: playButtonContainerWidth / 2 - playButtonSize / 2
  }
});

export default styles;
