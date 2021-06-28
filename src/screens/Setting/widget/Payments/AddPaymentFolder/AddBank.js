import React from "react";
import { Text, View, TouchableOpacity } from "react-native";
import styles from "../styles";
import { scaleWidth } from "utils";
import Input from "../../PersonalInfo/Input";
import { useFormik } from "formik";
import * as Yup from "yup";

const schema = Yup.object().shape({
  bankName: Yup.string().required("Required"),
  address: Yup.string().required("Required"),
  routingNumber: Yup.string().required("Required"),
  accountNumber: Yup.string().required("Required"),
});

export default function AddBank(props) {
  const formik = useFormik({
    initialValues: {
      bankName: "",
      address: "",
      routingNumber: "",
      accountNumber: "",
    },
    validationSchema: schema,
    onSubmit: (values) => {},
  });

  const { values, handleChange, errors, handleSubmit, isValid } = formik;

  return (
    <View style={{ marginTop: scaleWidth(5), flex: 1, position: "relative" }}>
      <Text style={styles.txtCreditCard}>BANK ACCOUNT</Text>
      <Input
        value={values.bankName}
        onChange={handleChange("bankName")}
        width={scaleWidth(94)}
        label="Bank Name"
        placeholder="Bank Name"
        isForce
        isLabel
        error={errors.bankName}
        optionsMask={{ mask: "******************************" }}
      />
      <Input
        value={values.address}
        onChange={handleChange("address")}
        width={scaleWidth(94)}
        label="Address"
        placeholder="Address"
        isForce
        isLabel
        error={errors.address}
        optionsMask={{ mask: "*************************************" }}
      />
      <Input
        value={values.routingNumber}
        onChange={handleChange("routingNumber")}
        width={scaleWidth(94)}
        label="Routing Number"
        placeholder="Routing Number"
        isForce
        isLabel
        error={errors.routingNumber}
        optionsMask={{ mask: "*************************************" }}
      />
      <Input
        value={values.accountNumber}
        onChange={handleChange("accountNumber")}
        width={scaleWidth(94)}
        label="Account Number"
        placeholder="Account Number"
        isForce
        isLabel
        error={errors.accountNumber}
        optionsMask={{ mask: "*************************************" }}
      />
      <TouchableOpacity onPress={handleSubmit} style={styles.buttonAddCard}>
        <Text style={styles.txtButtonAddCard}>Add</Text>
      </TouchableOpacity>
    </View>
  );
}
