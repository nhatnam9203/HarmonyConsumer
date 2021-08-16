import React from "react";
import { View, StyleSheet, Platform } from "react-native";
import { TouchableRipple } from "react-native-paper";
import { Text } from "components";
import ListStaff from "./List";
import Header from "./Header";
import { scaleWidth } from "utils";
import useHook from "./hook";
import { useSelector } from "react-redux";

export default function index(props) {
  const [status, selectedStaffId, selectStaff, selectDate, isProduct, tempServices] = useHook(props);

  let staff_service = useSelector((state) => state.staffReducer.staff_service);
  let staffMerchant = useSelector((state) => state.staffReducer.staff_by_merchant);
  staffMerchant = staffMerchant.filter((obj) => obj.isDisabled == 0 && obj.isActive == true);

  const convertStaffService = () => {
    // console.log("staff_service");
    // console.log(staff_service);
    // console.log("staffMerchant");
    // console.log(staffMerchant);

    let tempt = [];
    for (let i = 0; i < staffMerchant.length; i++) {
      let temptStaff = staff_service.find((s) => s.staffId == staffMerchant[i].staffId);
      if (temptStaff) tempt.push(staffMerchant[i]);
    }
    return tempt;
  };

  let staffList = isProduct ? staffMerchant : convertStaffService();

  const isShowButtonBook =
    staffList.find((s) => parseInt(s.staffId) === selectedStaffId) ||
    selectedStaffId === -1 ||
    selectedStaffId === 0
      ? true
      : false;

  // const isShowButtonBook = staffList.find((s) => parseInt(s.staffId) === selectedStaffId)
  //   ? true
  //   : false;

  return (
    <View style={styles.container}>
      <Header title={`Select Staff`} step={2} />
      <ListStaff
        status={status}
        selectedStaffId={selectedStaffId}
        selectStaff={selectStaff}
        isProduct={isProduct}
        staffList={staffList}
        tempServices={tempServices}
      />
      {selectedStaffId >= -1 && isShowButtonBook && (
        <View style={styles.bottom}>
          <TouchableRipple borderless={true} onPress={selectDate} style={styles.btn}>
            <Text style={styles.txtBook}>Book</Text>
          </TouchableRipple>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: "relative",
  },
  btn: {
    borderRadius: 8,
    backgroundColor: "#0764B0",
    width: scaleWidth(90),
    height: scaleWidth(13, 5),
    justifyContent: "center",
    alignItems: "center",
  },
  bottom: {
    position: "absolute",
    padding: scaleWidth(5),
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "white",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: -1,
    },
    shadowOpacity: 0.08,
    shadowRadius: 1.84,
    elevation: 2,
  },
  txtBook: {
    fontSize: scaleWidth(4.5),
    fontWeight: Platform.OS === "android" ? "bold" : "600",
    color: "white",
  },
});
