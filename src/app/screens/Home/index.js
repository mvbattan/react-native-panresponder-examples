import React from 'react';
import { ScrollView } from 'react-native';

import DraggableView from './components/DraggableView';
import styles from './styles';

function Home() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <DraggableView />
    </ScrollView>
  );
}

export default Home;
