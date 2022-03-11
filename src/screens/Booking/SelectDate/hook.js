import actions from '@redux/actions';
import moment from 'moment';
import * as RootNavigation from 'navigations/RootNavigation';
import React from 'react';
import { Platform } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

const FORMAT_TIME_REQUEST = 'YYYY-MM-DD[T]HH:mm';

const ServiceFilterKeys = [
  'appointmentId',
  'bookingServiceId',
  'duration',
  'price',
  'serviceId',
  'serviceName',
  'staffId',
  'status',
  'note',
  'fromTime',
];

const ProductFilterKeys = [
  'appointmentId',
  'bookingProductId',
  'price',
  'quantity',
  'productId',
  'productName',
];

const ExtraFilterKeys = [
  'appointmentId',
  'bookingExtraId',
  'extraId',
  'price',
  'duration',
  'extraName',
];

const GiftCardsFilterKeys = [
  'bookingGiftCardId',
  'giftCardId',
  'quantity',
  'price',
];

const NotesFilterKeys = ['appointmentNoteId', 'note'];

export default function useHook() {
  const dispatch = useDispatch();

  const [isLoading, setLoading] = React.useState(true);

  const staffId = useSelector(state => state.bookingReducer.staffId);
  const day = useSelector(state => state.bookingReducer.day);
  const timePicker = useSelector(state => state.bookingReducer.timePicker);

  const token = useSelector(state => state.datalocalReducer.token);
  const merchant_detail = useSelector(
    state => state.storeReducer.merchant_detail,
  );
  const isReschedule = useSelector(state => state.bookingReducer.isReschedule);
  const appointment_detail_customer = useSelector(
    state => state.appointmentReducer.appointment_detail_customer,
  );

  const bookingReducer = useSelector(state => state.bookingReducer);

  const { isCheckout } = bookingReducer;

  // React.useEffect(() => {
  //   if (isCheckout) onBack();
  // }, [isCheckout]);

  const onBack = () => {
    RootNavigation.back();
    dispatch(actions.bookingAction.setReschedule(false));
    // dispatch(actions.appointmentAction.setCheckOut(false));
  };

  React.useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 300);
  }, []);

  const timezone = new Date().getTimezoneOffset();

  const { appointmentId } = appointment_detail_customer;

  const { merchantId } = merchant_detail;

  const setTimePicker = time => {
    dispatch(actions.bookingAction.selectTime(time));
  };

  const onChangeDay = date => {
    dispatch(actions.bookingAction.selectDay(date.dateString));
    const body = {
      date: date.dateString,
      merchantId,
      appointmentId: 0,
      timezone,
    };
    dispatch(actions.staffAction.staffGetAvaiableTime(staffId, token, body));
  };
  /** */
  const reviewConfirmAction = () => {
    // console.log("reviewConfirmAction");
    // console.log();

    let date = moment(day).format('YYYY-MM-DD');
    date = `${date}T${timePicker}`;
    dispatch(actions.bookingAction.selectDate(date));

    dispatch(actions.bookingAction.setReview(true));
    RootNavigation.navigate('Review');
  };

  const reScheduleAction = () => {
    if (!appointment_detail_customer) return;

    const date = moment(day).format('YYYY-MM-DD');
    const date_reschedule = `${date}T${timePicker}`;
    // const body = {
    //   ...appointment_detail_customer,
    //   fromTime: date_reschedule,
    //   status: appointment_detail_customer.status === "waiting" ? "waiting" : "unconfirm",
    // };
    // console.log(JSON.stringify(body));

    dispatch({ type: 'START_FETCH_API' });
    dispatch(actions.bookingAction.selectDate(date_reschedule));
    let fromDate = new Date(date_reschedule);
    let toDate = new Date(date_reschedule);

    const services = appointment_detail_customer.services?.map(it => {
      fromDate = toDate;
      toDate = new Date(fromDate.getTime() + it.duration * 60 * 1000);

      let fromTime = moment(fromDate).format(FORMAT_TIME_REQUEST);
      let toTime = moment(toDate).format(FORMAT_TIME_REQUEST);

      if (Platform.OS === 'android') {
        fromTime = moment(fromDate).utc().format(FORMAT_TIME_REQUEST);
        toTime = moment(toDate).utc().format(FORMAT_TIME_REQUEST);
      }

      return Object.assign(
        {},
        Object.fromEntries(
          Object.entries(it).filter(([key, val]) =>
            ServiceFilterKeys.includes(key),
          ),
        ),
        {
          fromTime: fromTime,
          toTime: toTime,
        },
      );
    });

    const body = Object.assign({}, appointment_detail_customer, {
      staffId: appointment_detail_customer.staffId,
      fromTime: date_reschedule,
      toTime: moment(toDate).format(FORMAT_TIME_REQUEST),
      status:
        appointment_detail_customer.status === 'waiting'
          ? 'waiting'
          : 'unconfirm',
      services: services,
      // products: appointment_detail_customer.products?.map((it) =>
      //   Object.fromEntries(
      //     Object.entries(it).filter(([key, val]) => ProductFilterKeys.includes(key)),
      //   ),
      // ),
      // extras: appointment_detail_customer.extras?.map((it) =>
      //   Object.fromEntries(
      //     Object.entries(it).filter(([key, val]) => ExtraFilterKeys.includes(key)),
      //   ),
      // ),
      // giftCards: appointment_detail_customer.giftCards?.map((it) =>
      //   Object.fromEntries(
      //     Object.entries(it).filter(([key, val]) => GiftCardsFilterKeys.includes(key)),
      //   ),
      // ),
      // notes: appointment_detail_customer.notes?.map((it) =>
      //   Object.fromEntries(
      //     Object.entries(it).filter(([key, val]) => NotesFilterKeys.includes(key)),
      //   ),
      // ),
    });
    delete body.merchant;
    delete body.staff;
    delete body.apppointmentHistory;
    delete body.staff;

    dispatch(
      actions.appointmentAction.updateAppointment(
        body,
        token,
        appointmentId,
        onBack,
        true,
      ),
    );
  };

  return [
    isReschedule,
    isLoading,
    setTimePicker,
    day,
    onChangeDay,
    reScheduleAction,
    reviewConfirmAction,
  ];
}
