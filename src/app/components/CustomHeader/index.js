import React from 'react';
import { View, Image } from 'react-native';

import CustomText from '../CustomText';
import searchPng from '../../../assets/search.png';
import menuPng from '../../../assets/menu.png';

import styles from './styles';

function CustomHeader() {
  return (
    <View style={styles.container}>
      <Image source={menuPng} style={styles.icon} />
      <CustomText white bold>
        Events
      </CustomText>
      <Image source={searchPng} style={styles.icon} />
    </View>
  );
}

export default CustomHeader;
