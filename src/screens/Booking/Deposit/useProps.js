import actions from '@redux/actions';
import { harmonyApi } from '@shared/services';
import * as RootNavigation from 'navigations/RootNavigation';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { formatNumberFromCurrency } from 'utils';

export const useProps = () => {
  const dispatch = useDispatch();

  const [loadingPage, setLoadingPage] = React.useState(false);

  const {
    merchantId,
    isAppointmentDeposit,
    depositPercent,
    minimumAppointmentAmountRequireDeposit,
  } = useSelector(state => state.storeReducer.merchant_detail) || {};

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
  } = useSelector(state => state.bookingReducer) || {};

  const { card_primary } = useSelector(state => state.cardReducer) || {};
  const token = useSelector(state => state.datalocalReducer.token);
  const userInfo = useSelector(state => state.datalocalReducer.userInfo);

  const [
    depositAppointment,
    { data: appointmentDepositResponse, isLoading: isDepositAppointment },
  ] = harmonyApi.useDepositAppointmentMutation();

  React.useEffect(() => {
    if (appointmentDepositResponse) {
      dispatch(actions.appointmentAction.getAppointmentUpcoming(token));
      dispatch(actions.appointmentAction.getAppointmentPast(token, 1));
      dispatch(actions.bookingAction.resetBooking());

      dispatch(actions.cardAction.get_card_by_user(token, userInfo.userId));
      setTimeout(() => {
        RootNavigation.navigate('Appointments');
      }, 150);
    }
  }, [appointmentDepositResponse]);

  const calcDepositAmount = () => {
    let amount =
      (formatNumberFromCurrency(appointment?.total ?? 0) * depositPercent) /
      100;
    amount = parseFloat(amount).toFixed(2);
    return amount;
  };

  const cancelAppointment = () => {
    const body = {
      status: 'cancel',
    };
    // setLoadingPopup(true);
    dispatch(
      actions.appointmentAction.updateStatusAppointment(
        body,
        token,
        appointment?.appointmentId,
        () => {},
      ),
    );
  };

  return {
    isDepositAppointment,
    appointment,
    loadingPage,
    calcDepositAmount: calcDepositAmount,
    depositPercent,
    myCard: card_primary,
    onClose: () => {
      cancelAppointment();
      // Trường hợp tắt ngang ko deposit depositt-> cần gọi cancel appointment
      dispatch(actions.bookingAction.resetBooking());
      RootNavigation.navigate('BottomTab');
    },
    onBack: () => {
      setLoadingPage(true);
      cancelAppointment();
      setTimeout(() => {
        RootNavigation.back();
      }, 1000);
    },
    onReloadCard: () => {
      dispatch(actions.cardAction.set_card_reload(card_primary));
      RootNavigation.navigate('AddMoneyExistCard');
    },
    onPayment: () => {

      depositAppointment(appointment?.appointmentId);
    },
  };
};
