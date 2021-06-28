import React, { useEffect, useState } from "react";
import moment from "moment-timezone";

import { useSelector, useDispatch } from "react-redux";
import actions from "@redux/actions";
import * as RootNavigation from "navigations/RootNavigation";

export default function hook(props) {
  const dispatch = useDispatch();

  const [selectedStaffId, setStaffId] = useState("");

  const token = useSelector((state) => state.datalocalReducer.token);
  let _staffId = useSelector((state) => state.bookingReducer.staffId);
  const { isAddmore, status, day } = useSelector((state) => state.bookingReducer);
  const merchant_detail = useSelector((state) => state.storeReducer.merchant_detail);

  const { item, tempServices } = props.route.params;
  const { merchantId } = merchant_detail;
  const timezone = new Date().getTimezoneOffset();

  useEffect(() => {
    const date =
      merchant_detail.timezone && merchant_detail.timezone !== "0"
        ? moment().tz(merchant_detail.timezone.substring(12)).format("YYYY-MM-DD")
        : moment().format("YYYY-MM-DD");

    dispatch(actions.bookingAction.selectDay(date));
  }, []);

  useEffect(() => {
    setStaffId(_staffId);
  }, [_staffId]);

  const selectStaff = React.useCallback(
    (staffId) => {
      if (staffId === -1) {
        dispatch(actions.bookingAction.selectStatus("waiting"));
      } else {
        dispatch(actions.bookingAction.selectStatus("unconfirm"));
      }
      setStaffId(staffId);
    },
    [selectedStaffId],
  );

  const updateService = () => {
    if (item && item.serviceId) {
      dispatch(
        actions.bookingAction.updateService({
          serviceId: item.serviceId,
          staffId: selectedStaffId,
        }),
      );
    }
  };

  const gotoReview = () => {
    dispatch(actions.bookingAction.setAddmore(false));
    RootNavigation.navigate("Review");
  };

  const getStaffAvaiable = () => {
    dispatch({ type: "START_FETCH_API" });
    const date = moment(day).format("YYYY-MM-DD");
    dispatch(actions.bookingAction.selectDay(date));
    const body = {
      date,
      merchantId,
      appointmentId: 0,
      timezone,
    };
    dispatch(actions.staffAction.staffGetAvaiableTime(selectedStaffId, token, body));
  };

  const selectDate = async () => {
    if (tempServices) {
      await dispatch(actions.bookingAction.addService(tempServices));
    }
    updateService();
    if (isAddmore || selectedStaffId === -1) {
      gotoReview();
    } else {
      dispatch({ type: "START_FETCH_API" });
      RootNavigation.navigate("SelectDate");
      getStaffAvaiable();
    }
    dispatch(actions.bookingAction.selectStaff(selectedStaffId));
  };

  return [status, selectedStaffId, selectStaff, selectDate];
}
