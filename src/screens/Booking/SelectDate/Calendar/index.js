import React from "react";
import moment from "moment-timezone";
import CalendarView from "./CalendarView";

export default function index(props) {
  const { daySelect, onChangeTime } = props;
  const selectedDay = moment(daySelect).format("YYYY-MM-DD").toString();

  return <CalendarView onChangeTime={onChangeTime} selectedDay={selectedDay} />;
}
