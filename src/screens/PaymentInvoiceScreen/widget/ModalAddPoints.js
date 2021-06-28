import React from "react";
import { StyleSheet, Dimensions, View, Image, TextInput } from "react-native";

import { scaleSize } from "utils";
import ICONS from "assets";
import { Modal, Text, Button, Form, RadioButton } from "components";
import { isEmpty } from "lodash";
const { ButtonSubmit } = Form;

const { width } = Dimensions.get("window");
export default function ModalAddTip({
  isVisible,
  onRequestClose,
  onCloseCheckBox,
  points,
  useAllPoints,
  useEnterPoints,
  applyPoints,
  notUsePoint,
  onChangePoint,
  point,
}) {
  const [radio, setRadio] = React.useState(-1);

  const [refInput, setRefInput] = React.useState(null);

  const onHandleActive = (value) => () => {
    setRadio(value);
  };

  const onHandleChangeText = (value) => {
    onChangePoint(value);
  };

  const onHandleSetRef = (value) => {
    setRefInput(value);
  };

  const onHandleCancel = () => {
    notUsePoint();
    setRadio(-1);
  };
  const onHandleApply = () => {
    applyPoints(point);
  };

  const onHandeCLoseModal = () => {
    if (radio == 1 && point == "") onCloseCheckBox();
    onRequestClose();
  };

  React.useEffect(() => {
    if (radio == 0) useAllPoints();
    if (radio == 1) {
      useEnterPoints();
      refInput.focus();
    }
  }, [radio]);

  return (
    <Modal onRequestClose={onHandeCLoseModal} isVisible={isVisible}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text fontSize={20} fontFamily="bold">
            Using HP Points
          </Text>
          <Button onPress={onHandeCLoseModal}>
            <Image source={ICONS["close_header"]} style={styles.icon_close} />
          </Button>
        </View>

        <RadioUsePonts
          title="Use maximum available points"
          points={points}
          active={radio == 0 ? true : false}
          onChangeValue={onHandleActive(0)}
        />

        <RadioUsePonts
          title="Enter amount of points"
          active={radio == 1 ? true : false}
          onChangeValue={onHandleActive(1)}
        />

        <View style={styles.container_input_submit}>
          <Input
            value={point}
            onChangeText={onHandleChangeText}
            editable={radio == 1 ? true : false}
            refs={onHandleSetRef}
          />
          <ButtonSubmit
            title="Apply"
            width={84}
            height={32}
            styleText={styles.text_submit}
            onSubmit={onHandleApply}
            disabled={radio == 1 && !isEmpty(point) ? false : true}
            backgroundColor={radio == 1 && !isEmpty(point) ? "#0764b0" : "#a9a9a9"}
          />
        </View>

        <View style={styles.button_cancel}>
          <ButtonSubmit
            title="Cancel"
            width={84}
            onSubmit={onHandleCancel}
            backgroundColor="#FFF"
            textColor="#404040"
            styleText={{ fontSize: scaleSize(20) }}
          />
        </View>
      </View>
    </Modal>
  );
}

const RadioUsePonts = ({ title, points, active, onChangeValue }) => {
  return (
    <View style={styles.container_checkbox}>
      <RadioButton onChangeValue={onChangeValue} active={active} activeColor="#2ebe03" />
      <Text fontSize={15} color="#585858" style={styles.text}>
        {title}
      </Text>

      <Text fontSize={15} fontFamily="bold" color="#585858">
        {points}
      </Text>
    </View>
  );
};

const Input = ({ value, onChangeText, editable, refs }) => {
  return (
    <View style={styles.input}>
      <TextInput
        ref={(input) => refs(input)}
        style={styles.text_input}
        value={value}
        onChangeText={onChangeText}
        keyboardType="numeric"
        editable={editable}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width,
    height: scaleSize(260),
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

  container_input_submit: {
    width: scaleSize(382),
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    marginTop: scaleSize(19),
  },

  icon_close: {
    width: scaleSize(18),
    height: scaleSize(18),
    resizeMode: "contain",
  },

  input: {
    width: scaleSize(282),
    height: scaleSize(32),
    justifyContent: "center",
    alignItems: "center",
    borderRadius: scaleSize(4),
    borderWidth: 1,
    borderColor: "#dddddd",
    paddingLeft: scaleSize(10),
  },
  text_input: {
    width: "100%",
    height: scaleSize(32),
    fontSize: scaleSize(15),
    color: "#404040",
    textAlignVertical: "center",
    paddingVertical: 0,
  },
  container_checkbox: {
    width: scaleSize(382),
    flexDirection: "row",
    alignItems: "center",
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
  text: {
    marginRight: scaleSize(16),
    marginLeft: scaleSize(7),
  },
  text_submit: {
    fontSize: scaleSize(15),
    fontWeight: "500",
  },
  button_cancel: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
