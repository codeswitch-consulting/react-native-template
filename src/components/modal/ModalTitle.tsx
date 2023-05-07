import React, {useContext} from 'react';
import {StyleSheet, View, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

import {AppContext} from '@contexts/AppProvider';
import {Fonts} from '@components/design';

interface IModalTitle {
  title: string;
  hideClose?: boolean;
  onClose: () => void;
}

export const ModalTitle: React.FC<IModalTitle> = ({
  title,
  hideClose = false,
  onClose,
}) => {
  const {colors} = useContext(AppContext);

  return (
    <View style={styles.container}>
      <Fonts variant="body-medium" size={18}>
        {title}
      </Fonts>
      {!hideClose && (
        <TouchableOpacity onPress={onClose}>
          <Icon name="close" size={18} />
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 25,
    paddingBottom: 5,
  },
});
