import React, { Component } from "react";
import { Text, View, StyleSheet, TouchableOpacity, Platform } from "react-native";
import { scaleWidth } from "utils";
import Header from "./Header";
import Input from "./Input";
import { useFormik } from "formik";
import * as Yup from "yup";

const schema = Yup.object().shape({
  currentPassword: Yup.string().required("Required"),
  newPassword: Yup.string().required("Required"),
  confirmPassword: Yup.string()
    .required("Required")
    .oneOf([Yup.ref("newPassword"), null], "Passwords must match"),
});

export default function index(props) {
  const formik = useFormik({
    initialValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
    validationSchema: schema,
    onSubmit: (values) => {},
  });

  const { values, handleChange, errors, handleSubmit, isValid } = formik;

  return (
    <React.Fragment>
      <Header />
      <View style={styles.body}>
        <Input
          label="Current Password"
          onChange={handleChange("currentPassword")}
          value={values.currentPassword}
          width={scaleWidth(94)}
          placeholder=""
          error={errors.currentPassword}
          optionsMask={{ mask: "***************************************************" }}
        />
        <Input
          label="New Password"
          onChange={handleChange("newPassword")}
          value={values.newPassword}
          width={scaleWidth(94)}
          placeholder=""
          error={errors.newPassword}
          optionsMask={{ mask: "***************************************************" }}
        />
        <Input
          label="Confirm Password"
          onChange={handleChange("confirmPassword")}
          value={values.confirmPassword}
          width={scaleWidth(94)}
          placeholder=""
          error={errors.confirmPassword}
          optionsMask={{ mask: "***************************************************" }}
        />

        <TouchableOpacity style={styles.buttonSave}>
          <Text style={styles.txtSave}>Save</Text>
        </TouchableOpacity>
      </View>
    </React.Fragment>
  );
}

const styles = StyleSheet.create({
  body: {
    flex: 1,
    backgroundColor: "white",
    padding: scaleWidth(3),
  },
  buttonSave: {
    width: scaleWidth(94),
    height: scaleWidth(12),
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    borderRadius: 5,
    backgroundColor: "#0764B0",
    marginTop: scaleWidth(10),
  },
  txtSave: {
    color: "white",
    fontSize: scaleWidth(4),
    fontWeight: Platform.OS === "android" ? "bold" : "600",
  },
});
