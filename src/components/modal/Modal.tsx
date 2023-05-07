import React, {
  forwardRef,
  Ref,
  useImperativeHandle,
  useState,
  useContext,
  useEffect,
} from 'react';
import {Dimensions, StyleProp, StyleSheet, View, ViewStyle} from 'react-native';
import {
  Modal as RNModal,
  ModalContent,
  SlideAnimation,
} from 'react-native-modals';

import {AppContext} from '@contexts/AppProvider';
import {ModalTitle} from './ModalTitle';
import {ThemeColorsProp} from '../design';

export type ModalRef = {
  show?: () => void;
  close?: () => void;
} | null;

type ModalParams = {
  open?: boolean;
  title?: string;
  onClose?: () => void;
  onTouchOutside?: () => void;
  hideClose?: boolean;
  customStyles?: {
    modal?: StyleProp<ViewStyle>;
    content?: StyleProp<ViewStyle>;
    contentContainer?: StyleProp<ViewStyle>;
  };
  slideAnimation?: SlideAnimation;
  children: any;
};

const DEVICE_WIDTH = Dimensions.get('window').width;

export const Modal = forwardRef<ModalRef, ModalParams>(
  (
    {
      open = false,
      title = '',
      hideClose = false,
      customStyles = {},
      children,
      slideAnimation,
      onClose,
      onTouchOutside = () => {},
    }: ModalParams,
    ref: Ref<ModalRef>,
  ) => {
    const {colors} = useContext(AppContext);

    const [visible, setVisible] = useState<boolean>(open);

    useEffect(() => {
      if (!visible) {
        onClose?.();
      }
    }, [visible]);

    const styles = getStyles(colors);

    useImperativeHandle(
      ref,
      () => ({
        show: () => setVisible(true),
        close: () => setVisible(false),
      }),
      [],
    );

    return (
      <RNModal
        visible={visible}
        onTouchOutside={() => {
          setVisible(false);
          onTouchOutside();
          onClose?.();
        }}
        modalTitle={
          title ? (
            <ModalTitle
              title={title}
              hideClose={hideClose}
              onClose={() => setVisible(false)}
            />
          ) : undefined
        }
        modalAnimation={slideAnimation}
        style={[styles.modal, customStyles.modal]}>
        <ModalContent style={customStyles.content}>
          <View
            style={[styles.contentContainer, customStyles.contentContainer]}>
            {children}
          </View>
        </ModalContent>
      </RNModal>
    );
  },
);

const getStyles = (colors: ThemeColorsProp) =>
  StyleSheet.create({
    modal: {
      flex: 1,
    },
    contentContainer: {
      width: DEVICE_WIDTH * 0.8,
      alignItems: 'center',
      alignSelf: 'center',
      padding: 10,
      minHeight: 300,
      // maxHeight: 350,
      // backgroundColor: colors.BACKGROUND,
      borderRadius: 5,
      zIndex: 200,
    },
    labelText: {},
  });
