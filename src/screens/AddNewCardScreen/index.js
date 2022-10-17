import React from "react";
import { View, Image, TouchableOpacity } from "react-native";
import * as yup from "yup";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";

import actions from "@redux/actions";
import ICONS from "assets";
import {
  Text,
  Button,
  Header,
  Form,
  RadioButton,
  StatusBar,
  FocusAwareStatusBar,
} from "components";
import * as RootNavigation from "navigations/RootNavigation";
import styles from "./style";

const { Input, ButtonSubmit } = Form;

export default function index(props) {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.datalocalReducer.token);

  const [isPrimary, setPrimaryCard] = React.useState(false);

  const { values, touched, errors, handleSubmit, handleChange, setFieldValue } = useFormik({
    initialValues: {
      serialNumber: "",
    },
    validationSchema: yup.object().shape({
      serialNumber: yup.string().required("enter your Serial number"),
    }),

    onSubmit: (values) => onHandleSubmit(values),
  });

  const onHandleSubmit = (values) => {
    let body = { ...values, isPrimaryCard: isPrimary ? 1 : 0 };
    dispatch(actions.cardAction.add_card(token, body));
  };

  const onBack = () => {
    RootNavigation.back();
  };

  const handleOnChangeValue = React.useCallback(() => {
    setPrimaryCard(!isPrimary);
  }, [isPrimary]);

  const onHandleScan = (typeScan) => () => {
    let obj;
    switch (typeScan) {
      case "serialNumber":
        obj = {
          headerText: "Scan barcode",
          onPress: setFieldValue,
          field: typeScan,
          marker: ICONS["marker_barcode"],
        };
        break;

      default:
        break;
    }

    RootNavigation.navigate("ScanGiftCard", {
      objScan: obj,
    });
  };

  return (
    <View style={styles.container}>
      <FocusAwareStatusBar barStyle="dark-content" backgroundColor="transparent" />
      <View style={{ backgroundColor: "#f8f8f8" }}>
        <StatusBar />
        <Header title="Add a card" headerLeft={true} onBack={onBack} />
      </View>

      <View style={styles.container_center}>
        <View style={styles.container_giftcard}>
          <View style={{ flex: 1, padding: 12 }}>
            <View style={styles.wrapper_input}>
              <Input
                width={326}
                placeHolder="serial number"
                label="Gift card serial number"
                onChangeText={handleChange("serialNumber")}
                value={values.serialNumber}
                error={errors.serialNumber}
                touched={touched.serialNumber}
              />
              <IconClick icon={ICONS["scan_barcode"]} onPress={onHandleScan("serialNumber")} />
            </View>
          </View>
          <View style={styles.line_bottom} />
        </View>

        <TouchableOpacity
          onPress={handleOnChangeValue}
          activeOpacity={1}
          style={styles.container_radio_button}>
          <RadioButton onChangeValue={handleOnChangeValue} active={isPrimary} />
          <Text color="#0764B0" style={{ marginLeft: 10 }}>
            Make primary card
          </Text>
        </TouchableOpacity>

        <View style={styles.button_submit}>
          <ButtonSubmit title="Add card" onSubmit={handleSubmit} width={160} />
        </View>
      </View>
    </View>
  );
}

const IconClick = ({ icon, onPress }) => {
  return (
    <Button
      hitSlop={{ top: 15, bottom: 15, left: 20, right: 20 }}
      style={styles.button_position}
      onPress={onPress}>
      <Image source={icon} style={styles.image} />
    </Button>
  );
};
