import React from "react";
import { View, Image, TouchableOpacity, ActivityIndicator } from "react-native";
import { Modal2, PhoneInput, Text } from "components";
import PopupAccepTerm from "./widget/PopupAccepTerm";
import { scaleWidth, scaleHeight } from "utils";
import images from "assets";
import styles from "./style";

import ButtonSocial from "./widget/ButtonSocial";
import ToolTip from "./widget/ToolTip";
import useHook from "./hook";
import { checkPhone } from "utils";

export default function index(props) {
  const [
    isLoading,
    hidePopup,
    isModal,
    phoneHeader,
    phone,
    setPhone,
    setPhoneHeader,
    removePhone,
    verifyPhoneCustomer,
    isLoadingVerify,
    isToolTip,
    inputPhone,
    findCustomer,
    statusLoginSocial,
    loginFacebook,
    loginGoogle,
    loginTwitter,
    loginApple,
  ] = useHook(props);

  function renderHeader() {
    return (
      <>
        <Image source={images.logoHarmony} style={styles.logo} />
        <Text fontFamily="medium" style={[styles.txt1]}>
          Enter your phone number
        </Text>
        <Text style={{ marginTop: scaleWidth(5), textAlign: "center" }}>
          <Text style={[styles.txt2, { fontSize: scaleWidth(4) }]}>
            HarmonyPay will send an SMS to verify your phone number.
          </Text>
          <Text style={[styles.txt2, styles.txt3]}> What's your number?</Text>
        </Text>
      </>
    );
  }

  function renderInput() {
    return (
      <View style={{ position: "relative" }}>
        {isToolTip && <ToolTip />}
        <PhoneInput
          phoneHeader={phoneHeader}
          refInput={inputPhone}
          phone={phone}
          setPhone={setPhone}
          setPhoneHeader={setPhoneHeader}
          removePhone={removePhone}
        />
      </View>
    );
  }

  function renderButtonSubmit() {
    return (
      <TouchableOpacity
        onPress={findCustomer}
        disabled={phone.toString().length <= 10 || isLoading}
        style={styles.buttonContinue(phone)}>
        {isLoading && <ActivityIndicator size="small" color="white" />}
        {!isLoading && (
          <Text fontFamily="medium" style={styles.txtcontinue(phone)}>
            Continue
          </Text>
        )}
      </TouchableOpacity>
    );
  }

  function renderSocialButton() {
    if (!statusLoginSocial)
      return (
        <>
          <View style={styles.lineSocial}>
            <View style={styles.line} />
            <Text style={styles.txtSigninWith}>Or sign in with </Text>
            <View style={styles.line} />
          </View>
          <View style={[styles.lineSocial, { marginTop: scaleHeight(3) }]}>
            <ButtonSocial onPress={loginFacebook} icon={images.icon_facebook} />
            <ButtonSocial onPress={loginTwitter} icon={images.icon_twitter} />
            <ButtonSocial onPress={loginGoogle} icon={images.icon_google} />
            <ButtonSocial onPress={loginApple} icon={images.icon_apple} />
          </View>
        </>
      );
  }

  return (
    <React.Fragment>
      <View pointerEvents={isLoading ? "none" : "auto"} style={styles.container}>
        {renderHeader()}
        {renderInput()}
        {renderButtonSubmit()}
        {renderSocialButton()}
      </View>
      <Modal2 onRequestClose={hidePopup} isVisible={isModal}>
        <PopupAccepTerm
          onCancel={hidePopup}
          navigation={props.navigation}
          phone={phoneHeader + checkPhone(phone, phoneHeader)}
          onPressContinue={verifyPhoneCustomer}
          isLoadingVerify={isLoadingVerify}
        />
      </Modal2>
    </React.Fragment>
  );
}
