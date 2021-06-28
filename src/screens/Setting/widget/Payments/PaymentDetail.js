import React from "react";
import { Text, View, Image, StyleSheet, Platform } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import { useDispatch, useSelector } from "react-redux";

import actions from "@redux/actions";
import Input from "../PersonalInfo/Input";
import styles from "./styles";
import { Form } from "components";
import Header from "./Header";
import { scaleWidth, scaleHeight, getImageCard, getBackgroundCard, splitMothAndYear } from "utils";
const { ButtonSubmit } = Form;
import images from "assets";
import * as RootNavigation from "navigations/RootNavigation";

export default function Payment(props) {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.datalocalReducer.token);

  const detail_card = useSelector((state) => state.creditAndBankReducer.detail_card);
  const {
    bankAcountId,
    type,
    cardholderName,
    expDate,
    cardNumber,
    cvv,
    userCardTokenId,
    accountHolderName,
    address,
    routingNumber,
    accountNumber,
  } = detail_card;

  const url = bankAcountId ? "bank" : type;
  const _cardholderName = bankAcountId ? accountHolderName : cardholderName;
  const back = () => {
    RootNavigation.back();
  };

  const removeCard = () => {
    bankAcountId
      ? dispatch(actions.creditAndBankAction.remove_bank_card(bankAcountId, token, back))
      : dispatch(actions.creditAndBankAction.remove_credit_card(userCardTokenId, token, back));
  };

  const { backgroundColor, color, titleColor } = getBackgroundCard(url);

  const renderImg = type ? getImageCard(type) : images.bank;

  function renderCardInfo() {
    return (
      <LinearGradient
        start={{ x: 0.0, y: 0.25 }}
        end={{ x: 0.6, y: 1.0 }}
        style={[styles.cardContainer, { position: "relative" }]}
        colors={backgroundColor}>
        <View style={styleDetail.wrapImageVIsa(type)}>
          <Image source={renderImg} style={styles.imgCardVisa2} resizeMode="contain" />
        </View>
        <Text style={[styleDetail.txtTitle, { color: titleColor }]}>CARD NUMBER</Text>
        <Text style={[styleDetail.cardNumber, { color }]}>**** **** **** {cardNumber}</Text>
        <View style={{}}>
          <Text style={[styleDetail.txtTitle, { color: titleColor }]}>CARD HOLDER NAME</Text>
          <Text style={[styleDetail.cardNumber, { color }]}>{_cardholderName}</Text>
        </View>

        {url !== "bank" && (
          <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
            <View>
              <Text style={[styleDetail.txtTitle, { color: titleColor }]}>DATE EXPIRED</Text>
              <Text style={[styleDetail.cardNumber, { color }]}>
                {splitMothAndYear(expDate).fullDate}
              </Text>
            </View>
            <View>
              <Text style={[styleDetail.txtTitle, { color: titleColor }]}>CVV</Text>
              <Text style={[styleDetail.cardNumber, { color, marginLeft: 0 }]}>{cvv}</Text>
            </View>
          </View>
        )}
      </LinearGradient>
    );
  }

  function RemoveComponent() {
    return (
      <View style={styles.button_submit}>
        <ButtonSubmit title="Remove" width={350} onSubmit={removeCard} />
      </View>
    );
  }

  function renderCardInput() {
    return (
      <View style={{ paddingHorizontal: scaleWidth(4) }}>
        <Input
          value={`**** **** **** ${cardNumber}`}
          width={scaleWidth(94)}
          label="CARD NUMBER"
          isLabel
          optionsMask={{ mask: "***************************************************" }}
          editable={false}
        />

        <Input
          value={cardholderName}
          width={scaleWidth(94)}
          label="CARD HOLDER NAME"
          isLabel
          editable={false}
          optionsMask={{ mask: "***************************************************" }}
        />
        <View style={styles.rowExpireDate}>
          {
            <View>
              <Text style={[styles.txtNormal, { marginBottom: scaleHeight(2) }]}>
                <Text>EXPIRED DATE </Text>
              </Text>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  width: scaleWidth(53),
                  justifyContent: "space-between",
                }}>
                <View style={styles.itemSelect}>
                  <Text style={styles.txtNormal}>{splitMothAndYear(expDate).month}</Text>
                </View>

                <View style={styles.itemSelect}>
                  <Text style={styles.txtNormal}>{splitMothAndYear(expDate).year}</Text>
                </View>
              </View>
            </View>
          }

          <View>
            <Text style={[styles.txtNormal, { marginBottom: scaleHeight(2) }]}>
              <Text>CVV</Text>
            </Text>
            <View style={styles.itemSelect}>
              <Text style={styles.txtNormal}>{cvv}</Text>
            </View>
          </View>
        </View>
      </View>
    );
  }

  function renderBankInput() {
    return (
      <View style={{ paddingHorizontal: scaleWidth(4) }}>
        {/* <Input
          value={`**** **** **** ${cardNumber}`}
          width={scaleWidth(94)}
          label="Bank Name"
          isForce
          isLabel
          optionsMask={{ mask: "***************************************************" }}
          editable={false}
        /> */}

        <Input
          value={address}
          width={scaleWidth(94)}
          label="Address"
          isLabel
          editable={false}
          optionsMask={{ mask: "***************************************************" }}
        />

        <Input
          value={"********************************"}
          width={scaleWidth(94)}
          label="Routing Number"
          isForce
          isLabel
          editable={false}
          optionsMask={{ mask: "***************************************************" }}
        />

        <Input
          value={"********************************"}
          width={scaleWidth(94)}
          label="Account Number"
          isForce
          isLabel
          editable={false}
          optionsMask={{ mask: "***************************************************" }}
        />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Header onBack={back} title="Payments detail" isRight onRemoveCard={removeCard} />
      <View style={styles.body}>
        {renderCardInfo()}
        {url != "bank" ? renderCardInput() : renderBankInput()}
      </View>
      {/* <RemoveComponent /> */}
    </View>
  );
}

const styleDetail = StyleSheet.create({
  cardNumber: {
    fontWeight: Platform.OS === "android" ? "bold" : "600",
    fontSize: scaleWidth(4),
    marginLeft: scaleWidth(3),
    marginVertical: scaleHeight(2),
  },
  txtTitle: {
    color: "white",
    fontSize: scaleWidth(3.2),
  },
  wrapImageVIsa: (type) => {
    return {
      position: "absolute",
      right: scaleWidth(3),
      top: scaleWidth(3),
      borderRadius: 3,
      paddingHorizontal: scaleWidth(1),
      backgroundColor: type == "Visa" ? "white" : "transparent",
    };
  },
});
