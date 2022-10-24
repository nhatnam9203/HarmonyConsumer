import React from "react";
import { ScrollView, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import * as yup from "yup";
import { useFormik } from "formik";

import { add_BankCard } from "@redux/actions/creditAndBankAction";
import { Form, Text } from "components";
import styles from "../../styles";
const { Input, ButtonSubmit } = Form;
import _ from "lodash";

export default function index({ tabLabel }) {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.datalocalReducer.token);

  const { values, touched, errors, handleSubmit, handleChange, resetForm } = useFormik({
    initialValues: {
      BankName: "",
      Address: "",
      RoutingNumber: "",
      AccountNumber: "",
    },
    validationSchema: yup.object().shape({
      BankName: yup.string().required("enter your Bank Name"),
      RoutingNumber: yup.number().required("enter your Routing Number"),
      AccountNumber: yup.number().required("enter your Account Number"),
    }),

    onSubmit: (values) => onHandleSubmit(values),
  });

  //-------- variable ----------//
  let arrValues = Object.keys(values);
  const keyRequired = _.filter(arrValues, item => {
    return item != "Address"
  })
  let isFullFill = keyRequired.every((item) => values[item] != "");
  //--------------------------//

  //-------- function ----------//
  const onHandleSubmit = (values) => {
    const { BankName, Address, RoutingNumber, AccountNumber } = values;
    let body = {
      AccountHolderName: BankName,
      AccountNumber: AccountNumber.replace(/ /g, ""),
      RoutingNumber,
      Address,
    };
    dispatch(add_BankCard(body, token, resetForm));
  };

  //---------------------------//

  return (
    <ScrollView tabLabel={tabLabel} contentContainerStyle={{ padding: 16 }}>
      <View style={styles.title}>
        <Text fontSize={17} color="#888888" style={{ fontWeight: "500" }}>
          Details
        </Text>
      </View>

      <Input
        width={382}
        placeHolder="Bank name"
        label="Bank Name"
        isRequire={true}
        onChangeText={handleChange("BankName")}
        value={values.BankName}
        error={errors.BankName}
        touched={touched.BankName}
      />

      <Input
        width={382}
        placeHolder="Address"
        label="Address"
        onChangeText={handleChange("Address")}
        value={values.Address}
        error={errors.Address}
        touched={touched.Address}
      />

      <Input
        width={382}
        placeHolder="Routing number"
        label="Routing Number"
        isRequire={true}
        onChangeText={handleChange("RoutingNumber")}
        value={values.RoutingNumber}
        error={errors.RoutingNumber}
        touched={touched.RoutingNumber}
        keyboardType="numeric"
      />

      <Input
        width={382}
        placeHolder="Account number"
        label="Account Number"
        isRequire={true}
        onChangeText={handleChange("AccountNumber")}
        value={values.AccountNumber}
        error={errors.AccountNumber}
        touched={touched.AccountNumber}
        keyboardType="numeric"
      />

      {
        <ButtonSubmit
          disabled={!isFullFill ? true : false}
          title="Save"
          width={384}
          onSubmit={handleSubmit}
          backgroundColor={!isFullFill ? "#F6F6F6" : "#0764B0"}
          textColor={!isFullFill ? "#585858" : "#FFF"}
        />
      }
    </ScrollView>
  );
}
