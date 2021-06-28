import React from "react";
import { View, Image } from "react-native";
import images from "assets";
import { Text } from "components";
import styles from "./styles";
import { useDispatch } from "react-redux";
import actions from "@redux/actions";
import { ButtonConfirm, Input } from "./widget";
import * as RootNavigation from "navigations/RootNavigation";

export default function index(props) {
  const dispatch = useDispatch();

  const [newPincode, setNewPincode] = React.useState("");
  const [confirmPincode, setConfirmPincode] = React.useState("");
  const [isLoading, setLoading] = React.useState(false);

  const { verifyId } = props.route.params;

  const onChangeNewPincode = (text) => {
    setNewPincode(text);
  };

  const onChangeConfirmPincode = (text) => {
    setConfirmPincode(text);
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

  const submitChangePincode = () => {
    setLoading(true);
    const body = {
      newPassword: newPincode,
    };
    dispatch(actions.authAction.setPassword(verifyId, body, null, afterSubmitChangePincode));
  };

  const afterSubmitChangePincode = () => {
    setLoading(false);
    RootNavigation.navigate("PhoneVerify");
  };

  return (
    <React.Fragment>
      <View style={styles.body}>
        <Text style={styles.txtSetup}>Setup PIN code</Text>
        <Image source={images.logoHarmony} style={styles.image} />

        <Input title="New PIN code" value={newPincode} onChange={onChangeNewPincode} />
        <Input
          title="Confirm new PIN code"
          value={confirmPincode}
          onChange={onChangeConfirmPincode}
        />

        <ButtonConfirm
          changeNewPincode={changeNewPincode}
          newPincode={newPincode}
          confirmPincode={confirmPincode}
        />
      </View>
    </React.Fragment>
  );
}
