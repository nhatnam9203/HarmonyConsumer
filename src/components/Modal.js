import React from "react";

import { View, PanResponder, StyleSheet } from "react-native";
import Modal from "react-native-translucent-modal";

export default class ModalCustom extends React.Component {
  constructor(props) {
    super(props);
    this._panResponder = PanResponder.create({
      onStartShouldSetPanResponder: (evt, gestureState) => true,
      onPanResponderGrant: (evt, gestureState) => {
        if (evt.nativeEvent.locationX === evt.nativeEvent.pageX) {
          this.props.onRequestClose();
        }
      },
    });
  }

  render() {
    const {
      isVisible,
      onRequestClose = () => {},
      animationType = "fade",
      transparent = true,
    } = this.props;
    return (
      <Modal
        visible={isVisible}
        transparent={transparent}
        onRequestClose={onRequestClose}
        animationType={animationType}>
        <View
          {...this._panResponder.panHandlers}
          style={[styles.container, { ...this.props.style }]}>
          {this.props.children}
        </View>
      </Modal>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.6)",
    flex: 1,
  },
});
