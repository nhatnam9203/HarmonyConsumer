import React, { useState } from "react";
import { View, Image } from "react-native";
import { useFormik } from "formik";
import * as yup from "yup";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import * as Animatable from "react-native-animatable";

import ICONS from "assets";
import { scaleSize } from "utils";
import { Text, Container, Button, Header, Form } from "components";
import { PopupSuccessfull } from "./widget";
import * as RootNavigation from "navigations/RootNavigation";
import styles from "./style";
const { Input, ButtonSubmit } = Form;
export default function index(props) {
  const { values, touched, errors, handleSubmit, handleChange } = useFormik({
    initialValues: {
      code: "",
    },
    validationSchema: yup.object().shape({
      code: yup.string().required("enter your verify code"),
    }),

    onSubmit: (values) => {
      togglePopupSucess();
    },
  });

  const [positionButton, setpositionButton] = React.useState({ bottom: 0 });
  const [focus, setFocus] = React.useState(false);
  const [isShow, setIsShow] = React.useState(false);

  const onBack = () => {
    RootNavigation.back();
  };
  const goToAddMoney = () => {
    setIsShow(false);
    setTimeout(() => {
      RootNavigation.navigate("AddMoney");
    }, 300);
  };

  const goToHome = () => {
    setIsShow(false);
    setTimeout(() => {
      RootNavigation.navigate("BottomTab");
    }, 300);
  };

  const togglePopupSucess = () => setIsShow(!isShow);

  const handleKeyBoardShow = (e) => {
    setTimeout(() => {
      setFocus(true);
      setpositionButton({ bottom: scaleSize(e.endCoordinates.height - 25) });
    }, 200);
  };

  const handleKeyBoardHide = () => {
    setFocus(false);
    setpositionButton({ bottom: 0 });
  };

  return (
    <Container barStyle="dark-content">
      <Header title="Validation" headerLeft={true} onBack={onBack} />

      <KeyboardAwareScrollView
        keyboardShouldPersistTaps="handled"
        scrollEnabled={false}
        showsVerticalScrollIndicator={false}
        onKeyboardWillShow={handleKeyBoardShow}
        onKeyboardWillHide={handleKeyBoardHide}
        style={styles.container_center}
        contentContainerStyle={{ alignItems: "center", flexGrow: 1 }}>
        <Image style={styles.image_creditcard} source={ICONS["visa_active"]} />
        <Text fontSize={23}>Verify by phone</Text>

        <View style={styles.content_text}>
          <Text fontSize={17} style={{ textAlign: "center" }}>
            We just send you a verification code by text message. Please enter the code below.
          </Text>
        </View>

        <Input
          width={114}
          onChangeText={handleChange("code")}
          value={values.code}
          error={errors.code}
          touched={touched.code}
          styleTextInput={styles.text_input}
          maxLength={6}
          autoFocus={true}
          keyboardType="numeric"
        />

        <Button>
          <Text fontSize={17} color="#1C98C9">
            Verification code
          </Text>
        </Button>
        <Animatable.View
          animation={focus ? "slideInUp" : "slideInDown"}
          style={[styles.container_button_submit, positionButton]}>
          <ButtonSubmit title="Confirm" width={350} onSubmit={handleSubmit} />
        </Animatable.View>
      </KeyboardAwareScrollView>

      <PopupSuccessfull
        isVisible={isShow}
        onRequestClose={togglePopupSucess}
        onPress={goToAddMoney}
        onCancel={goToHome}
      />
    </Container>
  );
}
