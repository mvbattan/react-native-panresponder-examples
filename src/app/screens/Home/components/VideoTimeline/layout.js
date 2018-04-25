import React from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';

import VideoPlayer from '../../../../components/VideoPlayer';

import Timeline from './components/Timeline';
import styles from './styles';

function VideoTimeline({
  videoSelfRefSetter,
  videoRefSetter,
  videoSource,
  onLoaded,
  onToggleVideoPlay,
  shouldShowTimeline,
  timelineRefSetter,
  timeline,
  duration,
  onWindowMove,
  playable,
  singleFrame,
  withTimestamps
}) {
  return (
    <View style={styles.container}>
      <VideoPlayer
        ref={videoSelfRefSetter}
        refSetter={videoRefSetter}
        playable={playable}
        videoSource={videoSource}
        onLoaded={onLoaded}
        onToggleVideoPlay={onToggleVideoPlay}
        style={styles.videoPlayer}
      />
      {shouldShowTimeline && (
        <Timeline
          ref={timelineRefSetter}
          duration={duration}
          onWindowMove={onWindowMove}
          singleFrame={singleFrame}
          withTimestamps={withTimestamps}
          timeline={timeline}
        />
      )}
    </View>
  );
}

VideoTimeline.propTypes = {
  duration: PropTypes.number.isRequired,
  onLoaded: PropTypes.func.isRequired,
  onToggleVideoPlay: PropTypes.func.isRequired,
  onWindowMove: PropTypes.func.isRequired,
  playable: PropTypes.bool,
  shouldShowTimeline: PropTypes.bool,
  singleFrame: PropTypes.bool,
  timeline: PropTypes.arrayOf(
    PropTypes.shape({
      thumbnail: PropTypes.string.isRequired
    }).isRequired
  ),
  timelineRefSetter: PropTypes.func.isRequired,
  videoRefSetter: PropTypes.func.isRequired,
  videoSelfRefSetter: PropTypes.func.isRequired,
  videoSource: PropTypes.string.isRequired,
  withTimestamps: PropTypes.bool
};

export default VideoTimeline;
