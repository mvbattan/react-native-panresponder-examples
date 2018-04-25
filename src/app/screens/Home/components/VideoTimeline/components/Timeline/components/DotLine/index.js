import React from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';

import { range } from '../../../../../../../../../utils/arrayUtils';
import styles from '../../styles';

function DotLine({ pointCount, visible }) {
  return (
    <View style={styles.pointsContainer}>
      {visible && range(pointCount).map(item => <View key={item} style={styles.dot} />)}
    </View>
  );
}

DotLine.propTypes = {
  pointCount: PropTypes.number.isRequired,
  visible: PropTypes.bool.isRequired
};

export default DotLine;
