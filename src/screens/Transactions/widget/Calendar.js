import React from "react";
import { scaleWidth, slop, scaleHeight } from "utils";
import { Calendar } from "react-native-calendars";
import AntDesign from "react-native-vector-icons/AntDesign";
import moment from "moment";

export default function CalendarPicker(props) {
  const { time, timeSelect, markedDates } = props;
  const selectedDay = moment(timeSelect).format("YYYY-MM-DD").toString();

  return (
    <Calendar
      current={moment(time).format("YYYY-MM-DD")}
      onDayPress={(date) => props.onChangeStartTime(date)}
      monthFormat={"MMMM yyyy"}
      firstDay={1}
      onPressArrowLeft={(substractMonth) => substractMonth()}
      onPressArrowRight={(addMonth) => addMonth()}
      markedDates={{
        ...markedDates,
        [selectedDay]: {
          startingDay: true,
          selected: true,
          customStyles: {
            container: {
              backgroundColor: "#0764B0",
              borderRadius: 0,
              zIndex: 1,
              borderRadius: 300,
            },
            text: {
              color: "white",
            },
          },
        },
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
      color: "#333",
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
