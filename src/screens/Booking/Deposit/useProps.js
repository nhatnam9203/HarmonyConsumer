import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import actions from '@redux/actions';
import { formatNumberFromCurrency } from 'utils';

export const useProps = () => {
  const dispatch = useDispatch();

  const {
    merchantId,
    isAppointmentDeposit,
    depositPercent,
    minimumAppointmentAmountRequireDeposit,
  } = useSelector(state => state.storeReducer.merchant_detail);

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
  } = useSelector(state => state.bookingReducer);

  const isDeposit = () => isAppointmentDeposit && !isEditAppointment;

  return {
    appointment,
    calcDepositAmount: () => {
      let amount =
        (formatNumberFromCurrency(appointment?.total ?? 0) * depositPercent) /
        100;
      amount = parseFloat(amount).toFixed(2);
      if (amount < minimumAppointmentAmountRequireDeposit)
        return minimumAppointmentAmountRequireDeposit;
      return amount;
    },
    depositPercent,
  };
};
