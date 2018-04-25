import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, Image, TouchableOpacity, ScrollView, PanResponder, Animated } from 'react-native';

import { WINDOW_WIDTH } from '../../../../../../../constants/platform';
import { secondsToHHMMSS } from '../../../../../../../utils/timeUtils';

import DotLine from './components/DotLine';
import TimeLabels from './components/TimeLabels';
import styles from './styles';

const POINT_COUNT = 500;
const LABEL_COUNT = 30;
const POINTS_BETWEEN_LABELS = 17.2;

const BIG_BUNNY_VIDEO_LENGTH = 596.47; // in seconds
const BIG_BUNNY_VIDEO_PERCENTAGE = 24; // Timeline has 2400% width
const CALCULATE_WINDOW_PERCENTAGE = maxDuration => {
  const percentage = maxDuration * BIG_BUNNY_VIDEO_PERCENTAGE / BIG_BUNNY_VIDEO_LENGTH;
  return Math.max(percentage, 1);
};
const POSITION_TO_TIME = (pos, maxDuration) =>
  pos * maxDuration / (WINDOW_WIDTH * CALCULATE_WINDOW_PERCENTAGE(maxDuration));
const MAX_FRAME_SIZE = maxDuration =>
  WINDOW_WIDTH * CALCULATE_WINDOW_PERCENTAGE(maxDuration) * 30 / maxDuration;
const MIN_FRAME_SIZE = 60;

const INITIAL_WINDOW_WIDTH = 100;

class Timeline extends Component {
  state = {
    rectangleWidth: new Animated.Value(INITIAL_WINDOW_WIDTH + 40 * this.props.singleFrame),
    rectangleWidthOffset: new Animated.Value(0),
    rectanglePosition: new Animated.Value(0),
    rectanglePositionOffset: new Animated.Value(0),
    scrolledOffset: new Animated.Value(0),
    shouldShowWindow: true
  };

  componentWillMount() {
    const commonPanHandlers = {
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponderCapture: () => true,
      onPanResponderTerminationRequest: () => false
    };

    this.windowPanResponderHandlers = PanResponder.create({
      ...commonPanHandlers,
      onPanResponderMove: (_, gestureState) => {
        // Captures and updates rectangle position according to slide touch in a buffer (rectanglePositionOffset)
        Animated.event([null, { dx: this.state.rectanglePositionOffset }])(_, gestureState);
        // TODO: As a nice to have, this update should be synchronous on native side
        this.props.onWindowMove(this.getCurrentPosition());
      },
      onPanResponderRelease: this.commitRectanglePositionValues
    });

    this.tapRightPanResponderHandlers = PanResponder.create({
      ...commonPanHandlers,
      onStartShouldSetPanResponderCapture: () => true,
      onPanResponderMove: (_, gestureState) => {
        // Since moveX contains the screen position of the touch, and rectanglePosition is the
        // position of the rectangle in the screen, the diff between them will always be the width
        // TODO: As nice to have, make this calculation in native side
        const mockEvt = { moveX: gestureState.moveX - this.state.rectanglePosition._value };
        Animated.event([{ moveX: this.state.rectangleWidth }])(mockEvt);
        // TODO: As a nice to have, this update should be synchronous on native side
        this.props.onWindowMove(this.getCurrentPosition());
      }
    });

    this.tapLeftPanResponderHandlers = PanResponder.create({
      ...commonPanHandlers,
      onStartShouldSetPanResponderCapture: () => true,
      onPanResponderMove: (_, gestureState) => {
        // Updates on the left pin is trickier than the right one, since it changes both
        // position and width of the rectangle.
        const mockEvt = {
          // x0 contains the position where the touch did start
          // moveX is the current position of the finger on the screen
          // Notice that we do not modify the width directly since this difference could be negative
          widthOffset: gestureState.x0 - gestureState.moveX,
          moveX: gestureState.moveX
        };
        Animated.event([
          {
            widthOffset: this.state.rectangleWidthOffset,
            moveX: this.state.rectanglePosition
          }
        ])(mockEvt);
        this.props.onWindowMove(
          POSITION_TO_TIME(gestureState.moveX + this.state.scrolledOffset._value, this.props.duration)
        );
      },
      onPanResponderRelease: this.commitRectangleWidthValues,
      onPanResponderTerminate: this.commitRectangleWidthValues
    });
  }

  getWindowLength = () => {
    let windowWidth = this.state.rectangleWidth._value;
    if (windowWidth < MIN_FRAME_SIZE) windowWidth = MIN_FRAME_SIZE;
    if (windowWidth > MAX_FRAME_SIZE(this.props.duration)) windowWidth = MAX_FRAME_SIZE(this.props.duration);
    return POSITION_TO_TIME(windowWidth, this.props.duration);
  };

