import React from "react";
import { View, Image } from "react-native";
import { useDispatch, useSelector } from "react-redux";

import actions from "@redux/actions";
import { Receiver } from "./widget";
import ICONS from "assets";
import { formatMoney, scaleSize } from "utils";
import { Text, Header, Form, ProgressiveImage, StatusBar } from "components";
import * as RootNavigation from "navigations/RootNavigation";
import styles from "./style";

const { ButtonSubmit, Input } = Form;

export default function index(props) {
  const {
    gifts: { amount, imageUrl, message, senderId, receiverId, giftcardId, notificationId, merchantName },
  } = props.route.params;

  const dispatch = useDispatch();
  const token = useSelector((state) => state.datalocalReducer.token);
  const sender = useSelector((state) => state.buygiftReducer.sender);

  React.useEffect(() => {
    getSenderById();
  }, []);

  const getSenderById = () => {
    dispatch(actions.authAction.getCustomerById(senderId, token, () => {}, "sender"));
  };

  const claimSuccess = () => {
    RootNavigation.navigate("ClaimGiftSuccess", { amount });
  };

  const onBack = () => {
    RootNavigation.back();
  };

  const onSubmit = () => {
    let body = {
      userId: receiverId,
    };

    dispatch(
      actions.buygiftAction.claim_gift_card(
        token,
        body,
        giftcardId,
        [notificationId],
        claimSuccess,
      ),
    );
  };

  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      <View style={{ backgroundColor: "#f8f8f8" }}>
        <StatusBar />
        <Header title="Gift" headerLeft={true} onBack={onBack} iconLeft={ICONS["arrow_back_ios"]} />
      </View>

      <View style={styles.container_center}>
        <Text style={styles.header} fontSize={17} color="#666666">
          You received a gift card
        </Text>

        <Image style={styles.image_card} source={{ uri: imageUrl }} />

        <View style={styles.content_card}>
          <Text fontSize={17} style={{ fontWeight: "bold" }}>
            Thank you ! -
            <Text fontSize={17} style={{ fontWeight: "normal" }}>
              {`  Value:  `}
            </Text>
            $ {formatMoney(amount)}
          </Text>
        </View>

        <View style={styles.line_bottom} />

        <Text style={styles.header} fontSize={17} color="#585858">
          Sender
        </Text>

        <Receiver sender={sender} />

        <Text style={[styles.header]} fontSize={17} color="#585858">
          {`Store: ${merchantName}`}
        </Text>

        <View style={{ marginTop: scaleSize(20) }}>
          <Input
            width={382}
            label="Message:"
            height={90}
            styleTextInput={styles.input}
            contentContainerInput={{ borderBottomWidth: 0 }}
            value={message}
            editable={false}
          />
        </View>
      </View>

      <View style={styles.button_submit}>
        <ButtonSubmit onSubmit={onSubmit} title="Claim" width={350} />
      </View>
    </View>
  );
}
