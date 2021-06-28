import React from "react";
import { StyleSheet, Dimensions, View, Image } from "react-native";
import { TextInputMask } from "react-native-masked-text";

const { width } = Dimensions.get("window");
import { scaleSize, FormatPrice, roundToTwo } from "utils";
import { tips } from "mocks";
import ICONS from "assets";
import Modal from "./Modal";
import Text from "./Text";
import Button from "./Button";
import { ButtonSubmit } from "./Form";
export default function ModalAddTip({ isVisible, onRequestClose, onPress, total }) {
  const [idTip, setIdTip] = React.useState(-1);
  const [tip, setTip] = React.useState(0);
  const onHandleSelectTip = (id) => () => {
    let amountTip = tips[id].amount;
    let _tip = FormatPrice(total) * (amountTip / 100);
    _tip = roundToTwo(_tip);
    setIdTip(id);
    setTip(_tip);
  };

  const onHandleChangeText = (value) => {
    setTip(value);
    setIdTip(-1);
  };

  const onClose = () => {
    setTip(0);
    setIdTip(-1);
    onRequestClose();
  };

  const onHandlePay = () => {
    let value = tip.toString().replace("$ ", "");
    onPress(roundToTwo(value));
  };

  return (
    <Modal onRequestClose={onClose} isVisible={isVisible}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text fontSize={20} fontFamily="bold">
            Add Tip
          </Text>
          <Button onPress={onClose}>
            <Image source={ICONS["close_header"]} style={styles.icon_close} />
          </Button>
        </View>

        <View style={styles.label}>
          <Text fontSize={17}>Amount</Text>
          <InputTip value={tip} onChangeText={onHandleChangeText} />
        </View>

        <TipList idTip={idTip} onChange={onHandleSelectTip} />

        <ButtonList onCancel={onClose} onPay={onHandlePay} />
      </View>
    </Modal>
  );
}

const TipList = ({ idTip, onChange }) => {
  return (
    <View style={styles.container_tips}>
      {tips.map((item, index) => {
        const backgroundColor = idTip == index ? "#0764B0" : "#FFF";
        const color_text = idTip == index ? "#FFF" : "#0764B0";
        return (
          <Button
            onPress={onChange(index)}
            key={index + ""}
            style={[styles.item, { backgroundColor }]}>
            <Text fontSize={15} color={color_text} style={{ fontWeight: "bold" }}>
              {item.amount} %
            </Text>
          </Button>
        );
      })}
    </View>
  );
};

const InputTip = ({ value, onChangeText }) => (
  <View style={styles.input}>
    <TextInputMask
      type="money"
      options={{
        unit: "$ ",
        precision: 2,
        separator: ".",
      }}
      style={styles.text_input}
      value={value}
      onChangeText={onChangeText}
      keyboardType="numeric"
    />
  </View>
);

const ButtonList = ({ onCancel, onPay }) => (
  <View style={styles.container_button}>
    <ButtonSubmit
      title="Cancel"
      width={160}
      backgroundColor="#FFF"
      textColor="#0764b0"
      style={{
        borderWidth: 1,
        borderColor: "#0764b0",
      }}
      onSubmit={onCancel}
    />
    <ButtonSubmit title="Pay now" width={160} onSubmit={onPay} />
  </View>
);

const styles = StyleSheet.create({
  container: {
    width,
    height: scaleSize(300),
    backgroundColor: "#FFF",
    alignItems: "center",
    borderRadius: scaleSize(10),
  },
  header: {
    width: "100%",
    paddingHorizontal: scaleSize(16),
    height: scaleSize(55),
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottomWidth: 1.5,
    borderColor: "#eeeeee",
  },
  icon_close: {
    width: scaleSize(18),
    height: scaleSize(18),
    resizeMode: "contain",
  },

  input: {
    width: scaleSize(382),
    height: scaleSize(36),
    justifyContent: "center",
    alignItems: "center",
    borderRadius: scaleSize(4),
    borderWidth: 1,
    borderColor: "#dddddd",
  },
  text_input: {
    width: "100%",
    fontSize: scaleSize(17),
    color: "#404040",
    fontWeight: "bold",
    textAlign: "center",
    paddingVertical: 0,
  },
  label: {
    height: scaleSize(75),
    justifyContent: "space-between",
    marginTop: scaleSize(16),
  },
  container_tips: {
    width,
    flexDirection: "row",
    paddingHorizontal: scaleSize(16),
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: scaleSize(20),
  },
  container_button: {
    width,
    flexDirection: "row",
    paddingHorizontal: scaleSize(16),
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: scaleSize(30),
  },
  item: {
    width: scaleSize(80),
    height: scaleSize(35),
    backgroundColor: "#FFF",
    borderRadius: scaleSize(4),
    borderColor: "#0764B0",
    borderWidth: 1,
  },
});
