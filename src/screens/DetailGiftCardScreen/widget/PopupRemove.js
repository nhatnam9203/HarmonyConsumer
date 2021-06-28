import React, { Component } from "react";
import { View, StyleSheet, Image, Dimensions } from "react-native";
import { Text, Modal, Button } from "components";
import { scaleSize } from "utils";
import AntDesign from "react-native-vector-icons/AntDesign";

const { width } = Dimensions.get("window");
export default class PopupRemove extends Component {
  render() {
    const { isVisible, onRequestClose, onRemove } = this.props;
    return (
      <Modal onRequestClose={onRequestClose} isVisible={isVisible}>
        <View style={{ position: "relative" }}>
          <View style={styles.container}>
            <View style={styles.header}>
              <Text style={styles.title}>Remove card</Text>
            </View>
            <Text style={styles.content}>Are you sure want to remove this card?</Text>
            <View style={styles.containerButton}>
              <Button onPress={onRequestClose}>
                <Text style={styles.textButton}>NO</Text>
              </Button>
              <Button onPress={onRemove}>
                <Text style={[styles.textButton, { color: "#ED1C24" }]}>YES</Text>
              </Button>
            </View>
          </View>

          <Button
            onPress={onRequestClose}
            style={{
              position: "absolute",
              top: scaleSize(10),
              right: scaleSize(10),
            }}>
            <AntDesign name="close" color="#404040" size={scaleSize(25)} />
          </Button>
        </View>
      </Modal>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    paddingHorizontal: scaleSize(10),
    paddingVertical: scaleSize(20),
    // justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#FFF",
    width: width * 0.9,
    borderRadius: scaleSize(5),
  },
  header: {
    height: scaleSize(40),
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  close: {
    width: scaleSize(20),
    height: scaleSize(20),
  },
  title: {
    fontSize: scaleSize(22),
    fontWeight: "bold",
  },
  content: {
    fontSize: scaleSize(17),
    color: "#888888",
    alignSelf: "center",
    marginTop: scaleSize(30),
  },
  containerButton: {
    height: scaleSize(30),
    justifyContent: "space-between",
    alignItems: "flex-end",
    flexDirection: "row",
    width: scaleSize(180),
    alignSelf: "center",
    bottom: scaleSize(5),
    marginTop: scaleSize(30),
  },
  textButton: {
    fontSize: scaleSize(20),
    color: "#0764B0",
    fontWeight: "bold",
  },
});
