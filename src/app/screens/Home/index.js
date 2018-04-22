import React from 'react';
import { View } from 'react-native';

import rnBsas from '../../../assets/rn-bsas.jpg';
import forest from '../../../assets/forest.jpg';
import concert from '../../../assets/concert.jpg';
import aurora from '../../../assets/aurora.jpg';

import CardList from './components/CardList';
import styles from './styles';

const cards = [
  { id: 0, image: forest, title: 'Gump event' },
  { id: 1, image: concert, title: 'Arch Enemy concert' },
  { id: 2, image: aurora, title: 'Aurora Borealis' },
  { id: 3, image: rnBsas, title: 'React Native' }
];

function Home() {
  return (
    <View style={styles.container}>
      <CardList cards={cards} />
    </View>
  );
}

export default Home;
