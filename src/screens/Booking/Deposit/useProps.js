import actions from '@redux/actions';
import * as RootNavigation from 'navigations/RootNavigation';
import { useDispatch, useSelector } from 'react-redux';
import { formatNumberFromCurrency } from 'utils';
import { depositAppointment, useHarmonyMutation } from '@apis';

export const useProps = () => {
  const dispatch = useDispatch();

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

  const isDeposit = () => isAppointmentDeposit && !isEditAppointment;

  const [, depositAppointmentRequest] = useHarmonyMutation({
    onSuccess: data => {
      console.log(data);

      dispatch(actions.appointmentAction.getAppointmentUpcoming(token));
      dispatch(actions.appointmentAction.getAppointmentPast(token, 1));
      dispatch(actions.bookingAction.resetBooking());

      RootNavigation.navigate('Appointments');
    },
  });

  const calcDepositAmount = () => {
    let amount =
      (formatNumberFromCurrency(appointment?.total ?? 0) * depositPercent) /
      100;
    amount = parseFloat(amount).toFixed(2);
    if (amount < minimumAppointmentAmountRequireDeposit)
      return minimumAppointmentAmountRequireDeposit;
    return amount;
  };

  return {
    appointment,
    calcDepositAmount: calcDepositAmount,
    depositPercent,
    myCard: card_primary,
    onClose: () => {
      dispatch(actions.bookingAction.resetBooking());
      RootNavigation.navigate('BottomTab');
    },
    onBack: () => {
      RootNavigation.back();
    },
    onReloadCard: () => {
      dispatch(actions.cardAction.set_card_reload(card_primary));
      RootNavigation.navigate('AddMoneyExistCard');
    },
    onPayment: () => {
      // let bodyPayment = {
      //   userCardId: card_primary.userCardId,
      //   Amount: calcDepositAmount(),
      //   MerchantId: merchantId,
      //   RewardPoint: 0,
      // };

      const requestData = depositAppointment(appointment?.appointmentId);
      depositAppointmentRequest(requestData);
    },
  };
};
