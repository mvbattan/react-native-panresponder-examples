import React, { Component } from 'react';
import { View, Animated, PanResponder } from 'react-native';

import CustomButton from '../../../components/CustomButton';

import styles from './styles';

class CardInfo extends Component {
  state = {
    scaleValue: new Animated.Value(0.8),
    swipeValue: new Animated.Value(0)
  };

  panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onStartShouldSetPanResponderCapture: () => false,
    onMoveShouldSetPanResponder: () => true,
    onMoveShouldSetPanResponderCapture: () => true,

    onPanResponderGrant: () => true,
    onPanResponderMove: Animated.event([null, { dx: this.state.swipeValue }]),
    onPanResponderTerminationRequest: () => false,
    onPanResponderRelease: (evt, gestureState) => {
      // The user has released all touches while this view is the
      // responder. This typically means a gesture has succeeded
    },
    onPanResponderTerminate: (evt, gestureState) => {
      // Another component has become the responder, so this gesture
      // should be cancelled
    }
  })

  handleButtonPress = () => {
    Animated.spring(this.state.scaleValue, { toValue: 1, useNativeEventDriver: true, friction: 1.6 }).start(
      () => this.state.scaleValue.setValue(0.8)
    );
  };

  render() {
    return (
      <Animated.View
        style={{
          transform: [{ scale: this.state.scaleValue }, { translateX: this.state.swipeValue }]
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
