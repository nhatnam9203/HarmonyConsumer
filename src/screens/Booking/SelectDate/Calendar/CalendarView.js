import React from "react";
import { Calendar } from "react-native-calendars";
import AntDesign from "react-native-vector-icons/AntDesign";
import moment from "moment-timezone";
import { useSelector } from "react-redux";
import { theme } from "./styles";

const CalendarView = ({ onChangeTime, selectedDay }) => {
  const merchant_detail = useSelector((state) => state.storeReducer.merchant_detail);
  let today =
    merchant_detail.timezone && merchant_detail.timezone !== "0"
      ? moment().tz(merchant_detail.timezone.substring(12)).format("YYYY-MM-DD")
      : moment().format("YYYY-MM-DD");

  return (
    <Calendar
      current={today}
      minDate={today}
      onDayPress={(date) => onChangeTime(date)}
      monthFormat={"MMMM yyyy"}
      firstDay={1}
      onPressArrowLeft={(substractMonth) => substractMonth()}
      onPressArrowRight={(addMonth) => addMonth()}
      markedDates={{
        [selectedDay]: { selected: true },
      }}
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
};

export default CalendarView;
