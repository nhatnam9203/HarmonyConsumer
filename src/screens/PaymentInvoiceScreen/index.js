import React, { useState } from 'react';
import { ScrollView, View, RefreshControl } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import actions from '@redux/actions';
import ICONS from 'assets';
import { Text, Container, Header, Form } from 'components';
import {
  UsingPoints,
  TotalInfo,
  CardList,
  ModalAddPoints,
  PaySuccess,
  DiscountByPoint,
} from './widget';
import * as RootNavigation from 'navigations/RootNavigation';
import styles from './style';
import { reCalulateTotal } from '../../redux/actions/paymentAction';
import { formatNumberFromCurrency, formatMoney, FormatPrice } from 'utils';
import { isEmpty } from 'lodash';

const { ButtonSubmit } = Form;

export default function index(props) {
  const { merchantId_invoice, tipCustomer } = props.route.params;

  const [isPay, setPay] = useState(false);

  const dispatch = useDispatch();
  const token = useSelector(state => state.datalocalReducer.token);
  const userInfo = useSelector(state => state.datalocalReducer.userInfo);
  const cards = useSelector(state => state.cardReducer.cards);
  const tips = useSelector(state => state.generalReducer.tips);
  const invoice = useSelector(state => state.paymentReducer.invoice);
  const userRewardPointsSummary = useSelector(
    state => state.paymentReducer.userRewardPointsSummary,
  );
  const isReCalculteTotal = useSelector(
    state => state.paymentReducer.isReCalculteTotal,
  );
  const reCalculteTotal = useSelector(
    state => state.paymentReducer.reCalculteTotal,
  );
  const loading_reward_point = useSelector(
    state => state.paymentReducer.loading_reward_point,
  );

  const [toggleCheckBox, setToggleCheckBox] = React.useState(false);
  const [toggleModal, setToggleModal] = React.useState(false);
  const [card, setCard] = React.useState({});
  const [point, setPoint] = React.useState('');
  const [point_used, setPointUsed] = React.useState(0);
  const [firstLoading, setFirstLoading] = React.useState(true);

  const { totalHasTip, tip, total } = tips;
  const disabled_submit = card.userCardId ? false : true;

  const rewardPoints = userRewardPointsSummary.availableRewardPoint
    ? userRewardPointsSummary.availableRewardPoint
    : 0;

  const groupAppointment = useSelector(
    state => state.appointmentReducer.groupAppointment,
  );

  let { appointments } = groupAppointment;

  appointments = appointments ? appointments : null;
  const amount = invoice.amount ? invoice.amount : total;

  React.useLayoutEffect(() => {
    let totalHasTip =
      formatNumberFromCurrency(amount) + formatNumberFromCurrency(tipCustomer);
    // let _subTotal = FormatPrice(groupAppointment.subTotal) + FormatPrice(tipCustomer);
    let tips = {
      total: groupAppointment.total,
      tip: tipCustomer,
      tipAmount: groupAppointment.tipAmount,
      totalHasTip: formatMoney(totalHasTip),
      subTotal: formatMoney(totalHasTip),
    };
    setTips(tips);
  }, [groupAppointment, amount]);

  const setTips = tips => {
    dispatch(actions.generalAction.set_tips(tips));
  };

  const onHandleToggleModal = () => {
    setToggleModal(!toggleModal);
  };

  const onHandleSelectCard = card => {
    setCard(card);
  };

  const oncloseCheckBox = () => {
    setToggleCheckBox(false);
    setToggleModal(false);
  };

  const onChangePoint = value => {
    setPoint(value);
  };

  const updateTotalWithPoints = (points = 0) => {
    const checkoutPaymentId = invoice.paymentId ? invoice.paymentId : 0;
    const tip = tips.tip ? tips.tip : 0;
    dispatch(
      actions.paymentAction.reCalulateTotal(
        {
          userId: userInfo.userId,
          checkoutPaymentId,
          tip,
          rewardPoint: points,
          amount: tips.total,
        },
        token,
        setPointUsed,
      ),
    );
  };

  const useAllPoints = () => {
    const availableRewardPoint = userRewardPointsSummary.availableRewardPoint
      ? userRewardPointsSummary.availableRewardPoint
      : 0;
    setPoint(availableRewardPoint);
    setToggleModal(false);
    setToggleCheckBox(true);
    updateTotalWithPoints(availableRewardPoint);
  };

  const useEnterPoints = () => {
    setPoint('');
    reCalulateTotal != 0 && updateTotalWithPoints(0);
  };

  const notUsePoint = () => {
    setPoint('');
    reCalulateTotal != 0 && updateTotalWithPoints(0);
    oncloseCheckBox();
  };

  const applyPoints = points => {
    const availableRewardPoint = userRewardPointsSummary.availableRewardPoint
      ? userRewardPointsSummary.availableRewardPoint
      : 0;

    if (points > availableRewardPoint) {
      alert('Your Star enter bigger available point !');
    } else {
      setToggleModal(false);
      setToggleCheckBox(true);
      updateTotalWithPoints(points);
    }
  };

  React.useEffect(() => {
    if (isEmpty(invoice) && firstLoading == false && isPay == false) {
      RootNavigation.navigate('Home');
    }
  }, [invoice]);

  React.useEffect(() => {
    dispatch(actions.paymentAction.getUserRewardPointsSummary(token));
    getCardByUser();
    setTimeout(() => {
      setFirstLoading(false);
    }, 2000);
  }, []);

  React.useEffect(() => {
    if (isReCalculteTotal) {
      dispatch(actions.paymentAction.resetStateReCalculteTotal());
      const temptTotalPrice = { ...tips, totalHasTip: reCalculteTotal };
      dispatch(actions.generalAction.set_tips(temptTotalPrice));
    }
  }, [isReCalculteTotal]);

  const getCardByUser = () => {
    dispatch(actions.cardAction.get_card_by_user(token, userInfo.userId));
  };

  const refreshRewardPoint = () => {
    dispatch(actions.paymentAction.getUserRewardPointsSummary(token));
  };

  const onToggleModalTip = () => {
    showModalTip(!visibleTip);
  };

  const onBack = () => {
    RootNavigation.back();
  };

  const addMoneyToCard = card => () => {
    dispatch(actions.cardAction.set_card_reload(card));
    RootNavigation.navigate('AddMoneyExistCard');
  };

  const addNewCard = () => {
    RootNavigation.navigate('AddNewCard');
  };

  const onPay = () => {
    const checkoutPaymentId = invoice.paymentId ? invoice.paymentId : 0;
    const checkoutAppointmentId = invoice.id ? invoice.id : 0;
    let body = {
      tipAmount: tips.tip,
    };
    let bodyPayment = {
      userCardId: card.userCardId,
      Amount: totalHasTip,
      MerchantId: merchantId_invoice,
      RewardPoint: point != '' ? point : 0,
    };

    if (checkoutPaymentId > 0) {
      dispatch(
        actions.paymentAction.add_tip_and_pay(
          body,
          bodyPayment,
          token,
          checkoutPaymentId,
          checkoutAppointmentId,
          paySuccess,
        ),
      );
    } else {
      dispatch(
        actions.paymentAction.payment_by_scan(bodyPayment, token, paySuccess),
      );
    }
  };

  const paySuccess = () => {
    setPay(true);
  };

  function renderPaySuccess() {
    return <PaySuccess />;
  }

  function renderPayment() {
    return (
      <>
        <ScrollView
          refreshControl={
            <RefreshControl
              refreshing={loading_reward_point}
              onRefresh={refreshRewardPoint}
              size={30}
              progressBackgroundColor="#FFFF"
              colors={['#0764B0']}
              tintColor="#0764B0"
            />
          }
          contentContainerStyle={styles.container_center}>
          <TotalInfo amount={amount} tips={tips} />

          <UsingPoints
            onValueChange={onHandleToggleModal}
            value={toggleCheckBox}
            points={rewardPoints}
            pointIsUsed={point_used}
          />
          {point_used > 0 && <DiscountByPoint price={point_used / 10} />}

          <GrandTotal total={totalHasTip} />

          <CardList
            data={cards}
            onSelectCard={onHandleSelectCard}
            onReloadCard={addMoneyToCard}
            onAddCard={addNewCard}
            card={card}
            amount={totalHasTip}
          />
        </ScrollView>

        <View style={styles.container_button}>
          <ButtonSubmit
            title="Pay"
            width={350}
            onSubmit={onPay}
            disabled={disabled_submit}
            backgroundColor={!disabled_submit ? '#0764B0' : '#EEEEEE'}
            textColor={!disabled_submit ? '#FFF' : '#585858'}
          />
        </View>

        <ModalAddPoints
          isVisible={toggleModal}
          onRequestClose={onHandleToggleModal}
          onCloseCheckBox={oncloseCheckBox}
          points={rewardPoints}
          point={point}
          useAllPoints={useAllPoints}
          useEnterPoints={useEnterPoints}
          applyPoints={applyPoints}
          notUsePoint={notUsePoint}
          onChangePoint={onChangePoint}
        />
      </>
    );
  }

  return (
    <Container barStyle="dark-content">
      <Header
        title="Pay invoice"
        headerLeft={true}
        onBack={onBack}
        iconLeft={ICONS['arrow_back_ios']}
      />
      {!isPay && renderPayment()}
      {isPay && renderPaySuccess()}
    </Container>
  );
}

const GrandTotal = ({ total }) => {
  return (
    <View style={styles.grand_total}>
      <Text fontSize={17} fontFamily="bold">
        Grand total
      </Text>
      <Text fontSize={17} color="#0764b0" fontFamily="bold">
        $ {total}
      </Text>
    </View>
  );
};
