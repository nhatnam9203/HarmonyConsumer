import React from "react";
import { View, TouchableOpacity } from "react-native";
import { Text } from "components";
import styles from "../../styles";
import { scaleWidth } from "utils";
import { useFormik } from "formik";
import * as Yup from "yup";
import Input from "./Input";
import { useDispatch, useSelector } from "react-redux";
import actions from "@redux/actions";
import * as RootNavigation from "navigations/RootNavigation";

const schema = Yup.object().shape({
  email: Yup.string().email("Email invalid"),
});

export default function index(props) {
  const dispatch = useDispatch();

  const { token } = useSelector((state) => state.datalocalReducer);

  const formik = useFormik({
    initialValues: {
      email: "",
      phone: "",
      message: "",
    },
    validationSchema: schema,
    onSubmit: (values) => {
      const { email, phone, message } = values;
      const body = {
        email,
        phone,
        message,
      };
      if (message.toString().trim() !== "") {
        dispatch(actions.storeAction.contact(body, token, afterContact));
      }
    },
  });

  const { values, handleChange, errors, handleSubmit, isValid } = formik;

  const afterContact = () => {
    formik.setFieldValue("email", "");
    formik.setFieldValue("phone", "");
    formik.setFieldValue("message", "");
    RootNavigation.navigate("Home");
  };

  return (
    <View style={{ padding: scaleWidth(3) }}>
      <Text style={styles.txtSendEmail}>Send Email</Text>
      <Input
        value={values.email}
        onChange={handleChange("email")}
        width={scaleWidth(94)}
        label="Email"
        placeholder="Your email"
        isLabel
        error={errors.email}
        optionsMask={{ mask: "***************************************************" }}
      />
      <Input
        value={values.phone}
        onChange={handleChange("phone")}
        width={scaleWidth(94)}
        label="Phone"
        placeholder="Your phone number"
        isLabel
        error={errors.phone}
        optionsMask={{ mask: "99999-999-9999" }}
      />
      <Input
        value={values.message}
        onChange={handleChange("message")}
        width={scaleWidth(94)}
        label="Message"
        placeholder="Message"
        isLabel
        isMessage={true}
        error={errors.message}
        optionsMask={{ mask: "***************************************************" }}
      />
      <TouchableOpacity onPress={handleSubmit} style={styles.buttonContact}>
        <Text style={styles.txtButtonContact}>Send</Text>
      </TouchableOpacity>
    </View>
  );
}
