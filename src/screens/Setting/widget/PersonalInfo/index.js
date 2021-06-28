import React, { useEffect, useState } from "react";
import { View, TouchableOpacity, Platform } from "react-native";
import { Text } from "components";
import { Loading, Header, StatusBar } from "components";
import { scaleWidth, slop } from "utils";
import Image from "react-native-fast-image";
import styles from "./styles";
import images from "assets";
import moment from "moment";

import Input from "./Input";
import InputDate from "./InputDate";
import InputPhoneNumber from "./InputPhoneNumber";
import * as ImagePicker from "react-native-image-picker";

import { useSelector, useDispatch } from "react-redux";
import actions from "@redux/actions";
import { useFormik } from "formik";
import * as Yup from "yup";
import * as RootNavigation from "navigations/RootNavigation";
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

  const [urlAvatar, setAvatar] = React.useState("");
  const [file_Id, setFileId] = React.useState(0);
  const [isLoading, setLoading] = React.useState(false);
  const [isDatePicker, setDatePicker] = useState(false);
  const [birth_date, setbirthDate] = useState("1900-01-01");

  const userInfo = useSelector((state) => state.datalocalReducer.userInfo);
  const token = useSelector((state) => state.datalocalReducer.token);

  const { firstName, lastName, birthDate, email, phone, address, avatarURL, fileId, userId } =
    userInfo;

  const year = birthDate.slice(0, 4);
  const month = birthDate.slice(5, 7);
  const day = birthDate.slice(8, 10);

  useEffect(() => {
    setbirthDate(birthDate);
    const file_id = fileId ? fileId : 0;
    const imgAvatar = avatarURL ? avatarURL : null;
    setFileId(file_id);
    setAvatar(imgAvatar);
  }, []);

  const formik = useFormik({
    initialValues: {
      firstName,
      lastName,
      day,
      month,
      year,
      email,
      address,
      phone,
    },
    validationSchema: schema,
    onSubmit: (values) => {
      const body = {
        firstName: values.firstName,
        lastName: values.lastName,
        fullName: `${values.firstName} ${values.lastName}`,
        birthdate: `${birth_date.slice(0, 4)}-${birth_date.slice(5, 7)}-${birth_date.slice(8, 10)}`,
        email: values.email,
        address: values.address,
        city: "",
        stateId: 0,
        fileId: file_Id,
      };

      setLoading(true);
      dispatch(actions.authAction.updateCustomer(body, token, afterUpdateInfo));
    },
  });

  const back = () => {
    RootNavigation.back();
  };

  const toggleDatePicker = () => {
    const is_visible = !isDatePicker;
    setDatePicker(is_visible);
  };

  const handleConfirmPicker = (datePicker) => {
    const date = moment(datePicker).format("YYYY-MM-DD");
    setbirthDate(date);
    toggleDatePicker();
  };

  const afterUpdateInfo = () => {
    dispatch(actions.authAction.getCustomerById(userId, token, stopLoading));
  };

  const stopLoading = () => {
    setLoading(false);
    RootNavigation.back();
  };

  /* SELECT AVATAR */
  const onSelectAvatar = () => {
    ImagePicker.launchImageLibrary(options, async (response) => {
      if (response.didCancel) {
      } else if (response.error) {
        alert(response.error);
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

    setLoading(true);
    dispatch(actions.authAction.uploadAvatar(data, afterSubmitAvatar));
  };

  const afterSubmitAvatar = (file_id) => {
    setLoading(false);
    setFileId(file_id);
  };
  /* END SELECT AVATAR */

  /********************************** RENDER  ********************************** */

  const { values, handleChange, errors, handleSubmit } = formik;
  const renderUrl = urlAvatar ? { uri: urlAvatar } : images.avatar;

  return (
    <View style={styles.container}>
      <View style={{ backgroundColor: "#f8f8f8" }}>
        <StatusBar />
        <Header
          title="Personal Info"
          headerLeft
          onBack={back}
          headerRight
          onPressRight={handleSubmit}
          iconRight={images.checked}
        />
      </View>
      <View style={styles.body}>
        <Avatar renderUrl={renderUrl} onSelectAvatar={onSelectAvatar} />
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <Input
            value={values.firstName}
            onChange={handleChange("firstName")}
            width={scaleWidth(42)}
            label="First Name"
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
            label="Last Name"
            placeholder="Last Name"
            isForce
            isLabel
            error={errors.lastName}
            optionsMask={{ mask: "***************************************************" }}
          />
        </View>

        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <InputDate
            onPress={toggleDatePicker}
            value={birth_date.slice(8, 10)}
            onChange={handleChange("day")}
            width={scaleWidth(28)}
            label="Birthday"
            placeholder="dd"
            isLabel
            error={errors.day}
            optionsMask={{ mask: "99" }}
          />
          <InputDate
            onPress={toggleDatePicker}
            value={birth_date.slice(5, 7)}
            onChange={handleChange("month")}
            width={scaleWidth(28)}
            placeholder="mm"
            error={errors.month}
            optionsMask={{ mask: "99" }}
          />
          <InputDate
            onPress={toggleDatePicker}
            value={birth_date.slice(0, 4)}
            onChange={handleChange("year")}
            width={scaleWidth(28)}
            placeholder="yyyy"
            error={errors.year}
            optionsMask={{ mask: "9999" }}
          />
        </View>
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <Input
            value={values.address}
            onChange={handleChange("address")}
            isLabel
            width={scaleWidth(94)}
            placeholder="Address"
            label="Address"
            optionsMask={{ mask: "***************************************************" }}
            error={errors.address}
          />
        </View>
        <Text style={{ marginTop: scaleWidth(7) }}>
          <Text
            fontFamily="medium"
            style={[
              styles.txt,
              {
                marginTop: scaleWidth(7),
                fontSize: scaleWidth(3.7),
                // fontWeight: Platform.OS === "android" ? "bold" : "600",
              },
            ]}>
            Phone Number
          </Text>
          <Text style={{ fontSize: scaleWidth(4), color: "red" }}> *</Text>
        </Text>
        <View pointerEvents={"none"} style={styles.menu}>
          <InputPhoneNumber
            value={values.phone}
            onChange={handleChange("phone")}
            width={scaleWidth(94)}
            placeholder="Phone Number"
            error={errors.phone}
          />
        </View>
        {errors.phone && (
          <Text style={{ color: "red", fontSize: scaleWidth(3.5) }}>{errors.phone}</Text>
        )}

        <Input
          value={values.email}
          onChange={handleChange("email")}
          isLabel
          width={scaleWidth(94)}
          placeholder="Email address"
          label="Email"
          isForce
          optionsMask={{ mask: "***************************************************" }}
          error={errors.email}
        />
      </View>
      {isLoading && <Loading />}
      <DateTimePickerModal
        isVisible={isDatePicker}
        mode="date"
        onConfirm={handleConfirmPicker}
        onCancel={toggleDatePicker}
      />
    </View>
  );
}

const Avatar = ({ renderUrl, onSelectAvatar }) => {
  return (
    <>
      <Image source={renderUrl} style={styles.avatar} />
      <TouchableOpacity onPress={onSelectAvatar}>
        <Text style={styles.txtChangeAvatar}>Change Avatar</Text>
      </TouchableOpacity>
    </>
  );
};
