import React, { useState } from "react";
import { View, ScrollView } from "react-native";
import actions from "@redux/actions";
import moment from "moment";
import { totalDuration } from "utils";
import * as RootNavigation from "navigations/RootNavigation";
import { useSelector, useDispatch } from "react-redux";
import { adapterExtrasEdit, notesEdit } from "./helper";

import HeaderReview from "./Header";
import StoreInfo from "./StoreInfo";
import ItemList from "./ItemList";
import Bottom from "./Bottom";
import ButtonConfirm from "./ButtonConfirm";
import images from "assets";
import { Header, StatusBar } from "components";
import { scaleWidth, scaleHeight } from "utils";
import styles from "./styles";

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

  let timezoneBooking =
    merchant_detail.timezone && merchant_detail.timezone !== "0"
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
    isCheckEdit,
    noteValue,
    day,
    isCheckout,
  } = bookingReducer;

  const { userId } = userInfo;
  const { merchantId } = merchant_detail;
  const timezone = new Date().getTimezoneOffset();

  React.useEffect(() => {
    if (isCheckout && isEditAppointment) onBack();
  }, [isCheckout]);

  const onBack = async () => {
    if (isEditAppointment) {
      await dispatch(actions.bookingAction.resetBooking());
    }
    await dispatch(actions.bookingAction.setEditAppointment(false));
    await RootNavigation.back();
  };

  const close = () => {
    if (!isEditAppointment) {
      dispatch(actions.bookingAction.resetBooking());
      RootNavigation.navigate("BottomTab");
    } else {
      onBack();
    }
  };

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
    if (services.length + products.length + extras.length === 0) {
      if (appointment_detail_customer.status == "waiting") {
        dispatch(actions.bookingAction.selectStaff(appointment_detail_customer.staffId));
      } else {
        dispatch(actions.bookingAction.selectStaff(""));
      }
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
    const date_tz =
      merchant_detail.timezone && merchant_detail.timezone !== "0"
        ? moment().tz(merchant_detail.timezone.substring(12)).format("YYYY-MM-DD")
        : moment().format("YYYY-MM-DD");

    if (moment().format("YYYY-MM-DD") == date_tz) {
      if (staffId !== -1) {
        const startTime = moment(fromTime);
        if (moment().isAfter(startTime)) {
          return false;
        }
      }
    }
    return true;
  };

  const bookAppointment = () => {
    // console.log("=======review====== bookAppointment");

    if (conditionBooking()) {
      const end = moment(fromTime).add(totalDuration(services, extras), "minutes");
      const body = {
        services: [...services],
        products,
        extras: extras.filter((obj) => obj.isCheck === true),
        fromTime: staffId === -1 ? timezoneBooking : fromTime,
        merchantId,
        userId,
        toTime: `${moment(end).format("YYYY-MM-DD")}T${moment(end).format("HH:mm:ss")}`,
        staffId: services.length > 0 ? services[0].staffId : staffId,
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
      services: [...services],
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

  return (
    <View style={styles.container}>
      {!isEditAppointment && <HeaderReview title={`Review & Confirm`} step={4} />}
      {isEditAppointment && (
        <View style={{ backgroundColor: "#f8f8f8" }}>
          <StatusBar />
          <Header
            title="Basket"
            headerLeft
            headerRight
            onBack={onBack}
            iconRight={images.close_header}
            onPressRight={close}
            styleIconRight={{ width: scaleWidth(4.5), height: scaleWidth(4.5) }}
          />
        </View>
      )}
      <View style={styles.body}>
        <ScrollView bounces={false} showsVerticalScrollIndicator={false}>
          <StoreInfo
            status={status}
            services={services}
            extras={extras}
            fromTime={fromTime}
            merchant={merchant_detail}
            goToSelectDate={goToSelectDate}
            isEditAppointment={isEditAppointment}
          />
          <ItemList
            isEditAppointment={isEditAppointment}
            services={services}
            products={products}
            extras={extras}
          />
          <Bottom
            services={services}
            extras={extras}
            products={products}
            goToAddNote={goToAddNote}
            goToServicesList={addMore}
          />
          <View style={{ height: scaleHeight(50) }} />
        </ScrollView>
      </View>
      <ButtonConfirm
        isLoading={isLoading}
        isEditAppointment={isEditAppointment}
        isCheckEdit={isCheckEdit}
        onPress={isEditAppointment ? updateAppointment : bookAppointment}
      />
    </View>
  );
}
