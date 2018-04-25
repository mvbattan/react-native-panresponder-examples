import React, { PureComponent } from 'react';
import { TouchableOpacity, ActivityIndicator, View, Image } from 'react-native';
import Video from 'react-native-video';
import PropTypes from 'prop-types';

import icPlaybigPng from '../../../assets/playBigButton/ic_playbig.png';
import { red } from '../../../constants/colors';

import styles from './styles';

class VideoPlayer extends PureComponent {
  state = {
    loading: true,
    paused: true
  };

  pause = () => {
    this.setState(() => ({ paused: true }));
  };

  handleLoaded = e => {
    this.setState(() => ({ loading: false }), () => this.props.onLoaded && this.props.onLoaded(e));
  };

  handleBuffer = e => {
    this.setState(() => ({ loading: e.isBuffering }));
  };

  handleToggleVideoPlay = e => {
    this.setState(
      () => ({ paused: !this.state.paused }),
      () => this.props.onToggleVideoPlay && this.props.onToggleVideoPlay(e)
    );
  };

  shouldShowPlayButton = () => this.state.paused && !this.state.loading && this.props.playable;

  videoIsPaused = () => this.state.paused;
  videoIsLoaded = () => !this.state.loading;

  render() {
    const { refSetter, videoSource, style } = this.props;
    return (
      <View>
        <TouchableOpacity
          style={style}
          onPress={this.handleToggleVideoPlay}
          activeOpacity={0.9 + 0.1 * !this.props.playable}
        >
          {this.state.loading && <ActivityIndicator size="large" color={red} style={styles.spinner} />}
          <Video
            ref={refSetter}
            source={{ uri: videoSource }}
            style={styles.videoPlayer}
            resizeMode="cover"
            repeat
            onBuffer={this.handleBuffer}
            onLoad={this.handleLoaded}
            paused={this.state.paused || !this.props.playable}
          />
          {this.shouldShowPlayButton() && <Image source={icPlaybigPng} style={styles.playButtonContainer} />}
        </TouchableOpacity>
      </View>
    );
  }
}

VideoPlayer.defaultProps = {
  playable: true
};

VideoPlayer.propTypes = {
  onLoaded: PropTypes.func,
  onToggleVideoPlay: PropTypes.func,
  playable: PropTypes.bool.isRequired,
  refSetter: PropTypes.func,
  videoSource: PropTypes.string.isRequired
};

export default VideoPlayer;
