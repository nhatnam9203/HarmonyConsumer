import actions from '@redux/actions';
import { harmonyApi } from '@shared/services';
import images from 'assets';
import { Header, StatusBar } from 'components';
import moment from 'moment';
import * as RootNavigation from 'navigations/RootNavigation';
import React, { useState } from 'react';
import { ActivityIndicator, ScrollView, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { scaleHeight, scaleWidth, totalDuration } from 'utils';
import Bottom from './Bottom';
import ButtonConfirm from './ButtonConfirm';
import HeaderReview from './Header';
import { adapterExtrasEdit, notesEdit } from './helper';
import ItemList from './ItemList';
import StoreInfo from './StoreInfo';
import styles from './styles';
import { totalPrice } from 'utils';
import { formatNumberFromCurrency } from 'utils';
import { useCancelAppointment } from '../useCancelAppointment';

export default function index(props) {
  const [isLoading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const { cancelAppointment } = useCancelAppointment();

  const merchant_detail = useSelector(
    state => state.storeReducer.merchant_detail,
  );
  const bookingReducer = useSelector(state => state.bookingReducer);

  const userInfo = useSelector(state => state.datalocalReducer.userInfo);
  const token = useSelector(state => state.datalocalReducer.token);
  const appointment_detail_customer = useSelector(
    state => state.appointmentReducer.appointment_detail_customer,
  );

  let timezoneBooking =
    merchant_detail.timezone && merchant_detail.timezone !== '0'
      ? moment().tz(merchant_detail.timezone.substring(12))
      : moment();

  timezoneBooking = `${timezoneBooking.format(
    'YYYY-MM-DD',
  )}T${timezoneBooking.format('HH:mm')}`;

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
    appointment,
  } = bookingReducer;

  const { userId } = userInfo;
  const {
    merchantId,
    isAppointmentDeposit,
    minimumAppointmentAmountRequireDeposit,
  } = merchant_detail;
  const timezone = new Date().getTimezoneOffset();

  const [
    getAppointment,
    { currentData: appointmentResponse, isLoading: isGetAppointment },
  ] = harmonyApi.useLazyGetAppointmentQuery();

  const [
    createAppointment,
    { data: appointmentCreatedResponse, isLoading: isCreateAppointment },
  ] = harmonyApi.useCreateAppointmentMutation();

  React.useEffect(() => {
    if (appointmentCreatedResponse) {
      const { data, codeNumber, message } = appointmentCreatedResponse;
      if (data) getAppointment(data);
      else {
        alert(message);
        getStaffAvailableTime();
        RootNavigation.navigate('SelectDate');
      }
    }
  }, [appointmentCreatedResponse]);

  React.useEffect(() => {
    if (isCheckout && isEditAppointment) onBack();
  }, [isCheckout]);

  React.useEffect(() => {
    if (appointmentResponse) {
      dispatch(
        actions.bookingAction.updateBookingAppointment(
          appointmentResponse?.data,
        ),
      );
      RootNavigation.navigate('Deposit');
    }
  }, [appointmentResponse]);

  const onBack = async () => {
    if (isEditAppointment) {
      await dispatch(actions.bookingAction.resetBooking());
    }
    await dispatch(actions.bookingAction.setEditAppointment(false));
    await RootNavigation.back();
  };

  const close = () => {
    if (!isEditAppointment) {
      cancelAppointment();
      dispatch(actions.bookingAction.resetBooking());
      RootNavigation.navigate('BottomTab');
    } else {
      onBack();
    }
  };

  const goToSelectDate = () => {
    if (isEditAppointment) {
      dispatch(actions.bookingAction.setReschedule(true));
      RootNavigation.navigate('SelectDate');
    } else {
      RootNavigation.navigate('SelectDate');
    }
  };

  const goToAddNote = () => {
    RootNavigation.navigate('AddNote');
  };

  const addMore = () => {
    dispatch(actions.bookingAction.setReview(false));
    dispatch(actions.bookingAction.setAddmore(true));
    if (services.length + products.length + extras.length === 0) {
      if (appointment_detail_customer.status == 'waiting') {
        dispatch(
          actions.bookingAction.selectStaff(
            appointment_detail_customer.staffId,
          ),
        );
      } else {
        dispatch(actions.bookingAction.selectStaff(''));
      }
      dispatch(actions.bookingAction.addNote([]));
    }
    RootNavigation.navigate('StoreDetail');
  };

  const bookAppointmentSuccess = statusBook => {
    if (statusBook) {
      if (isEditAppointment) {
        setLoading(false);
        RootNavigation.navigate('MyAppointmentDetail');
      } else {
        setLoading(false);
        RootNavigation.navigate('Appointments');
      }
    } else {
      setLoading(false);
    }
  };

  const editSuccess = () => {
    if (isEditAppointment) {
      setLoading(false);
      RootNavigation.navigate('MyAppointmentDetail');
    } else {
      setLoading(false);
      RootNavigation.navigate('Appointments');
    }
  };

  const getStaffAvailableTime = () => {
    const body = {
      date: moment(day).format('YYYY-MM-DD'),
      merchantId,
      appointmentId: 0,
      timezone,
    };
    dispatch(actions.staffAction.staffGetAvaiableTime(staffId, token, body));
  };

  const conditionBooking = () => {
    let currentTime = moment();
    if (merchant_detail.timezone && merchant_detail.timezone !== '0') {
      currentTime = moment().tz(merchant_detail.timezone.substring(12));
    }
    // console.log(currentTime.format('LLL'));
    let startTime = moment(fromTime);
    // if (merchant_detail.timezone && merchant_detail.timezone !== '0') {
    //   startTime = moment(fromTime).tz(merchant_detail.timezone.substring(12));
    // }
    // console.log(startTime.format('LLL'));

    if (staffId !== -1) {
      if (currentTime.isAfter(startTime, 'dates')) {
        return false;
      }
    }

    return true;
  };

  const bookAppointment = () => {
    // console.log("=======review====== bookAppointment");
    if (conditionBooking()) {
      const end = moment(fromTime).add(
        totalDuration(services, extras),
        'minutes',
      );
      const body = {
        services: [...services],
        products,
        extras: extras.filter(obj => obj.isCheck === true),
        fromTime: staffId === -1 ? timezoneBooking : fromTime,
        merchantId: merchantId,
        userId,
        toTime: `${moment(end).format('YYYY-MM-DD')}T${moment(end).format(
          'HH:mm:ss',
        )}`,
        staffId: services.length > 0 ? services[0].staffId : staffId,
        giftCards: [],
        notes: noteValue.trim().length > 0 ? [{ note: noteValue }] : [],
        status: staffId === -1 ? 'waiting' : 'unconfirm',
      };

      dispatch(
        actions.appointmentAction.addAppointment(
          body,
          token,
          bookAppointmentSuccess,
        ),
      );
    } else {
      alert('Your time selected is over now. Please booking to another time!');
      getStaffAvailableTime();
      RootNavigation.navigate('SelectDate');
    }
  };

  const updateAppointment = () => {
    const end = moment(fromTime).add(
      totalDuration(services, extras),
      'minutes',
    );
    const body = {
      staffId: appointment_detail_customer.staffId,
      services: [...services],
      products,
      extras: adapterExtrasEdit(extras),
      fromTime: fromTime,
      toTime: `${moment(end).format('YYYY-MM-DD')}T${moment(end).format(
        'HH:mm:ss',
      )}`,
      giftCards: appointment_detail_customer.giftCards,
      notes: notesEdit(appointment_detail_customer.notes, noteValue),
      merchantId: merchantId,
      status: staffId === -1 ? 'waiting' : 'unconfirm',
    };

    dispatch({ type: 'START_FETCH_API' });
    dispatch(
      actions.appointmentAction.updateAppointment(
        body,
        token,
        appointment_detail_customer.appointmentId,
        editSuccess,
      ),
    );
  };

  const onButtonConfirmPress = () => {
    if (isMakeDeposit()) {
      if (conditionBooking()) {
        const end = moment(fromTime).add(
          totalDuration(services, extras),
          'minutes',
        );
        const body = {
          services: [...services],
          products,
          extras: extras.filter(obj => obj.isCheck === true),
          fromTime: staffId === -1 ? timezoneBooking : fromTime,
          merchantId: merchantId,
          userId,
          toTime: `${moment(end).format('YYYY-MM-DD')}T${moment(end).format(
            'HH:mm:ss',
          )}`,
          staffId: services.length > 0 ? services[0].staffId : staffId,
          giftCards: [],
          notes: noteValue.trim().length > 0 ? [{ note: noteValue }] : [],
          status: staffId === -1 ? 'waiting' : 'unconfirm',
        };

        createAppointment(body);
      } else {
        alert(
          'Your time selected is over now. Please booking to another time!',
        );
        getStaffAvailableTime();
        RootNavigation.navigate('SelectDate');
      }
    } else if (isEditAppointment) {
      updateAppointment();
    } else {
      bookAppointment();
    }
  };

  const isMakeDeposit = React.useCallback(() => {
    const total = totalPrice(services, extras, products);

    return (
      isAppointmentDeposit &&
      !isEditAppointment &&
      total >= formatNumberFromCurrency(minimumAppointmentAmountRequireDeposit)
    );
  }, [isAppointmentDeposit, isEditAppointment, services, extras, products]);

  return (
    <View style={{ flex: 1 }}>
      <View style={styles.container}>
        {!isEditAppointment && (
          <HeaderReview title={`Review & Confirm`} step={4} />
        )}
        {isEditAppointment && (
          <View style={{ backgroundColor: '#f8f8f8' }}>
            <StatusBar />
            <Header
              title="Basket"
              headerLeft
              headerRight
              onBack={onBack}
              iconRight={images.close_header}
              onPressRight={close}
              styleIconRight={{
                width: scaleWidth(4.5),
                height: scaleWidth(4.5),
              }}
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
              isDeposit={isMakeDeposit()}
            />
            <View style={{ height: scaleHeight(50) }} />
          </ScrollView>
        </View>
        <ButtonConfirm
          isLoading={isLoading || isCreateAppointment || isGetAppointment}
          isEditAppointment={isEditAppointment}
          isCheckEdit={isCheckEdit}
          onPress={onButtonConfirmPress}
          isDeposit={isMakeDeposit()}
        />
      </View>
      {isGetAppointment && <LoadingIndicator />}
    </View>
  );
}

const LoadingIndicator = () => {
  return (
    <View
      style={{
        backgroundColor: '#0005',
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <ActivityIndicator size="large" color="white" />
    </View>
  );
};
