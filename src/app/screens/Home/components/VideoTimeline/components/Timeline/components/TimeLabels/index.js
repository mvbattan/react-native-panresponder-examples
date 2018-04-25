import React from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';

import CustomText from '../../../../../../../../components/CustomText';
import { range } from '../../../../../../../../../utils/arrayUtils';
import styles from '../../styles';

function TimeLabels({ labelCount, renderLabels, visible }) {
  return (
    <View style={[styles.labelsContainer, !visible && styles.invisible]}>
      {visible &&
        range(labelCount).map(item => (
          <CustomText key={item} xsmall black>
            {renderLabels(item)}
          </CustomText>
        ))}
    </View>
  );
}
TimeLabels.propTypes = {
  labelCount: PropTypes.number.isRequired,
  renderLabels: PropTypes.func.isRequired,
  visible: PropTypes.bool.isRequired
};

export default TimeLabels;
