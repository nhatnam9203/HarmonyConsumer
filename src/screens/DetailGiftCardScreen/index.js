import actions from '@redux/actions';
import ICONS from 'assets';
import {
  Button,
  Container,
  Form,
  Header,
  ModalAutoReload,
  ModalTransfer,
  Switch,
  Text,
  HarmonyCard,
} from 'components';
import * as RootNavigation from 'navigations/RootNavigation';
import React from 'react';
import { ActivityIndicator, View, ScrollView } from 'react-native';
import Image from 'react-native-fast-image';
import Feather from 'react-native-vector-icons/Feather';
import { useDispatch, useSelector } from 'react-redux';
import { formatNumberFromCurrency, isEmpty, scaleSize } from 'utils';
import styles from './style';
import { BoxClick, PopupConditionRemove, PopupRemove } from './widget';
import QRCode from 'react-native-qrcode-svg';
import { useApi } from './useApi';

const { ButtonSubmit } = Form;

export default function index(props) {
  const dispatch = useDispatch();

  const token = useSelector(state => state.datalocalReducer.token);
  const card_more = useSelector(state => state.cardReducer.card_more);
  const card_primary = useSelector(state => state.cardReducer.card_primary);
  const card_detail = useSelector(state => state.cardReducer.card_detail);
  const credits = useSelector(state => state.creditAndBankReducer.credits);
  const banks = useSelector(state => state.creditAndBankReducer.banks);
  const loading_card_detail = useSelector(
    state => state.cardReducer.loading_card_detail,
  );

  const payments = [...credits, ...banks];
  const { route } = props;
  const { title, iconLeft, iconRight } = route.params;
  let {
    amount,
    imageUrl,
    primaryCard,
    isAutoReload,
    autoReloadAmount,
    autoReloadBelow,
    autoReloadCardId,
    autoReloadBankId,
    userCardId,
  } = card_detail || {};

  const { getUserCard } = useApi({
    userCardId,
    callBack: (key, data) => {
      switch (key) {
        case 'getUserCardById':
          setQrcode(data?.token);
          break;
        default:
          break;
      }
    },
  });

  const button_title = title != 'My Card' ? 'Home Page' : 'Add money';

  const [isPrimary, setPrimaryCard] = React.useState(
    primaryCard == 1 ? true : false,
  );
  const [isAuto, setAutoReload] = React.useState(false);
  const [isVisibleCondition, setVisibleCondition] = React.useState(false);
  const [isVisibleRemove, setVisibleRemove] = React.useState(false);
  const [isVisibleTransfer, setVisibleTransfer] = React.useState(false);
  const [isVisibleAutoReload, setVisibleAutoReload] = React.useState(false);
  const [content, setContent] = React.useState('');
  const [qrCode, setQrcode] = React.useState(null);

  const onChangeValuePrimary = React.useCallback(
    value => {
      setPrimaryCard(value);

      setTimeout(() => {
        dispatch(
          actions.cardAction.update_primary_card(
            token,
            Number(value),
            userCardId,
          ),
        );
      }, 250);
    },
    [isPrimary],
  );

  React.useEffect(() => {
    isEmpty(payments) && fetchListCreditAndBankCard();

    return () => {
      dispatch(actions.cardAction.set_card_detail(null));
    };
  }, []);

  React.useEffect(() => {
    if (userCardId) {
      getUserCard();
    }
  }, [userCardId]);

  const fetchListCreditAndBankCard = () => {
    dispatch(actions.creditAndBankAction.get_creditCard(token));
    dispatch(actions.creditAndBankAction.get_BankCard(token));
  };

  const transferCard = body => {
    dispatch(
      actions.cardAction.transfer_card(token, body, onTogglePopupTransfer),
    );
  };

  const autoReloadCard = body => {
    setVisibleAutoReload(false);
    dispatch(
      actions.cardAction.auto_reload(token, body, userCardId, setAutoReload),
    );
  };

  const removeCard = () => {
    setVisibleRemove(false);
    dispatch(
      actions.cardAction.remove_Card(token, userCardId, onTogglePopupRemove),
    );
  };

  const findPaymentReload = () => {
    const query =
      autoReloadCardId != 0
        ? item => item.userCardTokenId == autoReloadCardId
        : item => item.bankAcountId == autoReloadBankId;
    if (!payments.find(query)) return null;
    return payments.find(query);
  };

  const onChangeValueAuto = value => {
    if (value) {
      setAutoReload(value);
      onTogglePopupAutoReload();
    } else {
      let body = {
        autoReloadAmount,
        autoReloadBankId,
        autoReloadBelow,
        autoReloadCardId,
        isAutoReload: 0,
      };
      dispatch(actions.cardAction.auto_reload(token, body, userCardId));
    }
  };

  const onTogglePopupCondition = React.useCallback(
    content => () => {
      setContent(content);
      setVisibleCondition(!isVisibleCondition);
    },
    [isVisibleCondition],
  );

  const onTogglePopupRemove = React.useCallback(() => {
    setVisibleRemove(!isVisibleRemove);
  }, [isVisibleRemove]);

  const onTogglePopupTransfer = React.useCallback(() => {
    setVisibleTransfer(!isVisibleTransfer);
  }, [isVisibleTransfer]);

  const onTogglePopupAutoReload = React.useCallback(() => {
    setVisibleAutoReload(!isVisibleAutoReload);
  }, [isVisibleAutoReload]);

  const onBack = () => {
    RootNavigation.navigate('BottomTab');
  };

  const addMoney = () => {
    dispatch(actions.cardAction.set_card_reload(card_detail));
    RootNavigation.navigate('AddMoneyExistCard');
  };

  const addPayment = () => {
    RootNavigation.navigate('Payments');
  };

  const IconTitle = ({ title, icon, styleText }) => {
    return (
      <View style={styles.container_icon_title}>
        <Image source={icon} style={styles.icon} />
        <Text fontSize={16.5} color="#404040" style={[styles.title, styleText]}>
          {title}
        </Text>
      </View>
    );
  };
  const Loading = () => {
    return (
      <View style={{ flex: 1, alignItems: 'center', paddingTop: 20 }}>
        <ActivityIndicator animating color="#0764b0" size="large" />
      </View>
    );
  };

  // console.log(card_detail);

  return (
    <Container barStyle="dark-content">
      <Header
        title={title}
        headerLeft={iconLeft}
        headerRight={iconRight}
        onBack={onBack}
      />

      {!loading_card_detail ? (
        <ScrollView keyboardShouldPersistTaps="handled">
          <View style={styles.container_center}>

            <HarmonyCard cardId={userCardId} />

            {/* ------------------ primary card ------------------ */}
            <BoxClick
              disabled={true}
              style={styles.container_row_space_between}>
              <IconTitle
                title="Primary card"
                icon={ICONS['primary_card_detail']}
              />

              <Switch
                value={isPrimary}
                onValueChange={onChangeValuePrimary}
                color={'#0764B0'}
              />
            </BoxClick>
            {/* ------------------ primary card ------------------ */}

            {/* ------------------ payment card ------------------ */}
            <BoxClick
              onPress={addPayment}
              style={styles.container_row_space_between}>
              <IconTitle title="Payments" icon={ICONS['payment_card_detail']} />

              {/* <Image source={ICONS["arrow_forward"]} style={styles.icon_arrow} /> */}
              <Feather
                name="chevron-right"
                color="#585858"
                size={scaleSize(25)}
              />
            </BoxClick>
            {/* ------------------ payment card ------------------ */}

            {/* ------------------ auto reload card ------------------ */}
            <BoxClick
              disabled={true}
              style={styles.container_row_space_between}>
              <View style={styles.container_icon_title}>
                <Image
                  source={ICONS['auto_reload_detail']}
                  style={styles.icon}
                />
                <View>
                  <View
                    style={[
                      styles.sub_container_auto_reload,
                      isAutoReload ? { height: '75%' } : {},
                    ]}>
                    <Text fontSize={16} color="#585858" style={styles.title}>
                      Auto reload
                    </Text>
                    {Boolean(isAutoReload) && (
                      <Text
                        fontSize={13.5}
                        color="#888888"
                        style={styles.title}>
                        $ {autoReloadAmount} when balance is below ${' '}
                        {autoReloadBelow}
                      </Text>
                    )}
                  </View>
                </View>
              </View>
              <Switch
                value={Boolean(isAutoReload)}
                onValueChange={onChangeValueAuto}
                color={'#0764B0'}
              />
            </BoxClick>

            <ModalAutoReload
              isVisible={isVisibleAutoReload}
              statusAuto={isAuto}
              isAutoReload={isAutoReload}
              autoReloadAmount={autoReloadAmount}
              autoReloadBelow={autoReloadBelow}
              payments={payments}
              paymentSelect={findPaymentReload()}
              onRequestClose={onTogglePopupAutoReload}
              onChangeValueAuto={setAutoReload}
              onSubmit={autoReloadCard}
            />
            {/* ------------------ auto reload card ------------------ */}

            {/* ------------------ Transfer card ------------------ */}
            <BoxClick
              disabled={true}
              style={[
                styles.container_row_space_between,
                { justifyContent: 'flex-start' },
              ]}>
              <Button
                disabled={isPrimary ? true : false}
                onPress={onTogglePopupTransfer}>
                <IconTitle
                  title="Transfer balance"
                  icon={ICONS['tranfer_balance_detail']}
                  styleText={{ opacity: isPrimary ? 0.4 : 1 }}
                />
              </Button>

              <Button
                style={{ marginLeft: scaleSize(6) }}
                onPress={onTogglePopupCondition(
                  'You can only transfer money from supplementary cards to primary card.',
                )}>
                <Image
                  source={ICONS['info_card_detail']}
                  style={styles.icon_info_remove}
                />
              </Button>
            </BoxClick>

            <ModalTransfer
              isVisible={isVisibleTransfer}
              fromCards={card_more}
              toCard={card_primary}
              onRequestClose={onTogglePopupTransfer}
              onSubmit={transferCard}
              card_detail={card_detail}
            />
            {/* ------------------ Transfer card ------------------ */}

            {/* ------------------ remove card ------------------ */}
            <BoxClick disabled={true} style={{ justifyContent: 'flex-start' }}>
              <Button
                disabled={formatNumberFromCurrency(amount) > 0 ? true : false}
                onPress={onTogglePopupRemove}>
                <IconTitle
                  title="Remove card"
                  icon={ICONS['remove_card_detail']}
                  styleText={{
                    opacity: formatNumberFromCurrency(amount) > 0 ? 0.4 : 1,
                  }}
                />
              </Button>

              <Button
                style={{ marginLeft: scaleSize(6) }}
                onPress={onTogglePopupCondition(
                  'You can only delete when the balance in the card is 0.',
                )}>
                <Image
                  source={ICONS['info_card_detail']}
                  style={styles.icon_info_remove}
                />
              </Button>
            </BoxClick>
            {/* ------------------ remove card ------------------ */}

            <View style={{ flex: 1, justifyContent: 'flex-end' }}>
              <ButtonSubmit
                title={button_title}
                width={350}
                height={50}
                onSubmit={title == 'My Card' ? addMoney : onBack}
              />
            </View>
          </View>
        </ScrollView>
      ) : (
        <Loading />
      )}

      <PopupConditionRemove
        onRequestClose={onTogglePopupCondition('')}
        isVisible={isVisibleCondition}
        content={content}
      />

      <PopupRemove
        onRequestClose={onTogglePopupRemove}
        isVisible={isVisibleRemove}
        onRemove={removeCard}
      />
    </Container>
  );
}
