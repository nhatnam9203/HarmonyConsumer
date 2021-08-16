import React from "react";
import { View, ScrollView } from "react-native";
import Image from "react-native-fast-image";
import images from "assets";
import { scaleHeight } from "utils";
import Anonymous from "./Anonymous";
import Staff from "./Staff";
import styles from "./styles";

function List(props) {
  const { selectStaff, selectedStaffId, staffList, tempServices } = props;

  const renderWaitingAnyStaff = () => {
    console.log(tempServices);
    return (
      <React.Fragment>
        <Anonymous
          staffId={-1}
          selectedStaffId={selectedStaffId}
          selectStaff={selectStaff}
          name={"Waiting List"}
          icon={images.icon_waitingList}
          isDisabled={tempServices?.length > 1 && selectedStaffId !== -1 && selectedStaffId !== ""}
          color={"#0764B0"}
        />
        <Anonymous
          staffId={0}
          selectedStaffId={selectedStaffId}
          selectStaff={selectStaff}
          name={"Any staff"}
          icon={images.icon_anystaff}
          isDisabled={tempServices?.length > 1 && selectedStaffId !== 0 && selectedStaffId !== ""}
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
            // isDisabled={selectedStaffId === -1 || selectedStaffId === 0 ? true : false}
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
