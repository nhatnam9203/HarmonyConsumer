import React, { useState, useRef } from "react";
import { StyleSheet, View } from "react-native";
import * as yup from "yup";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { search_manually } from "@redux/actions/buygiftAction";
import { Text, Form, PhoneInput } from "components";
import { scaleSize, scaleWidth } from "utils";

const { Input, ButtonSubmit } = Form;

export default function ManuallyTab({ setStatusPopupInvite }) {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.datalocalReducer.token);

  const [phoneHeader, setPhoneHeader] = useState("+1");
  const [phone, setPhone] = useState("");
  const inputPhone = useRef(null);

  const { values, errors, handleSubmit, handleChange, handleBlur } = useFormik({
    initialValues: {
      full_name: "",
      phone: "",
      email: "",
      code: "",
    },
    validationSchema: yup.object().shape({
      email: yup.string().email("email not valid"),
    }),

    onSubmit: (values) => {
      // onNextScreen();
      if (phone.toString().trim() == "") {
        alert("enter your phone number");
        return;
      } else {
        let body = {
          fullname: values.full_name,
          email: values.email,
          phone: `${phoneHeader.replace("+", "")}${phone}`,
        };
        const query = `email=${body.email}&fullname=${body.fullname}&phone=${body.phone}`;
        dispatch(search_manually(token, query, searchNotFound));
      }
    },
  });

  const searchNotFound = (status) => {
    if (status == true) {
      const { full_name, email } = values;
      const infoReceiver = {
        full_name,
        email,
        phoneReceiver: `${phoneHeader}${phone}`,
      };
      setStatusPopupInvite(true, infoReceiver);
    }
  };

  const removePhone = () => {
    setPhone("");
  };

  return (
    <View style={styles.container}>
      <Text fontSize={17} fontFamily="medium" style={styles.text}>
        Receiver information
      </Text>

      <Input
        width={382}
        label="Full Name"
        onChangeText={handleChange("full_name")}
        value={values.full_name}
        error={errors.full_name}
        touched={handleBlur("full_name")}
      />

      <View style={styles.containerPhone}>
        <Text style={styles.txtTitle}>Phone number</Text>
        <PhoneInput
          phoneHeader={phoneHeader}
          refInput={inputPhone}
          phone={phone}
          setPhone={setPhone}
          setPhoneHeader={setPhoneHeader}
          removePhone={removePhone}
          stylesInput={{
            borderWidth: 0,
            borderBottomWidth: 1,
            borderBottomColor: "#eeeeee",
            width: "100%",
            marginTop: 0,
          }}
        />
      </View>

      <Input
        width={382}
        label="Email Address"
        onChangeText={handleChange("email")}
        value={values.email}
        error={errors.email}
        touched={handleBlur("email")}
      />

      <View style={styles.button}>
        <ButtonSubmit onSubmit={handleSubmit} title="Next" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: scaleWidth(100),
    paddingTop: scaleSize(20),
    paddingHorizontal: scaleWidth(3),
  },
  image: {
    width: scaleSize(48),
    height: scaleSize(48),
    resizeMode: "contain",
    marginLeft: scaleSize(15),
    marginRight: scaleSize(20),
  },
  content_text: {
    flex: 1,
    justifyContent: "space-between",
  },
  text: {
    fontWeight: "bold",
    marginBottom: scaleSize(25),
  },
  button: {
    position: "absolute",
    bottom: scaleSize(20),
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
  },
  containerPhone: {
    marginTop: -scaleSize(10),
    marginBottom: scaleSize(20),
  },
  txtTitle: {
    fontSize: scaleSize(17),
    color: "#333",
  },
});
