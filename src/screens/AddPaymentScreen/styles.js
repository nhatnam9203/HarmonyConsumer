import { StyleSheet } from "react-native";
import { scaleSize } from "utils";
import Configs from "configs";
const { COLORS } = Configs;
const styles = StyleSheet.create({
  tabStyle: {
    marginTop: scaleSize(20),
    alignItems: "center",
    paddingHorizontal: scaleSize(16),
  },
  title: {
    alignSelf: "flex-start",
    alignItems: "center",
    marginVertical: scaleSize(25),
  },
});
export default styles;
