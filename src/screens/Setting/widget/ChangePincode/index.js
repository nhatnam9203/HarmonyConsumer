import React from "react";
import { Text, View, TouchableOpacity, Image, ActivityIndicator } from "react-native";
import images from "assets";
import { Header, StatusBar } from "components";

import { useSelector, useDispatch } from "react-redux";
import actions from "@redux/actions";
import * as RootNavigation from "navigations/RootNavigation";
import styles from "./styles";
import { Input } from "./widget";
import { getUniqueId } from "react-native-device-info";

export default function index(props) {
  const dispatch = useDispatch();

  const [curentPincode, setCurrentPincode] = React.useState("");
  const [newPincode, setNewPincode] = React.useState("");
  const [confirmPincode, setConfirmPincode] = React.useState("");
  const [isCurrentPincode, setIsCurrentPincode] = React.useState(true);
  const [isSuccess, setIsSuccess] = React.useState(false);
  const [isLoading, setLoading] = React.useState(false);

  const { userInfo, token } = useSelector((state) => state.datalocalReducer);
  const { phone } = userInfo;

  const onChangeCurentPincode = (text) => {
    setCurrentPincode(text);
  };

  const onChangeNewPincode = (text) => {
    setNewPincode(text);
  };

  const onChangeConfirmPincode = (text) => {
    setConfirmPincode(text);
  };

  const back = () => {
    RootNavigation.back();
  };

  const changeNewPincode = () => {
    if (newPincode.toString().length === 6 && confirmPincode.toString().length === 6) {
      if (newPincode !== confirmPincode) {
        alert("Your PIN code does not match!");
      } else {
        submitChangePincode();
      }
    } else {
      alert("Please enter your PIN code.");
    }
  };

  const checkPincode = () => {
    if (curentPincode.toString().length === 6) {
      checkPassword();
      return;
    }
  };

  const submitChangePincode = () => {
    const body = {
      oldPassword: curentPincode,
      newPassword: newPincode,
    };
    setLoading(true);
    dispatch(actions.authAction.changePincode(body, token, afterSubmitChangePincode));
  };

  const afterSubmitChangePincode = () => {
    setLoading(false);
    setIsSuccess(true);
  };

  const checkPassword = () => {
    const body = {
      phone,
      password: curentPincode,
      deviceId: getUniqueId(),
    };
    setLoading(true);
    dispatch(actions.authAction.checkPassword(body, afterCheckPassword));
  };

  const afterCheckPassword = (isCheck) => {
    if (isCheck) {
      setIsCurrentPincode(false);
    }
    setLoading(false);
  };

  function renderCurrentPincode() {
    if (!isSuccess)
      return (
        <React.Fragment>
          <Input
            title="Enter current PIN code"
            value={curentPincode}
            onChange={onChangeCurentPincode}
          />
          <View style={{ opacity: 0 }}>
            <Input />
          </View>
        </React.Fragment>
      );
  }

  function renderChangePincode() {
    if (!isSuccess)
      return (
        <React.Fragment>
          <Input title="Enter new PIN code" value={newPincode} onChange={onChangeNewPincode} />
          <Input
            title="Confirm new PIN code"
            value={confirmPincode}
            onChange={onChangeConfirmPincode}
          />
        </React.Fragment>
      );
  }

  return (
    <React.Fragment>
      <View style={{ backgroundColor: "#f8f8f8" }}>
        <StatusBar />
        <Header title="Change Pincode" headerLeft onBack={back} />
      </View>

      <View style={styles.body}>
        <Image source={!isSuccess ? images.phone : images.phone_success} style={styles.image} />

        {isSuccess && <Text style={styles.txtSuccess}>PIN code has been changed!</Text>}
        {isCurrentPincode && renderCurrentPincode()}
        {!isCurrentPincode && renderChangePincode()}

        {!isSuccess && (
          <TouchableOpacity
            onPress={isCurrentPincode ? checkPincode : changeNewPincode}
            style={styles.buttonSave}>
            {!isLoading && <Text style={styles.txtSave}>Next</Text>}
            {isLoading && <ActivityIndicator size="small" color="white" />}
          </TouchableOpacity>
        )}
        {isSuccess && (
          <TouchableOpacity onPress={back} style={styles.buttonSave}>
            <Text style={styles.txtSave}>Back</Text>
          </TouchableOpacity>
        )}
      </View>
    </React.Fragment>
  );
}
