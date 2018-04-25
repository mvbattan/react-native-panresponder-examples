import React, { Component } from 'react';
import PropTypes from 'prop-types';

import VideoTimeline from './layout';

class VideoTimelineContainer extends Component {
  state = { duration: 0 };

  componentWillUnmount() {
    if (this.loopTimer) clearInterval(this.loopTimer);
  }

  handleLoad = e => this.setState(() => ({ duration: e.duration }));
  handleToggleVideoPlay = () => {
    const videoIsPaused = this.videoContainer.videoIsPaused();
    if (videoIsPaused && this.loopTimer) {
      clearInterval(this.loopTimer);
    } else if (!videoIsPaused) {
      this.playLoop();
    }
  };
  handleWindowMove = pos => {
    if (this.loopTimer) clearInterval(this.loopTimer);
    this.video.seek(pos);
    if (this.props.onWindowMove) this.props.onWindowMove(pos, this.timeline.getWindowLength());
    this.playLoop();
  };

  playLoop = () => {
    if (this.loopTimer) clearInterval(this.loopTimer);
    if (!this.timeline || this.videoContainer.videoIsPaused() || !this.timeline.windowIsShowingUp()) return;
    this.loopTimer = setInterval(() => {
      this.video.seek(this.timeline.getCurrentPosition());
      this.playLoop();
    }, this.timeline.getWindowLength() * 1000);
  };
  timelineRefSetter = timeline => (this.timeline = timeline);
  videoRefSetter = vid => (this.video = vid);
  videoContainerRef = vid => (this.videoContainer = vid);

  render() {
    return (
      <VideoTimeline
        playable={this.props.playable}
        withTimestamps={this.props.withTimestamps}
        singleFrame={this.props.singleFrame}
        videoSelfRefSetter={this.videoContainerRef}
        videoRefSetter={this.videoRefSetter}
        videoSource={this.props.link}
        onLoaded={this.handleLoad}
        onToggleVideoPlay={this.handleToggleVideoPlay}
        shouldShowTimeline={
          this.videoContainer && this.videoContainer.videoIsLoaded() && !this.props.hideTimeline
        }
        timelineRefSetter={this.timelineRefSetter}
        timeline={this.props.timeline}
        duration={this.state.duration}
        onWindowMove={this.handleWindowMove}
      />
    );
  }
}

VideoTimelineContainer.defaultProps = {
  playable: true,
  withTimestamps: true
};

VideoTimelineContainer.propTypes = {
  hideTimeline: PropTypes.bool,
  link: PropTypes.string.isRequired,
  onWindowMove: PropTypes.func,
  playable: PropTypes.bool,
  singleFrame: PropTypes.bool,
  timeline: PropTypes.arrayOf(
    PropTypes.shape({
      thumbnail: PropTypes.string.isRequired
    }).isRequired
  ),
  withTimestamps: PropTypes.bool
};

export default VideoTimelineContainer;
