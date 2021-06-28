import React from "react";
import { View, Linking, TouchableOpacity } from "react-native";
import { Text } from "components";
import styles from "../../styles";
import { scaleWidth } from "utils";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Entypo from "react-native-vector-icons/Entypo";

export default function index(props) {
  const openMail = () => {
    Linking.openURL("mailto:harmonyInfo@gmail.com");
  };

  return (
    <View style={{ padding: scaleWidth(3) }}>
      <Text style={styles.titleContactUs}>Contact us</Text>
      <Text style={styles.txtContact}>
        Get help and support, troubleshot your service or get in touch with us.
      </Text>
      <View style={[styles.rowContact, { alignItems: "flex-start" }]}>
        <View style={[styles.wrapIconContact, { marginTop: scaleWidth(0.5) }]}>
          <FontAwesome5 name="phone-alt" color="white" size={scaleWidth(3.5)} />
        </View>
        <View>
          <Text style={styles.txtItemContact}>800-531-3126</Text>
          <Text style={styles.txtItemContact}>813-534-0055 text</Text>
          <Text style={styles.txtItemContact}>888-316-8164 fax</Text>
        </View>
      </View>

      <View style={styles.rowContact}>
        <View style={styles.wrapIconContact}>
          <MaterialCommunityIcons name="email" color="white" size={scaleWidth(3.5)} />
        </View>
        <TouchableOpacity onPress={openMail}>
          <Text
            style={[styles.txtItemContact, { color: "#0764B0", textDecorationLine: "underline" }]}>
            team@harmonypayment.com
          </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.rowContact}>
        <View style={styles.wrapIconContact}>
          <Entypo name="location-pin" color="white" size={scaleWidth(3.5)} />
        </View>
        <Text style={[styles.txtItemContact, { width: scaleWidth(85) }]}>
          Harmony Payment System LLC, 35246 US Hwy 19 N.Suite 189 Palm Harbor,FL 34684
        </Text>
      </View>

      <View
        style={{
          width: scaleWidth(94),
          borderBottomWidth: 1,
          borderBottomColor: "#EEEEEE",
          marginTop: scaleWidth(3),
        }}
      />
    </View>
  );
}
