import React, { Component } from 'react';
import { View, PanResponder } from 'react-native';

class DraggableView extends Component {
  state = {};

  panResponder = PanResponder.create({
    onStartShouldSetPanResponder: (evt, gestureState) =>
      !console.log('onStartShouldSetPanResponder', { evt, gestureState }),
    onStartShouldSetPanResponderCapture: (evt, gestureState) =>
      !console.log('onStartShouldSetPanResponderCapture', { evt, gestureState }),
    onMoveShouldSetPanResponder: (evt, gestureState) =>
      !console.log('onMoveShouldSetPanResponder', { evt, gestureState }),
    onMoveShouldSetPanResponderCapture: (evt, gestureState) =>
      !console.log('onMoveShouldSetPanResponderCapture', { evt, gestureState }),

    onPanResponderGrant: (evt, gestureState) => {
      // The gesture has started. Show visual feedback so the user knows
      // what is happening!

      // gestureState.d{x,y} will be set to zero now
      console.log('onPanResponderGrant', { evt, gestureState });
    },
    onPanResponderMove: (evt, gestureState) => {
      // The most recent move distance is gestureState.move{X,Y}

      // The accumulated gesture distance since becoming responder is
      // gestureState.d{x,y}
      console.log('onPanResponderMove', { evt, gestureState });
    },
    onPanResponderTerminationRequest: (evt, gestureState) =>
      console.log('onPanResponderTerminationRequest', { evt, gestureState }),
    onPanResponderRelease: (evt, gestureState) => {
      // The user has released all touches while this view is the
      // responder. This typically means a gesture has succeeded
      console.log('onPanResponderRelease', { evt, gestureState });
    },
    onPanResponderTerminate: (evt, gestureState) => {
      // Another component has become the responder, so this gesture
      // should be cancelled
      console.log('onPanResponderTerminate', { evt, gestureState });
    }
  })

  render() {
    return (
      <View style={{ width: 120, height: 120, backgroundColor: 'red' }} {...this.panResponder.panHandlers} />
    );
  }
}

export default DraggableView;
