import React, { useState } from "react";
import { View, StyleSheet, TouchableOpacity, ActivityIndicator } from "react-native";
import { Text } from "components";
import { scaleWidth, slop } from "utils";
import AntDesign from "react-native-vector-icons/AntDesign";
import Feather from "react-native-vector-icons/Feather";
import * as RootNavigation from "navigations/RootNavigation";

export default function PopupAccepTerm(props) {
  const [isAccep, setAccept] = useState(false);

  const toggleAccept = () => {
    setAccept(!isAccep);
  };

  const { onPressContinue, isLoadingVerify, phone } = props;

  const navigateToTermCondition = () => {
    RootNavigation.navigate("TermCondition");
  };

  return (
    <View pointerEvents={isLoadingVerify ? "none" : "auto"} style={styles.container}>
      <Text style={styles.txtContent}>Register a HarmonyPay account with the phone number</Text>
      <Text fontFamily="medium" style={[styles.txtPhone]}>
        {phone}
      </Text>

      <View style={{ flexDirection: "row", alignItems: "center" }}>
        {!isAccep && (
          <TouchableOpacity hitSlop={slop} onPress={toggleAccept}>
            <Feather
              name="square"
              color="#dddddd"
              size={scaleWidth(6)}
              style={{ marginRight: scaleWidth(2) }}
            />
          </TouchableOpacity>
        )}
        {isAccep && (
          <TouchableOpacity hitSlop={slop} onPress={toggleAccept}>
            <AntDesign
              name="checksquare"
              color="#1366AE"
              size={scaleWidth(6)}
              style={{ marginRight: scaleWidth(2) }}
            />
          </TouchableOpacity>
        )}
        <Text style={styles.txtContent}>
          <Text style={styles.txtContent}>I accept the</Text>
          <Text onPress={navigateToTermCondition} style={[styles.txtContent, styles.txtBlue]}>
            {" "}
            Term And Conditions
          </Text>
        </Text>
      </View>

      <View style={styles.containerButton}>
        <TouchableOpacity onPress={() => props.onCancel()} style={styles.button}>
          <Text style={styles.txtButton}>CANCEL</Text>
        </TouchableOpacity>

        <TouchableOpacity disabled={!isAccep} onPress={onPressContinue} style={styles.button}>
          <Text style={[styles.txtButton, { color: "#1366AE" }]}>CONTINUE</Text>
        </TouchableOpacity>
      </View>
      {isLoadingVerify && (
        <View style={styles.containerLoading}>
          <ActivityIndicator size={"large"} color="#333" />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: scaleWidth(90),
    borderRadius: 8,
    backgroundColor: "#fff",
    padding: scaleWidth(5),
    position: "relative",
  },
  containerLoading: {
    position: "absolute",
    ...StyleSheet.absoluteFill,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: scaleWidth(3.5),
    color: "#6A6A6A",
  },
  txtContent: {
    fontSize: scaleWidth(4.3),
    color: "#6A6A6A",
  },
  txtBlue: {
    fontWeight: "600",
    color: "#1366AE",
  },
  button: {
    width: scaleWidth(45),
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: scaleWidth(4),
  },
  txtButton: {
    fontWeight: "600",
    fontSize: scaleWidth(4),
    color: "#6A6A6A",
  },
  txtPhone: {
    marginVertical: scaleWidth(5),
    fontSize: scaleWidth(4.3),
    color: "#404040",
  },
  containerButton: {
    flexDirection: "row",
    borderTopWidth: 1,
    borderTopColor: "#eeeeee",
    marginTop: scaleWidth(5),
    marginHorizontal: -scaleWidth(5),
    marginBottom: -scaleWidth(5),
  },
});
