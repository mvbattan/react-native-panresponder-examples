import React, { Fragment } from 'react';
import { View } from 'react-native';

import CustomButton from '../../../components/CustomButton';

import styles from './styles';

function CardInfo() {
  return (
    <Fragment>
      <View style={styles.container} />
      <View style={styles.buttonContainer}>
        <CustomButton bold red title="DON'T" />
        <CustomButton bold lightBlue title="I'M IN" />
      </View>
    </Fragment>
  );
}

export default CardInfo;
