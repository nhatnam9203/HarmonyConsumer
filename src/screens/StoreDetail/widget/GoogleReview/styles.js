import { StyleSheet } from "react-native";
import { scaleWidth, scaleHeight } from "utils";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    minHeight: scaleHeight(50),
    backgroundColor: "white",
    paddingTop: scaleHeight(3),
  },
  summary: {
    width: scaleWidth(100),
    justifyContent: "center",
    alignItems: "center",
  },
  txtRating: {
    fontSize: scaleWidth(6),
    color: "#404040",
    fontWeight: "bold",
  },
  txtCount: {
    fontSize: scaleWidth(3.7),
    color: "#585858",
  },
  line: {
    width: "100%",
    marginTop: scaleHeight(1.3),
  },
  rowComment: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: scaleHeight(2.5),
  },
  imgAvatar: {
    width: scaleWidth(15),
    height: scaleWidth(15),
    borderRadius: scaleWidth(50),
  },
  userName: {
    fontSize: scaleWidth(4.3),
    color: "#404040",
  },
  commentRight: {
    marginLeft: scaleWidth(3),
  },
  txtCreateDate: {
    color: "#666666",
    fontSize: scaleWidth(4),
    marginLeft: scaleWidth(2),
  },
  message: {
    fontSize: scaleWidth(4),
    color: "#6a6a6a",
    marginTop: scaleHeight(1),
  },
  imgStoreReview: {
    width: scaleWidth(14),
    height: scaleWidth(14),
    marginRight: scaleWidth(1),
    borderRadius: 5,
    marginTop: scaleHeight(1),
  },
  containerImgComment: {
    flexDirection: "row",
    marginTop: scaleHeight(1.5),
  },
  itemComment: {
    paddingBottom: scaleHeight(1.5),
    width: scaleWidth(94),
    alignSelf: "center",
  },
  txtNotFound: {
    textAlign: "center",
    fontSize: scaleWidth(4),
    color: "grey",
  },
  rowTime: {
    flexDirection: "row",
    marginTop: scaleHeight(1),
    alignItems: "center",
  },
  buttonReview: {
    width: scaleWidth(50),
    height: scaleHeight(10),
    borderRadius: 8,
    resizeMode: "contain",
  },
  buttonReviewContainer: {
    alignSelf: "center",
    borderRadius: 8,
  },
  txtClickHere: {
    textAlign: "center",
    marginTop: scaleHeight(1),
    fontSize: scaleWidth(3.5),
  },
});

export default styles;
