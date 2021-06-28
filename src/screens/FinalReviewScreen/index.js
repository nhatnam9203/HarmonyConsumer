import React from "react";
import { View, ScrollView } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import Image from "react-native-fast-image";
import actions from "@redux/actions";
import { Receiver } from "./widget";
import ICONS from "assets";
import { Text, Button, Header, Form, CheckBox, StatusBar } from "components";
import * as RootNavigation from "navigations/RootNavigation";
import styles from "./style";
import { formatMoney, scaleHeight } from "utils";
const { ButtonSubmit, Input } = Form;

export default function index(props) {
  const dispatch = useDispatch();
  const [checked, setChecked] = React.useState(false);
  const gift_send = useSelector((state) => state.buygiftReducer.gift_send);
  const token = useSelector((state) => state.datalocalReducer.token);
  const onBack = () => {
    RootNavigation.back();
  };

  const { infoReceiver } = props.route.params || null;

  React.useEffect(() => {}, [infoReceiver]);

  const onSubmit = () => {
    const _gift_send = { ...gift_send };
    _gift_send["receiverUserId"] = infoReceiver ? 0 : _gift_send.receiver.userId;
    _gift_send["receiverUserName"] = infoReceiver
      ? infoReceiver.full_name
      : _gift_send.receiver.fullName;
    _gift_send["attachSender"] = Number(checked);
    if (infoReceiver) _gift_send["newPhoneInvite"] = infoReceiver.phoneReceiver;

    delete _gift_send.receiver;
    delete _gift_send.imageUrl;
    console.log("_gift_send", _gift_send);
    dispatch(actions.buygiftAction.send_gift_card(token, _gift_send, callBackSendGift));
  };

  const callBackSendGift = (receiverInfo) => {
    RootNavigation.navigate("TransactionProcessing", { receiverInfo });
  };

  const onChecked = () => {
    setChecked(!checked);
  };

  const AttachSender = () => (
    <Button onPress={onChecked} style={styles.button_add}>
      <CheckBox checked={checked} onValueChange={onChecked} />
      <Text fontSize={15} style={styles.txt_add}>
        Attach sender information
      </Text>
    </Button>
  );

  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      <View style={{ backgroundColor: "#f8f8f8" }}>
        <StatusBar />
        <Header
          title="Buy gift"
          headerLeft={true}
          onBack={onBack}
          iconLeft={ICONS["arrow_back_ios"]}
        />
      </View>

      <ScrollView bounces={false} contentContainerStyle={styles.container_center}>
        <Text style={styles.header} fontSize={18} color="#666666">
          Review
        </Text>

        <Image style={styles.image_card} source={{ uri: gift_send.imageUrl }} />

        <View style={styles.content_card}>
          <Text fontSize={17} style={{ fontWeight: "bold" }}>
            {gift_send.giftCardTemplateName} ! -
            <Text fontSize={17} style={{ fontWeight: "normal" }}>
              {`  Value:  `}
            </Text>
            $ {formatMoney(gift_send.amount)}
          </Text>
        </View>

        <View style={styles.line_bottom} />

        <Text style={styles.header} fontSize={17} color="#585858">
          Receiver
        </Text>

        <Receiver infoReceiver={infoReceiver} receiver={gift_send.receiver} />

        <Input
          width={382}
          label="Message:"
          height={100}
          styleTextInput={styles.input}
          contentContainerInput={{ borderBottomWidth: 0 }}
          value={gift_send.message}
          editable={false}
        />

        <AttachSender />
        <View style={{ height: scaleHeight(30) }} />
      </ScrollView>

      <View style={styles.button_submit}>
        <ButtonSubmit onSubmit={onSubmit} title="Send" width={350} />
      </View>
    </View>
  );
}
