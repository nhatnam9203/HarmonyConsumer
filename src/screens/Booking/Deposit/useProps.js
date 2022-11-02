import actions from '@redux/actions';
import { harmonyApi, useQueryCallback } from '@shared/services';
import * as RootNavigation from 'navigations/RootNavigation';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { formatNumberFromCurrency } from 'utils';
import { useCancelAppointment } from '../useCancelAppointment';

export const useProps = () => {
  const dispatch = useDispatch();

  const [loadingPage, setLoadingPage] = React.useState(false);
  const { cancelAppointment } = useCancelAppointment();

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

  const { card_primary, cards } = useSelector(state => state.cardReducer) || {};
  const token = useSelector(state => state.datalocalReducer.token);
  const userInfo = useSelector(state => state.datalocalReducer.userInfo);
  const [cardList, setCardList] = React.useState(null);
  const [cardSelected, setCardSelected] = React.useState(null);

  const [
    depositAppointment,
    { data: appointmentDepositResponse, isLoading: isDepositAppointment },
  ] = harmonyApi.useDepositAppointmentMutation();

  const [getUserCardByMerchant, { loading: getUserCardByMerchantLoading }] =
    useQueryCallback(
      harmonyApi.useLazyGetUserCardByMerchantQuery,
      result => {
        if (result?.data?.length > 0) setCardList(result?.data);
      },
      error => {
        console.log(error);
      },
    );

  React.useEffect(() => {
    if (appointmentDepositResponse) {
      // dispatch(actions.appointmentAction.getAppointmentUpcoming(token));
      dispatch(actions.bookingAction.resetBooking());
      dispatch(actions.cardAction.get_card_by_user(token, userInfo.userId));
      dispatch(actions.appointmentAction.setAppointmentDetail({}));

      setTimeout(() => {
        RootNavigation.navigate('Appointments');
      }, 250);
    }
  }, [appointmentDepositResponse]);

  React.useEffect(() => {
    if (merchantId) {
      getUserCardByMerchant(merchantId);
    }
  }, [merchantId]);

  React.useEffect(() => {
    if (cards?.length > 0 && merchantId) {
      const temps = cards?.filter(x =>
        x.merchants?.find(f => f.merchantId === merchantId),
      );
      setCardList(temps);
    }
  }, [cards, merchantId]);

  const calcDepositAmount = () => {
    let amount =
      (formatNumberFromCurrency(appointment?.total ?? 0) * depositPercent) /
      100;
    amount = parseFloat(amount).toFixed(2);
    return amount;
  };

  const _onHandleAddCard = () => {
    RootNavigation.navigate('AddNewCard');
  };

  const _onHandleSelectCard = card => {
    setCardSelected(card);
  };

  return {
    cardList: cardList,
    cardSelected: cardSelected,
    isDepositAppointment,
    appointment,
    loadingPage:
      loadingPage || getUserCardByMerchantLoading || isDepositAppointment,
    calcDepositAmount: calcDepositAmount,
    depositPercent,
    myCard: card_primary,
    onClose: () => {
      cancelAppointment();
      // Trường hợp tắt ngang ko deposit depositt-> cần gọi cancel appointment
      dispatch(actions.bookingAction.resetBooking());
      dispatch(actions.appointmentAction.setAppointmentDetail({}));
      RootNavigation.navigate('BottomTab');
    },
    onBack: () => {
      setLoadingPage(true);
      setTimeout(() => {
        RootNavigation.back();
      }, 1000);
    },
    onReloadCard: () => {
      dispatch(actions.cardAction.set_card_reload(card_primary));
      RootNavigation.navigate('AddMoneyExistCard');
    },
    onPayment: () => {
      if (cardSelected)
        depositAppointment({
          appointmentId: appointment?.appointmentId,
          userCardId: cardSelected.userCardId,
        });
    },
    onAddCard: _onHandleAddCard,
    onSelectCard: _onHandleSelectCard,
  };
};
