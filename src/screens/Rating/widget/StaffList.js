import React from "react";
import { View, ScrollView } from "react-native";
import styles from "../styles";
import { Text } from "components";
import Staff from "./Staff";
import { scaleHeight } from "utils";

export default function index({
  staffList = [],
  staff_favourites = [staff_favourites],
  businessName,
}) {
  return (
    <>
      <Text style={styles.txtTop}>
        <Text style={styles.txtSatified}>Do you satisfied with the staff at </Text>
        <Text style={styles.txtStoreName}>{businessName}?</Text>
      </Text>

      <View style={{ marginTop: scaleHeight(5), flexDirection: "row" }}>
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
          {staffList.map((staff) => {
            const isCheck = staff_favourites.find((obj) => obj.staffId === staff.staffId);
            return <Staff isCheck={isCheck} staff={staff} key={"staff" + staff.staffId} />;
          })}
        </ScrollView>
      </View>
    </>
  );
}
