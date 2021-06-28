import { StyleSheet } from "react-native";
import { scaleWidth, scaleHeight, scaleSize } from "utils";

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    backgroundColor: "#F9F9F9",
    paddingTop: scaleHeight(5),
    paddingBottom: scaleHeight(1),
  },
  title: {
    marginLeft: scaleWidth(3),
    marginVertical: scaleHeight(2),
  },
  rowHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: scaleWidth(3),
    width: scaleWidth(100),
  },
  titleHeader: {
    fontSize: scaleSize(20),
    color: "#585858",
  },
  body: {
    // padding: scaleWidth(3),
    backgroundColor: "white",
    flex: 1,
  },
  containerLoading: {
    flex: 1,
    backgroundColor: "white",
    paddingTop: scaleHeight(6),
  },
});

export default styles;
