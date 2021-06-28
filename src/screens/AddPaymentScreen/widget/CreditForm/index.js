import React from "react";
import { View } from "react-native";
import * as yup from "yup";
import { useDispatch, useSelector } from "react-redux";

import { useFormik } from "formik";
import * as ValidCard from "card-validator";

import { add_creditCard } from "@redux/actions/creditAndBankAction";
import { Form, Text } from "components";
import styles from "../../styles";
import { scaleSize } from "utils";
const { Input, InputCreditCard, ButtonSubmit } = Form;

export default function index({ tabLabel, ref }) {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.datalocalReducer.token);

  const { values, touched, errors, handleSubmit, handleChange, setFieldValue } = useFormik({
    initialValues: {
      ExpiredDate: "",
      CVV: "",
      CardHolderName: "",
      CardNumber: "",
    },
    validationSchema: yup.object().shape({
      ExpiredDate: yup
        .string()
        .matches(/^(0[1-9]|1[0-2])\/?([0-9]{4}|[0-9]{2})$/, "invalid Expired Date")
        .required("enter your Expired Date"),

      CVV: yup.string().required("enter your CVV").min(3).max(3),

      CardHolderName: yup.string().required("enter your Name On Card"),
    }),

    onSubmit: (values) => onHandleSubmit(values),
  });

  let numberValidation = ValidCard.number(values.CardNumber);
  let typeCard = numberValidation.card ? numberValidation.card.niceType : "";
  let arrValues = Object.keys(values);
  let isFullFill = arrValues.every((item) => values[item] != "");

  const onHandleSubmit = (values) => {
    let body = {
      type: typeCard,
      cardholderName: values.CardHolderName,
      cardNumber: values.CardNumber.replace(/ /g, ""),
      expDate: values.ExpiredDate,
      cvv: values.CVV,
    };
    dispatch(add_creditCard(body, token, () => {}));
  };

  const clearInputCard = () => {
    setFieldValue("CardNumber", "");
  };
  //---------------------------//

  return (
    <View tabLabel={tabLabel} style={[styles.tabStyle, { flex: 1 }]}>
      <View style={styles.title}>
        <Text fontSize={17} color="#888888" style={{ fontWeight: "500" }}>
          Details
        </Text>
      </View>

      <InputCreditCard
        width={382}
        placeHolder="Card number"
        label="Card number"
        onChangeText={handleChange("CardNumber")}
        value={values.CardNumber}
        error={errors.CardNumber}
        touched={touched.CardNumber}
        typeCard={typeCard}
        onClear={clearInputCard}
        // autoFocus={true}
      />

      {/* {numberValidation.isValid && ( */}
      <Input
        width={382}
        placeHolder="NAME ON CARD"
        label="Card Holder Name"
        isRequire={true}
        onChangeText={handleChange("CardHolderName")}
        value={values.CardHolderName}
        error={errors.CardHolderName}
        touched={touched.CardHolderName}
      />
      {/* )} */}

      {/* {numberValidation.isValid && ( */}
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          width: scaleSize(382),
        }}>
        <Input
          width={175}
          isRequire={true}
          placeHolder="MM/YY"
          label="Expired Date"
          isRequire={true}
          onChangeText={handleChange("ExpiredDate")}
          value={values.ExpiredDate}
          error={errors.ExpiredDate}
          touched={touched.ExpiredDate}
          type={"datetime"}
          options={{
            format: "MM/YY",
          }}
        />
        <Input
          width={175}
          placeHolder="CVV"
          label="CVV"
          isRequire={true}
          onChangeText={handleChange("CVV")}
          value={values.CVV}
          error={errors.CVV}
          touched={touched.CVV}
          type={"custom"}
          options={{
            mask: "999",
          }}
        />
      </View>
      {/* )} */}
      {/* {numberValidation.isValid && ( */}
      <ButtonSubmit
        title="Save"
        width={350}
        onSubmit={handleSubmit}
        disabled={!isFullFill ? true : false}
        backgroundColor={!isFullFill ? "#F6F6F6" : "#0764B0"}
        textColor={!isFullFill ? "#585858" : "#FFF"}
        style={{
          position: "absolute",
          bottom: scaleSize(30),
        }}
      />
      {/* )} */}
    </View>
  );
}
