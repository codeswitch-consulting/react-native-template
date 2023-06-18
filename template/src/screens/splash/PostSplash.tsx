import React, {useContext} from 'react';
import {StyleSheet, View} from 'react-native';

import {APP_NAME} from '@utils/constants';
import {AppContext} from '@contexts/AppProvider';
import {Fonts} from '@components/design';

export const PostSplash: React.FC<{}> = () => {
  const {colors} = useContext(AppContext);

  return (
    <View style={styles.container}>
      <View style={styles.logo}></View>
      <View style={styles.title}>
        <Fonts variant="header-bold" size={36}>
          {APP_NAME}
        </Fonts>
      </View>
      <View style={styles.subTitle}>
        <Fonts variant="body-bold" size={18}>
          Subtitle
        </Fonts>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    marginTop: 10,
  },
  title: {
    marginTop: 0,
  },
  subTitle: {
    marginTop: 16,
  },
});
