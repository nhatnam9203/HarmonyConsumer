import React, { useState } from "react";
import actions from "@redux/actions";
import moment from "moment";

import { totalDuration } from "utils";
import * as RootNavigation from "navigations/RootNavigation";
import { useSelector, useDispatch } from "react-redux";
import { adapterExtrasEdit, notesEdit } from "./helper";

export default function index(props) {
  const [isLoading, setLoading] = useState(false);

  const dispatch = useDispatch();

  const merchant_detail = useSelector((state) => state.storeReducer.merchant_detail);
  const bookingReducer = useSelector((state) => state.bookingReducer);

  const userInfo = useSelector((state) => state.datalocalReducer.userInfo);
  const token = useSelector((state) => state.datalocalReducer.token);
  const appointment_detail_customer = useSelector(
    (state) => state.appointmentReducer.appointment_detail_customer,
  );

  let timezoneBooking = merchant_detail.timezone
    ? moment().tz(merchant_detail.timezone.substring(12))
    : moment();

  timezoneBooking = `${timezoneBooking.format("YYYY-MM-DD")}T${timezoneBooking.format("HH:mm")}`;

  const {
    fromTime,
    services = [],
    products = [],
    extras = [],
    staffId,
    isEditAppointment = false,
    status,
    notes,
    isCheckEdit,
    noteValue,
    day,
  } = bookingReducer;

  const { userId } = userInfo;
  const { merchantId } = merchant_detail;
  const isBooking = services.length + products.length + extras.length > 0 ? true : false;
  const timezone = new Date().getTimezoneOffset();

  const goToSelectDate = () => {
    if (isEditAppointment) {
      dispatch(actions.bookingAction.setReschedule(true));
      RootNavigation.navigate("SelectDate");
    } else {
      RootNavigation.navigate("SelectDate");
    }
  };

  const goToAddNote = () => {
    RootNavigation.navigate("AddNote");
  };

  const addMore = () => {
    dispatch(actions.bookingAction.setReview(false));
    dispatch(actions.bookingAction.setAddmore(true));
    if (services.lenth + products.length + extras.length === 0) {
      dispatch(actions.bookingAction.selectStaff(""));
      dispatch(actions.bookingAction.addNote([]));
    }
    RootNavigation.navigate("StoreDetail");
  };

  const bookAppointmentSuccess = (statusBook) => {
    if (statusBook) {
      if (isEditAppointment) {
        setLoading(false);
        RootNavigation.navigate("MyAppointmentDetail");
      } else {
        setLoading(false);
        RootNavigation.navigate("Appointments");
      }
    } else {
      setLoading(false);
    }
  };

  const editSuccess = () => {
    if (isEditAppointment) {
      setLoading(false);
      RootNavigation.navigate("MyAppointmentDetail");
    } else {
      setLoading(false);
      RootNavigation.navigate("Appointments");
    }
  };

  const getStaffAvailableTime = () => {
    const body = {
      date: moment(day).format("YYYY-MM-DD"),
      merchantId,
      appointmentId: 0,
      timezone,
    };
    dispatch(actions.staffAction.staffGetAvaiableTime(staffId, token, body));
  };

  const conditionBooking = () => {
    const date_tz = merchant_detail.timezone
      ? moment().tz(merchant_detail.timezone.substring(12)).format("YYYY-MM-DD")
      : moment().format("YYYY-MM-DD");

    if (moment().format("YYYY-MM-DD") == date_tz) return true;

    if (staffId !== -1) {
      const startTime = moment(fromTime);
      if (moment().isAfter(startTime)) {
        return false;
      }
    }
    return true;
  };

  const bookAppointment = () => {
    console.log("============= bookAppointment");

    if (conditionBooking) {
      const end = moment(fromTime).add(totalDuration(services, extras), "minutes");
      const body = {
        services: [...services],
        products,
        extras: extras.filter((obj) => obj.isCheck === true),
        fromTime: staffId === -1 ? timezoneBooking : fromTime,
        merchantId,
        userId,
        toTime: `${moment(end).format("YYYY-MM-DD")}T${moment(end).format("HH:mm:ss")}`,
        staffId: services.length > 0 ? services[services.length - 1].staffId : staffId,
        giftCards: [],
        notes: noteValue.trim().length > 0 ? [{ note: noteValue }] : [],
        status: staffId === -1 ? "waiting" : "unconfirm",
      };
      dispatch(actions.appointmentAction.addAppointment(body, token, bookAppointmentSuccess));
    } else {
      alert("Your time selectec is over now. Please booking to another time!");
      getStaffAvailableTime();
      RootNavigation.navigate("SelectDate");
    }
  };

  const updateAppointment = () => {
    const end = moment(fromTime).add(totalDuration(services, extras), "minutes");
    const body = {
      staffId: appointment_detail_customer.staffId,
      services,
      products,
      extras: adapterExtrasEdit(extras),
      fromTime: fromTime,
      toTime: `${moment(end).format("YYYY-MM-DD")}T${moment(end).format("HH:mm:ss")}`,
      giftCards: appointment_detail_customer.giftCards,
      notes: notesEdit(appointment_detail_customer.notes, noteValue),
      merchantId,
      status: staffId === -1 ? "waiting" : "unconfirm",
    };

    dispatch({ type: "START_FETCH_API" });
    dispatch(
      actions.appointmentAction.updateAppointment(
        body,
        token,
        appointment_detail_customer.appointmentId,
        editSuccess,
      ),
    );
  };

  return [
    isEditAppointment,
    onBack,
    close,
    status,
    services,
    extras,
    products,
    fromTime,
    merchant_detail,
    goToSelectDate,
    goToAddNote,
    addMore,
    isBooking,
    isLoading,
    isCheckEdit,
    bookAppointment,
    updateAppointment,
  ];
}
