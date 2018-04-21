import React from 'react';
import { View } from 'react-native';

import CardInfo from './CardInfo';
import styles from './styles';

function Home() {
  return (
    <View style={styles.container}>
      <CardInfo y={0} scale={0.7} />
      <CardInfo y={25} scale={0.8} />
      <CardInfo y={50} scale={0.9} />
      <CardInfo y={75} scale={1} isActive />
    </View>
  );
}

export default Home;
