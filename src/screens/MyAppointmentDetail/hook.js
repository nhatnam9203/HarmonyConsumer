import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import actions from "@redux/actions";
import { totalPrice } from "utils";
import * as RootNavigation from "navigations/RootNavigation";
import { extrasAdapter } from "./helper";

export default function hook(props) {
  const dispatch = useDispatch();

  const [isLoading, setLoading] = useState(false);
  const [isLoadingPopup, setLoadingPopup] = useState(false);
  const [isPopup, setIsPopup] = useState(false);
  const token = useSelector((state) => state.datalocalReducer.token);
  const appointment_detail_customer = useSelector(
    (state) => state.appointmentReducer.appointment_detail_customer,
  );

  let {
    fromTime,
    status,
    duration,
    services,
    extras,
    products,
    appointmentId = "",
    staffId,
    merchantId,
    notes = [],
    isDisabled,
    // total
  } = appointment_detail_customer;

  let total = totalPrice(services, extras, products);

  extras = extrasAdapter(extras);

  const start = `${moment(fromTime).format("dddd, MMMM DD YYYY")}`;

  const timezone = new Date().getTimezoneOffset();

  const goToAddNote = () => {
    RootNavigation.navigate("AddNote", { appointmentId });
  };

  const openInbox = () => {
    RootNavigation.navigate("Inbox");
  };

  const cancelAppointment_success = () => {
    setLoadingPopup(false);
    setIsPopup(false);
  };

  const cancelAppointment = () => {
    const body = {
      status: "cancel",
    };
    setLoadingPopup(true);
    dispatch(
      actions.appointmentAction.updateStatusAppointment(
        body,
        token,
        appointmentId,
        cancelAppointment_success,
      ),
    );
  };

  const onPressNo = () => {
    setIsPopup(false);
  };

  const getStaffAvailableTime = () => {
    const body = {
      date: moment(fromTime).format("YYYY-MM-DD"),
      merchantId,
      appointmentId: 0,
      timezone,
    };
    dispatch(actions.staffAction.staffGetAvaiableTime(staffId, token, body));
  };

  const callBackEdit = () => {
    // console.log("callBackEdit");

    // dispatch(actions.appointmentAction.getDetailAppointment(token, appointmentId, () => {}, true));
    dispatch(actions.storeAction.getDetailMerchant(merchantId, token));
    dispatch(actions.bookingAction.addService(services));
    dispatch(actions.bookingAction.addExtra(extras));
    dispatch(actions.bookingAction.addProduct(products));
    dispatch(actions.bookingAction.selectDay(fromTime));
    dispatch(actions.bookingAction.selectDate(fromTime));
    dispatch(actions.bookingAction.selectStatus(status));
    dispatch(actions.bookingAction.addNote(notes));
    dispatch(actions.bookingAction.selectTime(moment(fromTime).format("HH:mm")));
    dispatch(actions.bookingAction.selectStaff(staffId));
    getStaffAvailableTime();
  };

  const fetchDataStoreDetail = () => {
    dispatch(actions.appointmentAction.getCategoryByStore(merchantId, token, () => {}));
    dispatch(actions.appointmentAction.getServiceByStore(merchantId, token, () => {}));
    dispatch(actions.appointmentAction.getProductByStore(merchantId, token));
    dispatch(actions.staffAction.staffGetByMerchant(merchantId, token));
    dispatch(actions.storeAction.getRatingMerchant(merchantId, 1, token));
    dispatch(actions.storeAction.getSummaryMerchant(merchantId, token));
  };

  const setReschedule = () => {
    dispatch(actions.bookingAction.setReschedule(true));
    callBackEdit();
    RootNavigation.navigate("BookAppointmentStack", { screen: "SelectDate" });
  };

  const setEditAppointment = () => {
    dispatch(actions.bookingAction.setEditAppointment(true));
    callBackEdit();
    fetchDataStoreDetail();
    RootNavigation.navigate("BookAppointmentStack", { screen: "Review" });
  };

  const back = () => {
    RootNavigation.back();
  };
  return [
    back,
    openInbox,
    start,
    status,
    setEditAppointment,
    setReschedule,
    setIsPopup,
    setLoading,
    services,
    products,
    extras,
    appointment_detail_customer,
    duration,
    total,
    notes,
    isPopup,
    isLoadingPopup,
    cancelAppointment,
    onPressNo,
    goToAddNote,
    isDisabled,
  ];
}
