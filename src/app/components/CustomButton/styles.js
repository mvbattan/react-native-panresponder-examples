import { StyleSheet } from 'react-native';

import { transparent, black, green, gray, white, deny, allow } from '../../../constants/colors';

const iconSize = 20;

const borderlessStyle = {
  borderWidth: 0,
  backgroundColor: transparent
};

export default StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 40,
    paddingVertical: 15,
    borderRadius: 50
  },
  icon: {
    height: iconSize,
    width: iconSize
  },
  borderless: borderlessStyle,
  radial: {
    borderRadius: 100
  },
  black: {
    backgroundColor: black
  },
  blackContent: {
    color: white
  },
  white: {
    backgroundColor: white
  },
  whiteContent: {
    color: black
  },
  gray: {
    backgroundColor: gray
  },
  grayContent: {
    color: black
  },
  borderlessContent: {
    color: gray
  },
  red: {
    backgroundColor: deny
  },
  redContent: {
    color: white
  },
  lightBlue: {
    backgroundColor: allow
  },
  lightBlueContent: {
    color: white
  },
  green: {
    backgroundColor: green
  },
  text: {
    color: black
  }
});
