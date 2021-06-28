import { Platform } from "react-native";
import { scaleWidth, scaleHeight } from "utils";

export const theme = {
  arrowColor: "#0764B0",
  "stylesheet.calendar.header": {
    header: {
      backgroundColor: "white",
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      paddingVertical: scaleHeight(0.5),
      borderRadius: scaleWidth(20),
      paddingHorizontal: scaleWidth(4),
    },
    monthText: {
      color: "#404040",
      fontWeight: Platform.OS === "android" ? "500" : "500",
      fontSize: scaleWidth(4.7),
    },
    dayHeader: {
      marginTop: 2,
      marginBottom: scaleWidth(5),
      width: scaleWidth(14),
      textAlign: "center",
      fontSize: scaleWidth(3.5),
      color: "#333",
    },
  },
  backgroundColor: "#2B2E33",
  calendarBackground: "white",
  selectedDayBackgroundColor: "#0764B0",
  selectedDayTextColor: "#fff",
  todayTextColor: "#404040",
  dayTextColor: "#404040",
  textDisabledColor: "grey",
  textDayFontWeight: "500",
  textDayFontSize: scaleWidth(3.8),
};
