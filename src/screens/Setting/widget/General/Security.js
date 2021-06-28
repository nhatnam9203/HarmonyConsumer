import React from "react";
import { View, TouchableOpacity } from "react-native";
import { Text } from "components";
import { scaleWidth, slop } from "utils";
import styles from "./styles";
import AntDesign from "react-native-vector-icons/AntDesign";
import { Switch } from "react-native-paper";
import * as RootNavigation from "navigations/RootNavigation";
import { useDispatch, useSelector } from "react-redux";
import actions from "@redux/actions";

export default function Security(props) {
  const dispatch = useDispatch();

  const { isBiometric } = useSelector((state) => state.authReducer);

  const navigateToChangePincode = () => {
    RootNavigation.navigate("ChangePincode");
  };

  const onChangeBiometric = () => {
    dispatch(actions.generalAction.setBiometric(!isBiometric));
  };

  return (
    <View>
      <Text fontFamily="medium" style={styles.title}>
        Security
      </Text>
      <TouchableOpacity slop={slop} onPress={navigateToChangePincode} style={styles.row}>
        <Text style={styles.txt}>Change PIN code</Text>
        <AntDesign name="right" size={scaleWidth(4)} color={"#585858"} />
      </TouchableOpacity>
      <View style={styles.row}>
        <Text style={styles.txt}>Biometric Login</Text>
        <Switch value={isBiometric} onValueChange={onChangeBiometric} color={"#0764B0"} />
      </View>
    </View>
  );
}
