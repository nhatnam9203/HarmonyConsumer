import React from "react";
import { View, Image, ScrollView, Switch, Keyboard, Dimensions } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import actions from "@redux/actions";
import {
  Header,
  Form,
  Text,
  ButtonSelectCard,
  ButtonSelect,
  StatusBar,
  FocusAwareStatusBar,
  ModalBottomSelect2,
  MoneyButton
} from "components";
import { AutoReloadComponent, EmptyLis } from "./widget";
import { getImageCard, formatMoney, isEmpty, scaleSize, FormatPrice, formatNumberFromCurrency } from "utils";
import * as RootNavigation from "navigations/RootNavigation";
import styles from "./style";
import ICONS from "assets";
import { TextInputMask } from "react-native-masked-text";
import { EmptyList } from "./widget";
const { ButtonSubmit } = Form;
const windowHeight = Dimensions.get('window').height;
const amounts = [10, 20, 50, 100, 500];

export default function index(props) {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.datalocalReducer.token);
  const credits = useSelector((state) => state.creditAndBankReducer.credits);
  const banks = useSelector((state) => state.creditAndBankReducer.banks);
  const card_reload = useSelector((state) => state.cardReducer.card_reload);
  const card_detail = useSelector(state => state.cardReducer.card_detail);

  const refAddMoney = React.useRef(null);
  const refAmountReload = React.useRef(null);
  const refBalance = React.useRef(null);

  //const loading_card = useSelector((state) => state.creditAndBankReducer.loading_card);

  const [isShowReload, setShowReload] = React.useState(false);
  const [isShows, setShow] = React.useState([false, false, false]);
  const [amount_reload, setAmountReload] = React.useState(20);
  const [amount, setAmount] = React.useState(20);
  const [payment, setPayment] = React.useState(null);
  const [card, setCard] = React.useState(null);
  const [balance, setBalance] = React.useState(20);
  const [keyboardHeight, setKeyboardHeight] = React.useState(0);

  const payments = [...credits, ...banks];

  const cardNumber = payment ? `x${payment.cardNumber}` : "Select Payment";
  const url_payment = payment ? (payment.bankAcountId ? "bank" : payment.type) : "credit_form";
  const amount_card = card ? card.amount : "";
  const url_card = card ? { uri: card.imageUrl } : ICONS["primary_card"];
  let isFullFill = () => {
    if (card && payment) return true;
    return false;
  };

  React.useEffect(() => {
    let item = card_reload;
    if (item) {
      setCard(item);
      setShowReload(item.isAutoReload == 1 ? true : false);
      if (item.isAutoReload == 1) {
        setAmountReload(item.autoReloadAmount);
        setBalance(item.autoReloadBelow);
      }
    }
  }, [card_reload]);

  const onBack = () => {
    RootNavigation.back();
  };

  const goToAddPayment = () => {
    RootNavigation.navigate("AddPayment");
  };

  const openShowModal = (index) => () => {
    Keyboard.dismiss();
    const _isShows = [...isShows];
    _isShows[index] = !_isShows[index];
    setShow(_isShows);
  };

  const closeShowModal = (index) => {
    const _isShows = [...isShows];
    _isShows[index] = false;
    setTimeout(() => {
      setShow(_isShows);
    }, 200);
  };

  const handleOnChangeAmount = (index, item) => {
    setAmount(item);
  };

  const handleOnChangePayment = (index, item) => {
    setPayment(item);
    closeShowModal(2);
  };

  const onSubmit = () => {
    let body = {
      Credit: amount,
      CardTokenId: payment.bankAcountId ? payment.bankAcountId : payment.userCardTokenId,
      Type: payment.bankAcountId ? "bank_credit" : "credit",
    };
    dispatch(actions.cardAction.add_money_to_card(token, body, card.userCardId, autoReload));
  };

  const autoReload = () => {
    let body_reload = {
      autoReloadAmount: amount_reload,
      autoReloadBankId: payment.bankAcountId ? payment.bankAcountId : 0,
      autoReloadBelow: balance,
      autoReloadCardId: payment.userCardTokenId ? payment.userCardTokenId : 0,
      isAutoReload: isShowReload ? 1 : 0,
    };
    dispatch(actions.cardAction.auto_reload(token, body_reload, card.userCardId));
  };

  const ItemAmount = ({ item, index }) => {
    return (
      <Text fontSize={17} style={{ fontWeight: "700" }}>
        $ {formatMoney(item)}
      </Text>
    );
  };

  const ItemPayment = ({ item }) => {
    const { cardNumber, type, bankAcountId } = item;
    const _type = bankAcountId ? "bank" : type;
    return (
      <View style={styles.container_item_card}>
        <Image source={getImageCard(_type)} style={styles.image_card} />
        <Text fontSize={17} style={{ fontWeight: "700" }}>
          x{cardNumber}
        </Text>
      </View>
    );
  };

  // const ItemReload = ({ item, index }) => {
  //   return (
  //     <Text fontSize={17} style={{ fontWeight: Platform.OS === "android" ? "bold" : "600" }}>
  //       $ {formatMoney(item)}
  //     </Text>
  //   );
  // };

  const onChangeText = (value) => {
    if (value) {
      setAmount(value)
    }
  }

  const handleKeyBoardShow = (e) => {
    setKeyboardHeight(e.endCoordinates.height);
  }

  const handleKeyBoardHide = (e) => {
    setKeyboardHeight(0);
  }

  const onPressAddAmount = (amount) => {
    if (refAddMoney.current?._inputElement.isFocused()) {
      refAddMoney.current.value = Number(amount);
      setAmount(Number(amount))
    } else if (refAmountReload.current?._inputElement.isFocused()) {
      refAmountReload.current.value = Number(amount);
      setAmountReload(Number(amount))
    } else if (refBalance.current?._inputElement.isFocused()) {
      refBalance.current.value = Number(amount);
      setBalance(Number(amount))
    }
    
  }

  return (
    <View style={styles.container}>
      <KeyboardAwareScrollView
        keyboardShouldPersistTaps="always"
        contentContainerStyle={{ flex: 1 }}
        // extraScrollHeight={scaleSize(120)}
        onKeyboardDidShow={handleKeyBoardShow}
        onKeyboardDidHide={handleKeyBoardHide}
        enableOnAndroid={true}
        >
          <FocusAwareStatusBar barStyle="dark-content" backgroundColor="transparent" />
          <View style={{ backgroundColor: "#f8f8f8" }}>
            <StatusBar />
            <Header
              title="Add money"
              headerLeft={true}
              iconLeft={ICONS["arrow_back_ios"]}
              onBack={onBack}
            />
          </View>
        <ScrollView 
        style={styles.container}
        >
          <View style={styles.container_center}>
            {/* ------------ Select Card ----------------- */}
            <View style={styles.space} />
            <ButtonSelectCard
              title="Cards"
              value={`$ ${formatMoney(amount_card)}`}
              icon={url_card}
              disabled={true}
              // onPress={openShowModal(1)}
            />
          

            {/* ------------ Select Amount ----------------- */}
            <View style={styles.space} />
            <View>
              <Text style={styles.textTitle}>Amount</Text>
              <View style={styles.input}>
                <TextInputMask
                  ref={refAddMoney}
                  type="money"
                  options={{
                    unit: "$ ",
                    precision: 2,
                    separator: ".",
                    delimiter: ",",
                  }}
                  style={styles.text_input}
                  value={amount}
                  onChangeText={(_, rawText) => {setAmount(rawText)}}
                  keyboardType="numeric"
                  includeRawValueInChangeText={true}
                />
              </View>
            </View>

            {/* ------------ Select Amount ----------------- */}
            <View style={styles.container_item}>
              <Text fontSize={20} color="#585858" style={{ fontWeight: "500" }}>
                Auto reload
              </Text>

              <Switch value={isShowReload} onValueChange={value => setShowReload(value)} />
            </View>
            { isShowReload && 
            <View>
              <View style={styles.space} />
              <Text style={styles.textTitle}>Reload amount</Text>
              <View style={styles.input}>
                <TextInputMask
                  ref={refAmountReload}
                  type="money"
                  options={{
                    unit: "$ ",
                    precision: 2,
                    separator: ".",
                    delimiter: ",",
                  }}
                  style={styles.text_input}
                  value={amount_reload}
                  onChangeText={(_, rawText) => {
                    setAmountReload(rawText)
                  }}
                  keyboardType="numeric"
                  includeRawValueInChangeText={true}
                />
              </View>

              <View style={styles.space} />
              <Text style={styles.textTitle}>When balance is below</Text>
              <View style={styles.input}>
                <TextInputMask
                  ref={refBalance}
                  type="money"
                  options={{
                    unit: "$ ",
                    precision: 2,
                    separator: ".",
                    delimiter: ",",
                  }}
                  style={styles.text_input}
                  value={balance}
                  onChangeText={(_, rawText) => setBalance(rawText)}
                  keyboardType="numeric"
                  includeRawValueInChangeText={true}
                />
              </View>
            </View>
            }
            {/* ------------ Select Payment ----------------- */}
            <View style={styles.space} />
            {!isEmpty(payments) ? (
              <ButtonSelectCard
                title="Payment"
                value={cardNumber}
                icon={getImageCard(url_payment)}
                onPress={openShowModal(2)}
              />
            ) : (
              <EmptyList title="Payment" onPress={goToAddPayment} />
            )}
          {/* </KeyboardAwareScrollView> */}
          </View>
        </ScrollView>
      </KeyboardAwareScrollView>
      <View style={[styles.container_button_submit, 
        {bottom: keyboardHeight ? Platform.OS == 'ios' 
        ? scaleSize(keyboardHeight + 20) : scaleSize(keyboardHeight+60) 
        : 30}]}>
        <View style={{alignItems: 'center'}}>
          
          <ButtonSubmit
            title="Add"
            width={350}
            onSubmit={onSubmit}
            disabled={isFullFill() ? false : true}
            backgroundColor={isFullFill() ? "#0764B0" : "#EEEEEE"}
            textColor={isFullFill() ? "#FFF" : "#585858"}
          />
          { keyboardHeight > 0 && 
            <View style={styles.view_choose_money}>
              <View style={{flexDirection: 'row'}}>
                <MoneyButton 
                  amount="20"
                  onPress={onPressAddAmount}/>
                <MoneyButton 
                  amount="50"
                  onPress={onPressAddAmount}/>
                <MoneyButton 
                  amount="100"
                  onPress={onPressAddAmount}/>
                <MoneyButton 
                  amount="500"
                  onPress={onPressAddAmount}/>
              </View>
          </View>

          }
        </View>
      </View>
        
      <ModalBottomSelect2
        title="Payment"
        isVisible={isShows[2]}
        onRequestClose={openShowModal(2)}
        onCloseModal={openShowModal(2)}
        data={payments}
        onSelect={handleOnChangePayment}
        value={payment}
        renderItem={(item) => <ItemPayment item={item} />}
      />
    </View>
  );
}
