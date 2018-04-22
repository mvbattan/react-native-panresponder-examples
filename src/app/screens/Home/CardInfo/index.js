import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, Animated, PanResponder, Dimensions } from 'react-native';

import CustomButton from '../../../components/CustomButton';

import styles from './styles';

const { width } = Dimensions.get('window');

class CardInfo extends Component {
  state = {
    scaleValue: new Animated.Value(this.props.scale),
    swipeValue: new Animated.Value(0),
    swipeYValue: new Animated.Value(0),
    initialValue: new Animated.Value(this.props.y)
  };

  onHitThreshold = isLeft => {
    Animated.parallel([
      Animated.timing(this.state.swipeValue, {
        toValue: 500 * (isLeft ? -1 : 1),
        useNativeEventDriver: true
      }),
      Animated.timing(this.state.swipeYValue, { toValue: -500, useNativeEventDriver: true, duration: 250 })
    ]).start();
  };

  releaseCardAnimation = animatedValue =>
    Animated.spring(animatedValue, {
      toValue: 0,
      useNativeEventDriver: true,
      friction: 4
    });

  panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => this.props.isActive,
    onStartShouldSetPanResponderCapture: () => false,
    onMoveShouldSetPanResponder: () => this.props.isActive,
    onMoveShouldSetPanResponderCapture: () => this.props.isActive,

    onPanResponderGrant: () => this.props.isActive,
    onPanResponderMove: Animated.event([null, { dx: this.state.swipeValue, dy: this.state.swipeYValue }]),
    onPanResponderTerminationRequest: () => false,
    onPanResponderRelease: () => {
      if (this.state.swipeValue._value < -width / 4 || this.state.swipeValue._value > width / 4) {
        this.onHitThreshold(this.state.swipeValue._value < -width / 4);
      } else {
        Animated.parallel([
          this.releaseCardAnimation(this.state.swipeValue),
          this.releaseCardAnimation(this.state.swipeYValue)
        ]).start();
      }
    },
    onPanResponderTerminate: () => {
      Animated.parallel([
        this.releaseCardAnimation(this.state.swipeValue),
        this.releaseCardAnimation(this.state.swipeYValue)
      ]).start();
    }
  });

  handleButtonPress = () => {
    Animated.spring(this.state.scaleValue, { toValue: 1, useNativeEventDriver: true, friction: 2 }).start(
      () => this.state.scaleValue.setValue(0.8)
    );
  };

  render() {
    return (
      <Animated.View
        style={{
          transform: [
            { scale: this.state.scaleValue },
            {
              rotateZ: this.state.swipeValue.interpolate({
                inputRange: [0, 1000],
                outputRange: ['0deg', '90deg']
              })
            },
            { translateX: this.state.swipeValue },
            { translateY: Animated.add(this.state.swipeYValue, this.state.initialValue) }
          ]
        }}
        {...this.panResponder.panHandlers}
      >
        <View style={styles.container} />
        <View style={styles.buttonContainer}>
          <CustomButton onPress={this.handleButtonPress} bold red title="DON'T" />
          <CustomButton onPress={this.handleButtonPress} bold lightBlue title="I'M IN" />
        </View>
      </Animated.View>
    );
  }
}

CardInfo.propTypes = {
  y: PropTypes.number.isRequired,
  scale: PropTypes.number.isRequired,
  isActive: PropTypes.bool
};

export default CardInfo;
