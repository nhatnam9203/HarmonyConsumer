import React from "react";
import { scaleWidth, scaleHeight } from "utils";
import { Calendar } from "react-native-calendars";
import AntDesign from "react-native-vector-icons/AntDesign";
import moment from "moment";
import { View } from "react-native";

const stylesNode = {
  startingDay: true,
  selected: true,
  customStyles: {
    container: {
      backgroundColor: "#0764B0",
      zIndex: 999999,
      borderRadius: 300,
    },
    text: {
      color: "white",
    },
  },
};

export default function CalendarPicker(props) {
  const { markedDates, startTime, endTime, selectDayCalendar, refCalendar } = props;
  let start = moment(startTime, ["MM/DD/YYYY"]).format("YYYY-MM-DD").toString();
  let end = moment(endTime, ["MM/DD/YYYY"]).format("YYYY-MM-DD").toString();

  return (
    <View style={{ marginTop: scaleHeight(0), flex: 1, width: "100%", height: scaleHeight(70) }}>
      <Calendar
        ref={refCalendar}
        current={moment(endTime, ["MM/DD/YYYY"]).format("YYYY-MM-DD")}
        onDayPress={(date) => selectDayCalendar(date.dateString)}
        monthFormat={"MMMM yyyy"}
        firstDay={1}
        onPressArrowLeft={(substractMonth) => substractMonth()}
        onPressArrowRight={(addMonth) => addMonth()}
        markedDates={{
          ...markedDates,
          [start]: stylesNode,
          [end]: stylesNode,
        }}
        markingType={"custom"}
        theme={theme}
        renderArrow={(direction) =>
          direction === "left" ? (
            <AntDesign name="caretleft" size={15} color={"#0764B0"} />
          ) : (
            <AntDesign name="caretright" size={15} color={"#0764B0"} />
          )
        }
      />
    </View>
  );
}

const theme = {
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
      fontWeight: "500",
      fontSize: scaleWidth(4.2),
    },
    dayHeader: {
      marginTop: 2,
      marginBottom: scaleWidth(5),
      width: scaleWidth(14),
      textAlign: "center",
      fontSize: scaleWidth(3.2),
      color: "#404040",
      backgroundColor: "#F8F8F8",
      paddingVertical: scaleWidth(3),
      width: scaleWidth(100 / 7),
    },
  },
  backgroundColor: "#2B2E33",
  calendarBackground: "white",
  selectedDayBackgroundColor: "#0764B0",
  selectedDayTextColor: "#fff",
  todayTextColor: "#00adf5",
  dayTextColor: "#404040",
  textDisabledColor: "#666666",
  textDayFontWeight: "400",
  textDayFontSize: scaleWidth(3.5),
};
