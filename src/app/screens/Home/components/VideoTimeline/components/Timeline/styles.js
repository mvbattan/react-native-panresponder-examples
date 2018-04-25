import { StyleSheet } from 'react-native';

import { transparentWhite, transparent, gray } from '../../../../../../../constants/colors';
import { IS_SMALL_DEVICE } from '../../../../../../../constants/platform';

const PIN_SIZE = 25;
const DOT_SIZE = 1;
const TIMELINE_HEIGHT = 120;
const TIMELINE_IMAGE_SIZE = 120;
const WINDOW_BORDER = 2;

const pinStyle = {
  backgroundColor: 'red',
  width: PIN_SIZE,
  height: PIN_SIZE,
  borderRadius: PIN_SIZE / 2
};

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  scrollviewContainer: {
    position: 'absolute',
    bottom: 20
  },
  content: {
    justifyContent: 'center',
    flexDirection: 'column',
    marginTop: 15
  },
  pointsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginTop: 20,
    width: '100%'
  },
  labelsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 20,
    width: '100%'
  },
  dot: {
    height: DOT_SIZE,
    width: DOT_SIZE,
    backgroundColor: gray
  },
  timeline: {
    backgroundColor: transparent,
    width: '100%',
    height: TIMELINE_HEIGHT,
    flexDirection: 'row',
    justifyContent: 'space-around'
  },
  timeWindow: {
    borderWidth: WINDOW_BORDER,
    borderColor: 'red',
    height: TIMELINE_HEIGHT + 2 * WINDOW_BORDER,
    backgroundColor: transparentWhite,
    position: 'absolute',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    bottom: 70 + 3 * !IS_SMALL_DEVICE
  },
  leftPin: {
    ...pinStyle,
    right: PIN_SIZE / 2
  },
  rightPin: {
    ...pinStyle,
    left: PIN_SIZE / 2
  },
  invisible: {
    paddingBottom: 12 + 3 * !IS_SMALL_DEVICE
  },
  timelineImage: {
    width: TIMELINE_IMAGE_SIZE,
    height: TIMELINE_IMAGE_SIZE
  }
});

export default styles;
