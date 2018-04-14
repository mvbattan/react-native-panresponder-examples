import React from 'react';
import { View } from 'react-native';

import CustomText from '../../components/CustomText';

import styles from './styles';

export default function Home() {
  return (
    <View style={styles.container}>
      <CustomText style={styles.mainButton}>PanResponderExamples</CustomText>
    </View>
  );
}
