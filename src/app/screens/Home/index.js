import React from 'react';
import { View } from 'react-native';

import VideoTimeline from './components/VideoTimeline';
import styles from './styles';

function Home() {
  return (
    <View style={styles.container}>
      <VideoTimeline
        link="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
        timeline={[]}
      />
    </View>
  );
}

export default Home;
