import React from 'react';
import { View } from 'react-native';

import CardList from './components/CardList';
import styles from './styles';

const cards = [{ id: 0 }, { id: 1 }, { id: 2 }, { id: 3 }];

function Home() {
  return (
    <View style={styles.container}>
      <CardList cards={cards} />
    </View>
  );
}

export default Home;
