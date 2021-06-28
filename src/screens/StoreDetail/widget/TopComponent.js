import React from "react";
import { View, StyleSheet, TouchableOpacity, Animated } from "react-native";
import { scaleWidth, scaleHeight } from "utils";
import { Text } from "components";
import Category from "./Category";
import { useSelector } from "react-redux";

const tabs = [
  {
    name: "Services",
  },
  {
    name: "Products",
  },
  {
    name: "Reviews",
  },
  {
    name: "Google reviews",
  },
];

export default function TopComponent(props) {
  const appointmentReducer = useSelector((state) => state.appointmentReducer);
  const { category } = appointmentReducer;
  const category_services = category.filter((obj) => obj.categoryType === "Service");
  const category_products = category.filter((obj) => obj.categoryType === "Product");

  const { scrollY, translateY_listTime, isBottom, measureCategory, tabActive, setTabActive } =
    props;

  const selectTab = (tab) => {
    setTabActive(tab.name);
  };

  const opacityBottom = scrollY.interpolate({
    inputRange: [0, scaleHeight(25)],
    outputRange: [1, 0],
    extrapolate: "clamp",
  });

  const opacityTop = scrollY.interpolate({
    inputRange: [scaleHeight(18), scaleHeight(25)],
    outputRange: [0, 1],
    extrapolate: "clamp",
  });

  return (
    <React.Fragment>
      <Animated.View
        style={[
          styles.container,
          {
            transform: [
              {
                translateY: isBottom ? translateY_listTime : 0,
              },
            ],
            opacity: isBottom ? opacityBottom : opacityTop,
          },
        ]}>
        <View style={styles.rowCategory}>
          <View style={styles.rowTab}>
            {/* RENDER TABS HORIZONTAL */}
            {tabs.map((obj, key) => {
              return (
                <TouchableOpacity
                  onPress={() => selectTab(obj)}
                  key={key + "tab"}
                  style={styles.tab(tabActive, obj.name)}>
                  <Text style={styles.tabName(tabActive, obj.name)}>{obj.name}</Text>
                </TouchableOpacity>
              );
            })}
          </View>

          {/* RENDER CATEGORY HORIZONTAL */}
          {(tabActive === "Services" || tabActive === "Products") && (
            <Category
              measureCategory={measureCategory}
              onSelectCategory={props.onSelectCategory}
              category={tabActive === "Services" ? category_services : category_products}
              isBottom={isBottom}
            />
          )}
        </View>
      </Animated.View>
    </React.Fragment>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    marginHorizontal: -scaleWidth(3),
    paddingHorizontal: scaleWidth(3),
    zIndex: 1,
    elevation: 3333434535,
    // marginTop: scaleWidth(2)
  },
  tab: (tabActive, name) => {
    return {
      marginRight: scaleWidth(5),
      borderBottomWidth: tabActive === name ? 4 : 0,
      borderBottomColor: "#1B68AC",
      paddingBottom: scaleWidth(1.5),
    };
  },
  tabName: (tabActive, name) => {
    return {
      fontSize: scaleWidth(4.3),
      color: tabActive === name ? "#1B68AC" : "#585858",
    };
  },
  rowTab: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#eeeeee",
    paddingHorizontal: scaleWidth(3),
  },
  rowCategory: {
    backgroundColor: "white",
    paddingTop: scaleWidth(3.5),
    // paddingBottom: scaleWidth(3.5),
  },
});
