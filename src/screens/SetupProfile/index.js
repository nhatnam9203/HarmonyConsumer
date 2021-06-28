import React, { useState, useEffect } from "react";
import { View, TouchableOpacity, Image, Text } from "react-native";
import { scaleWidth } from "utils";
import styles from "./styles";
import Input from "./widget/Input";
import InputDate from "./widget/InputDate";
import { useFormik } from "formik";
import * as Yup from "yup";
import * as RootNavigation from "navigations/RootNavigation";
import * as ImagePicker from "react-native-image-picker";
import { useDispatch } from "react-redux";
import actions from "@redux/actions";
import images from "assets";
import moment from "moment";
import DateTimePickerModal from "react-native-modal-datetime-picker";

const options = {
  title: "Select Avatar",
};

const schema = Yup.object().shape({
  firstName: Yup.string().required("Required"),
  lastName: Yup.string().required("Required"),
  email: Yup.string().required("Required").email("Email invalid"),
});

export default function index(props) {
  const dispatch = useDispatch();

  const [avatar, setAvatar] = useState(null);
  const [fileId, setFileId] = useState(0);
  const [isHasSignin, setSignin] = useState(false);
  const [isDatePicker, setDatePicker] = useState(false);
  const [birthDate, setbirthDate] = useState("1900-01-01");

  const { phone, userApple, isLoginApple, infoLogin } = props.route.params;

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      day: "",
      month: "",
      year: "",
      email: "",
    },
    validationSchema: schema,
    onSubmit: (values) => {
      const { month, day, year, firstName, lastName, email } = values;
      const info = {
        firstName,
        lastName,
        email,
        birthDate,
        phone,
        fileId,
        avatar,
        isHasSignin,
      };
      checkEmail(email, info);
    },
  });

  useEffect(() => {
    dispatch(actions.authAction.phoneHasSignin(phone, afterCheckPhone));
  }, [phone]);

  const afterCheckPhone = (data) => {
    if (data) {
      const { firstName, lastName, email } = data;
      formik.setFieldValue("firstName", firstName);
      formik.setFieldValue("lastName", lastName);
      formik.setFieldValue("email", email);
      setTimeout(() => {
        formik.setErrors({});
      }, 300);
      setSignin(true);
    } else {
      if (isLoginApple) {
        const { email } = infoLogin;
        formik.setFieldValue("email", email);
        setTimeout(() => {
          formik.setErrors({});
        }, 300);
      }
    }
  };

  const { values, handleChange, errors, handleSubmit, isValid } = formik;

  const toggleDatePicker = () => {
    const is_visible = !isDatePicker;
    setDatePicker(is_visible);
  };

  const handleConfirmPicker = (datePicker) => {
    const date = moment(datePicker).format("YYYY-MM-DD");
    setbirthDate(date);
    toggleDatePicker();
  };

  const selectAvatar = () => {
    ImagePicker.launchImageLibrary(options, async (response) => {
      if (response.didCancel) {
      } else if (response.error) {
      } else {
        setAvatar(response.uri);
        onSubmitAvatar(response);
      }
    });
  };

  const onSubmitAvatar = (response) => {
    let fileName = response.fileName;
    if (fileName) {
      if (Platform.OS === "ios" && (fileName.endsWith(".heic") || fileName.endsWith(".HEIC"))) {
        fileName = `${fileName.split(".")[0]}.JPG`;
      }
    }
    const body = {
      uri: response.uri,
      fileName: fileName ? fileName : "photo",
      type: response.type,
    };
    setAvatar(response.uri);
    const data = [];
    data.push(body);

    dispatch(actions.authAction.uploadAvatar(data, afterSubmitAvatar));
  };

  const afterSubmitAvatar = (file_id) => {
    setFileId(file_id);
  };

  const checkEmail = (email, info) => {
    dispatch(actions.authAction.checkEmail(email, info, afterCheckEmail));
  };

  const afterCheckEmail = (info) => {
    // console.log({ userInfo, userApple });
    RootNavigation.navigate("SetupPincode", { info, userApple: userApple ? userApple : null });
  };

  return (
    <View style={styles.container}>
      <Text style={[styles.title, { fontSize: scaleWidth(5) }]}>Profile Information</Text>
      <Text style={[styles.title, styles.title2]}>Please provide your profile information</Text>
      {!avatar && (
        <TouchableOpacity onPress={selectAvatar} style={styles.buttonCamera}>
          <Image
            source={images.camera_icon}
            style={{ width: scaleWidth(9), height: scaleWidth(9) }}
          />
        </TouchableOpacity>
      )}

      {avatar && (
        <TouchableOpacity onPress={selectAvatar}>
          <Image source={{ uri: avatar }} style={styles.imgAvatar} />
        </TouchableOpacity>
      )}

      <View style={{ width: "100%", padding: scaleWidth(5) }}>
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <Input
            value={values.firstName}
            onChange={handleChange("firstName")}
            width={scaleWidth(42)}
            label="Your name"
            placeholder="First Name"
            isForce
            isLabel
            error={errors.firstName}
            optionsMask={{ mask: "***************************************************" }}
          />
          <Input
            onChange={handleChange("lastName")}
            value={values.lastName}
            width={scaleWidth(42)}
            placeholder="Last Name"
            error={errors.lastName}
            optionsMask={{ mask: "***************************************************" }}
          />
        </View>

        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <InputDate
            onPress={toggleDatePicker}
            value={birthDate.slice(8, 10)}
            onChange={handleChange("day")}
            width={scaleWidth(28)}
            label="Date of birth"
            placeholder="dd"
            isLabel
            error={errors.day}
            optionsMask={{ mask: "99" }}
          />
          <InputDate
            onPress={toggleDatePicker}
            value={birthDate.slice(5, 7)}
            onChange={handleChange("month")}
            width={scaleWidth(28)}
            placeholder="mm"
            error={errors.month}
            optionsMask={{ mask: "99" }}
          />
          <InputDate
            onPress={toggleDatePicker}
            value={birthDate.slice(0, 4)}
            onChange={handleChange("year")}
            width={scaleWidth(28)}
            placeholder="yyyy"
            error={errors.year}
            optionsMask={{ mask: "9999" }}
          />
        </View>

        <Input
          value={values.email}
          onChange={handleChange("email")}
          isLabel
          disabled={isLoginApple ? true : false}
          isForce
          width={scaleWidth(90)}
          placeholder="Email address"
          label="Email"
          optionsMask={{ mask: "***************************************************" }}
          error={errors.email}
        />

        <TouchableOpacity
          onPress={handleSubmit}
          disabled={!isValid}
          style={styles.buttonContinue(isValid)}>
          <Text style={styles.txtcontinue(isValid)}>Continue</Text>
        </TouchableOpacity>
      </View>
      <DateTimePickerModal
        isVisible={isDatePicker}
        mode="date"
        onConfirm={handleConfirmPicker}
        onCancel={toggleDatePicker}
      />
    </View>
  );
}
