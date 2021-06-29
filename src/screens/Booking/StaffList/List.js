import React from "react";
import { View, ScrollView } from "react-native";
import Image from "react-native-fast-image";
import images from "assets";
import { scaleHeight } from "utils";
import Anonymous from "./Anonymous";
import Staff from "./Staff";
import styles from "./styles";
import { useSelector } from "react-redux";

function List(props) {
  const { selectStaff, selectedStaffId, isProduct } = props;

  let staff_service = useSelector((state) => state.staffReducer.staff_service);
  let staffMerchant = useSelector((state) => state.staffReducer.staff_by_merchant);
  staffMerchant = staffMerchant.filter((obj) => obj.isDisabled == 0 && obj.isActive == true);

  const convertStaffService = () => {
    let tempt = [];
    for (let i = 0; i < staffMerchant.length; i++) {
      let temptStaff = staff_service.find((s) => s.staffId == staffMerchant[i].staffId);
      if (temptStaff) tempt.push(staffMerchant[i]);
    }
    return tempt;
  };

  let staffList = isProduct ? staffMerchant : convertStaffService();

  const renderWaitingAnyStaff = () => {
    return (
      <React.Fragment>
        <Anonymous
          staffId={-1}
          selectedStaffId={selectedStaffId}
          selectStaff={selectStaff}
          name={"Waiting List"}
          icon={images.icon_waitingList}
          isDisabled={selectedStaffId !== -1 && selectedStaffId !== ""}
          color={"#0764B0"}
        />
        <Anonymous
          staffId={0}
          selectedStaffId={selectedStaffId}
          selectStaff={selectStaff}
          name={"Any staff"}
          icon={images.icon_anystaff}
          isDisabled={selectedStaffId !== 0 && selectedStaffId !== ""}
          color={"#0764B0"}
        />
      </React.Fragment>
    );
  };

  const renderStaffList = () => {
    return staffList
      .filter((s) => s.isDisabled == 0 && s.isActive == true && s.isDeleted == 0)
      .map((obj) => {
        const renderImg = obj.imageUrl
          ? { uri: obj.imageUrl, priority: Image.priority.high }
          : images.avatar;

        return (
          <Staff
            key={obj.staffId}
            renderImg={renderImg}
            selectStaff={selectStaff}
            isDisabled={selectedStaffId === -1 || selectedStaffId === 0 ? true : false}
            isActive={selectedStaffId === obj.staffId ? true : false}
            obj={obj}
          />
        );
      });
  };

  return (
    <View style={styles.container}>
      <ScrollView bounces={false} showsVerticalScrollIndicator={false}>
        {renderWaitingAnyStaff()}
        {renderStaffList()}
        <View style={{ height: scaleHeight(20) }} />
      </ScrollView>
    </View>
  );
}

export default React.memo(List);
