import React from 'react';
import { View } from 'react-native';

import rnBsas from '../../../assets/rn-bsas.jpg';
import forest from '../../../assets/forest.jpg';
import concert from '../../../assets/concert.jpg';
import aurora from '../../../assets/aurora.jpg';

import CardList from './components/CardList';
import styles from './styles';

const cards = [
  { id: 0, image: forest },
  { id: 1, image: concert },
  { id: 2, image: aurora },
  { id: 3, image: rnBsas }
];

function Home() {
  return (
    <View style={styles.container}>
      <CardList cards={cards} />
    </View>
  );
}

export default Home;
