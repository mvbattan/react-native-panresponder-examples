import React, { Component } from 'react';
import { View, Animated, PanResponder } from 'react-native';

import CustomButton from '../../../components/CustomButton';

import styles from './styles';

class CardInfo extends Component {
  state = {
    scaleValue: new Animated.Value(0.8),
    swipeValue: new Animated.Value(0),
    swipeYValue: new Animated.Value(0)
  };

  releaseCardAnimation = animatedValue =>
    Animated.spring(animatedValue, {
      toValue: 0,
      useNativeEventDriver: true,
      friction: 3
    });

  panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onStartShouldSetPanResponderCapture: () => false,
    onMoveShouldSetPanResponder: () => true,
    onMoveShouldSetPanResponderCapture: () => true,

    onPanResponderGrant: () => true,
    onPanResponderMove: Animated.event([null, { dx: this.state.swipeValue, dy: this.state.swipeYValue }]),
    onPanResponderTerminationRequest: () => false,
    onPanResponderRelease: () => {
      Animated.parallel([
        this.releaseCardAnimation(this.state.swipeValue),
        this.releaseCardAnimation(this.state.swipeYValue)
      ]).start();
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
            { translateY: this.state.swipeYValue }
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
export default CardInfo;
