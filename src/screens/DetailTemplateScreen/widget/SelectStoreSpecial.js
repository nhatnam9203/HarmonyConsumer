import React from "react";
import { StyleSheet, View, Image } from "react-native";
import { Collapse, CollapseHeader, CollapseBody } from "accordion-collapse-react-native";

import ICONS from "assets";
import { scaleSize } from "utils";
import { Text, Container, Button, Header, Switch } from "components";

const SelectStoreSpecial = ({ openSearchList, value }) => {
  const [isVisible, setChangeVisible] = React.useState(false);
  const colorText = value ? "#404040" : "#0764B0";

  const onHandleChangeValue = (value) => {
    setChangeVisible(value);
  };

  return (
    <Collapse
      style={[styles.container, { height: scaleSize(isVisible ? 85 : 85 - 40) }]}
      disabled={true}
      isCollapsed={isVisible}>
      <CollapseHeader>
        <View style={styles.header}>
          <Text fontSize={17} color="#404040">
            Specific stores
          </Text>

          <Switch value={isVisible} onValueChange={onHandleChangeValue} />
        </View>
      </CollapseHeader>

      <CollapseBody>
        <Button onPress={openSearchList} style={styles.body}>
          <Text fontSize={15} color={colorText}>
            {value || "Select store"}
          </Text>

          <Image source={ICONS["arrow_forward"]} style={styles.icons} />
        </Button>
      </CollapseBody>
    </Collapse>
  );
};

export default SelectStoreSpecial;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    justifyContent: "space-between",
    marginVertical: scaleSize(20),
  },
  header: {
    width: "100%",
    height: scaleSize(30),
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
  },
  body: {
    width: "100%",
    height: scaleSize(40),
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    borderWidth: 1,
    borderColor: "#DDDDDD",
    borderRadius: scaleSize(5),
    paddingHorizontal: scaleSize(10),
  },
  icons: {
    width: scaleSize(15),
    height: scaleSize(15),
    tintColor: "#0764B0",
    resizeMode: "contain",
  },
});