  getCurrentPosition = () => {
    if (this.state.rectanglePosition._value <= 0 && this.state.scrolledOffset._value <= 0) {
      return 0;
    }
    return POSITION_TO_TIME(
      this.state.rectanglePosition._value +
        this.state.rectanglePositionOffset._value +
        this.state.scrolledOffset._value,
      this.props.duration
    );
  };

  windowIsShowingUp = () => this.state.shouldShowWindow;

  commitRectanglePositionValues = () => {
    this.state.rectanglePosition.setValue(
      this.state.rectanglePosition._value + this.state.rectanglePositionOffset._value
    );
    this.state.rectanglePositionOffset.setValue(0);
  };
  commitRectangleWidthValues = () => {
    this.state.rectangleWidth.setValue(
      this.state.rectangleWidth._value + this.state.rectangleWidthOffset._value
    );
    this.state.rectangleWidthOffset.setValue(0);
    this.state.rectanglePositionOffset.setValue(0);
  };

  handleScroll = e => {
    Animated.event([{ nativeEvent: { contentOffset: { x: this.state.scrolledOffset } } }])(e);
    // TODO: As a nice to have, make this onWindowMove synchronous from native side.
    this.props.onWindowMove(
      POSITION_TO_TIME(
        this.state.rectanglePosition._value + e.nativeEvent.contentOffset.x,
        this.props.duration
      )
    );
  };

  toggleWindow = () =>
    !this.props.singleFrame &&
    this.setState(
      prevState => ({ shouldShowWindow: !prevState.shouldShowWindow }),
      () => {
        this.props.onWindowMove(
          POSITION_TO_TIME(
            this.state.rectanglePosition._value * this.state.shouldShowWindow +
              this.state.scrolledOffset._value,
            this.props.duration
          )
        );
      }
    );

  scrollRef = scrollview => (this.scrollview = scrollview);

  renderOffsetLabel = i =>
    secondsToHHMMSS(this.props.duration * (POINTS_BETWEEN_LABELS * i + 1) / POINT_COUNT);

  render() {
    return (
      <View style={styles.container}>
        <ScrollView
          ref={this.scrollRef}
          contentContainerStyle={[
            styles.content,
            { width: `${CALCULATE_WINDOW_PERCENTAGE(this.props.duration) * 100}%` }
          ]}
          style={styles.scrollviewContainer}
          horizontal
          scrollEventThrottle={16}
          onScroll={this.handleScroll}
          bounces={false}
        >
          <TouchableOpacity
            style={[styles.timeline, !this.props.timeline.length && { backgroundColor: 'blue' }]}
            onPress={this.toggleWindow}
            activeOpacity={1}
          >
            {/* TODO: Use just only one timeline when API fix it */}
            {this.props.timeline.map((frame, i) => (
              <Image
                source={{ uri: frame.thumbnail }}
                // eslint-disable-next-line react/no-array-index-key
                key={`${frame.thumbnail}-${i}`}
                style={styles.timelineImage}
              />
            ))}
          </TouchableOpacity>
          <DotLine pointCount={POINT_COUNT} visible={this.props.withTimestamps} />
          <TimeLabels
            labelCount={LABEL_COUNT}
            renderLabels={this.renderOffsetLabel}
            visible={this.props.withTimestamps}
          />
        </ScrollView>
        {this.state.shouldShowWindow && (
          <Animated.View
            {...this.windowPanResponderHandlers.panHandlers}
            style={[
              styles.timeWindow,
              {
                // This interpolate seems to do nothing but the magic is in the 'clamp' keyword
                width: Animated.add(this.state.rectangleWidth, this.state.rectangleWidthOffset).interpolate({
                  inputRange: [MIN_FRAME_SIZE, MAX_FRAME_SIZE(this.props.duration)],
                  outputRange: [MIN_FRAME_SIZE, MAX_FRAME_SIZE(this.props.duration)],
                  extrapolate: 'clamp'
                }),
                transform: [
                  {
                    translateX: Animated.add(this.state.rectanglePosition, this.state.rectanglePositionOffset)
                  }
                ]
              }
            ]}
          >
            {!this.props.singleFrame && (
              <View style={styles.leftPin} {...this.tapLeftPanResponderHandlers.panHandlers} />
            )}
            {!this.props.singleFrame && (
              <View style={styles.rightPin} {...this.tapRightPanResponderHandlers.panHandlers} />
            )}
          </Animated.View>
        )}
      </View>
    );
  }
}

Timeline.defaultProps = {
  singleFrame: false
};

Timeline.propTypes = {
  duration: PropTypes.number.isRequired,
  onWindowMove: PropTypes.func.isRequired,
  singleFrame: PropTypes.bool,
  timeline: PropTypes.arrayOf(
    PropTypes.shape({
      thumbnail: PropTypes.string.isRequired
    }).isRequired
  ).isRequired,
  withTimestamps: PropTypes.bool.isRequired
};

export default Timeline;
