import React from 'react';
import {StyleSheet, View, Text} from 'react-native';

import {ScreenContainer} from '@components/ScreenContainer';

interface ISampleScreen {}

export const SampleScreen: React.FC<ISampleScreen> = props => {
  const styles = getStyles();

  console.log('In sample screen');
  return (
    <ScreenContainer>
      <View style={{flex: 1}}>
        <Text>SampleScreen</Text>
      </View>
    </ScreenContainer>
  );
};

const getStyles = () =>
  StyleSheet.create({
    container: {
      flex: 1,
    },
  });
