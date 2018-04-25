import React, { Component } from 'react';
import { View, PanResponder } from 'react-native';

// Taken a bit from https://gist.github.com/teameh/dd055d546a3bd8f85b9516840e3a45f3
class DraggableView extends Component {
  state = {};

  panResponder = PanResponder.create({
    // - Does this view want to become responder on the start of a touch?
    onStartShouldSetPanResponder: (evt, gestureState) => {
      console.log('onStartShouldSetPanResponder', { evt, gestureState });
      return true;
    },

    // Should child views be prevented from becoming responder on first touch?
    onStartShouldSetPanResponderCapture: (evt, gestureState) => {
      console.log('onStartShouldSetPanResponderCapture', { evt, gestureState });
      return true;
    },

    // - Called for every touch move on the View when it is not the responder
    //   does this view want to "claim" touch responsiveness?
    onMoveShouldSetPanResponder: (evt, gestureState) => {
      console.log('onMoveShouldSetPanResponder', { evt, gestureState });
      return true;
    },

    // Should child views be prevented from becoming responder of subsequent touches?
    onMoveShouldSetPanResponderCapture: (evt, gestureState) => {
      console.log('onMoveShouldSetPanResponderCapture', { evt, gestureState });
      return true;
    },

    // - The View is now responding for touch events.
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

    // - Something else wants to become responder.
    //   Should this view release the responder? Returning true allows release
    onPanResponderTerminationRequest: (evt, gestureState) => {
      console.log('onPanResponderTerminationRequest', { evt, gestureState });
      return false;
    },

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
  });

  render() {
    return (
      <View style={{ width: 120, height: 120, backgroundColor: 'red' }} {...this.panResponder.panHandlers} />
    );
  }
}

export default DraggableView;
