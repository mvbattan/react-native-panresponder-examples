import React from 'react';
import { View } from 'react-native';

import CardInfo from './CardInfo';
import styles from './styles';

function Home() {
  return (
    <View style={styles.container}>
      <CardInfo />
    </View>
  );
}

export default Home;
