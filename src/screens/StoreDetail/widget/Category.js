import React, { useContext } from "react";
import {
  View,
  StyleSheet,
  ActivityIndicator,
  Platform,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { Text } from "components";
import { scaleWidth } from "utils";
import StoreContext from "./context";

export default function Category(props) {
  const { category, measureCategory, isBottom } = props;

  const store_context = useContext(StoreContext);
  const { isLoadingCategory, refCategory, isActive, setActive } = store_context;

  const selectCategory = (index, cate) => {
    setActive(index);
    store_context.onSelectCategory(index, cate);
  };

  if (!isBottom) {
    if (isLoadingCategory) {
      return (
        <View style={styles.containerLoading}>
          <ActivityIndicator size="small" color="#333" />
        </View>
      );
    } else
      return (
        <View style={styles.wrap}>
          <ScrollView ref={refCategory} horizontal={true} showsHorizontalScrollIndicator={false}>
            {category
              .filter((ct) => ct.isDisabled == 0 && ct.isDeleted == 0)
              .map((ct, index) => {
                return (
                  <View
                    onLayout={(e) => measureCategory(e, ct, index)}
                    key={ct.categoryId}
                    style={styles.btnCategory(isActive, index)}>
                    <TouchableOpacity onPress={() => selectCategory(index, ct)}>
                      <Text style={styles.txtCategory(isActive, index)}>{`${ct.name}`}</Text>
                    </TouchableOpacity>
                  </View>
                );
              })}
          </ScrollView>
        </View>
      );
  }
  return null;
}

const styles = StyleSheet.create({
  wrap: {
    flexDirection: "row",
    alignItems: "center",
    // marginTop: scaleWidth(3),
    backgroundColor: "white",
    paddingHorizontal: scaleWidth(3),
    width: scaleWidth(100),
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    borderBottomColor: "#eeeeee",
    borderBottomWidth: 1,
    shadowOpacity: 0.09,
    shadowRadius: 1.84,
    paddingVertical: scaleWidth(2),
  },
  btnCategory: (isActive, index) => {
    return {
      paddingHorizontal: scaleWidth(3),
      paddingVertical: scaleWidth(1.7),
      backgroundColor: isActive === index ? "#0764B0" : "white",
      borderRadius: scaleWidth(100),
      marginRight: scaleWidth(3),
    };
  },
  txtCategory: (isActive, index) => {
    return {
      color: isActive === index ? "white" : "#404040",
      fontWeight: isActive === index ? (Platform.OS === "android" ? "bold" : "600") : "400",
      fontSize: scaleWidth(3.7),
      zIndex: 1,
      elevation: 2,
    };
  },
  containerLoading: {
    justifyContent: "center",
    alignItems: "center",
    width: scaleWidth(100),
    paddingVertical: scaleWidth(3),
  },
});
