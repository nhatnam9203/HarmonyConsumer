import React from "react";
import { View, Image, TouchableOpacity, } from "react-native";
import * as yup from "yup";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import actions from "@redux/actions";
import ICONS from "assets";
import {
  Text,
  Button,
  Header,
  Form,
  RadioButton,
  StatusBar,
  FocusAwareStatusBar,
  CheckedBox,
  SearchListMerchant,
} from "components";
import * as RootNavigation from "navigations/RootNavigation";
import styles from "./style";

const { Input, ButtonSubmit } = Form;

export default function index(props) {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.datalocalReducer.token);

  const [isPrimary, setPrimaryCard] = React.useState(false);
  const [isSelectGiftCard, setIsSelectGiftCard] = React.useState(true);
  const [isSelectStore, setIsSelectStore] = React.useState(false);
  const [key, setKey] = React.useState("");
  const [selectMerchant, setSelectMerchant] = React.useState(null);
  const [isSearch, setIsSearch] = React.useState(false);

  const typingTimeoutRef = React.useRef();

  const { values, touched, errors, handleSubmit, handleChange, setFieldValue } = useFormik({
    initialValues: {
      serialNumber: "",
      merchantId: -1,
    },
    validationSchema: yup.object().shape({
      serialNumber: isSelectGiftCard && 
        yup.string().required("enter your Serial number"),
      merchantId: isSelectStore && yup.number(-1).positive("Select store to create card"),
    }),

    onSubmit: (values) => onHandleSubmit(values),
  });

  const onHandleSubmit = (values) => {
    let body = { ...values, 
      isPrimaryCard: isPrimary ? 1 : 0, 
      merchantId: isSelectStore ? selectMerchant?.merchantId : -1,
      serialNumber: isSelectGiftCard ? values?.serialNumber : "" };
    dispatch(actions.cardAction.add_card(token, body));
  };

  const onBack = () => {
    RootNavigation.back();
  };

  const handleOnChangeValue = React.useCallback(() => {
    setPrimaryCard(!isPrimary);
  }, [isPrimary]);

  const onHandleScan = (typeScan) => () => {
    let obj;
    switch (typeScan) {
      case "serialNumber":
        obj = {
          headerText: "Scan barcode",
          onPress: setFieldValue,
          field: typeScan,
          marker: ICONS["marker_barcode"],
        };
        break;

      default:
        break;
    }

    RootNavigation.navigate("ScanGiftCard", {
      objScan: obj,
    });
  };

  const selectAddSerialNumber = () => {
    setIsSelectGiftCard(true);
    setIsSelectStore(false);
  }

  const selectCheckboxStore = () => {
    setIsSelectGiftCard(false);
    setIsSelectStore(true);
  }

  const onHandleChangeKey = React.useCallback(
    (value) => {
      setKey(value);
      if (typingTimeoutRef.current) {
        clearTimeout(typingTimeoutRef.current);
      }
      typingTimeoutRef.current = setTimeout(() => {
        setPage(1);
      }, 300);
    },
    [key],
  );

  const onPressMerchant = (merchant) => {
    setSelectMerchant(merchant);
    setFieldValue("merchantId", merchant?.merchantId);
  }

  const onSearch = () => {
    setIsSearch(true);
  }

  return (
    <View style={styles.container}>
      <FocusAwareStatusBar barStyle="dark-content" backgroundColor="transparent" />
      <View style={{ backgroundColor: "#f8f8f8" }}>
        <StatusBar />
        <Header title="Add a card" headerLeft={true} onBack={onBack} />
      </View>
     
      <View style={styles.container_center}>
        <TouchableOpacity
          onPress={selectAddSerialNumber}
          activeOpacity={1}
          style={styles.container_radio_button}>
          <RadioButton 
          onChangeValue={selectAddSerialNumber} 
          active={isSelectGiftCard} />
          <Text style={styles.titleText}>
            Add by serial number
          </Text>
        </TouchableOpacity>
        <View style={styles.container_giftcard}>
          <View style={{ flex: 1, padding: 12 }}>
            <View style={styles.wrapper_input}>
              <Input
                styleTextLable={[styles.textSelectMerchant, {color: isSelectGiftCard ? "#4d4d4d" : "#bfbfbf"}]}
                width={326}
                placeHolder="serial number"
                label="Gift card serial number"
                onChangeText={isSelectGiftCard? handleChange("serialNumber") : ()=>{}}
                value={values.serialNumber}
                error={errors.serialNumber}
                touched={touched.serialNumber}
                editable={isSelectGiftCard}
              />
              <IconClick icon={ICONS["scan_barcode"]} onPress={isSelectGiftCard?onHandleScan("serialNumber"):()=>{}} />
            </View>
          </View>
          <View style={styles.line_bottom} />
        </View>
        <TouchableOpacity
          onPress={selectCheckboxStore}
          activeOpacity={1}
          style={styles.container_radio_button}>
          <RadioButton onChangeValue={selectCheckboxStore} active={isSelectStore} />
          <Text style={styles.titleText}>
            Add by selecting store
          </Text>
        </TouchableOpacity>
        <View style={styles.viewMerchant}>
          <Text style={[styles.textSelectMerchant, {color: isSelectStore ? "#4d4d4d" : "#bfbfbf"}]}>
            Select store to create card
          </Text>
          <TouchableOpacity
            onPress={isSelectStore ? onSearch : ()=>{}} 
            activeOpacity={1}
            style={styles.viewSelectMerchant}>
            <Text style={[styles.textSelectMerchant, {color: isSelectStore ? "#4d4d4d" : "#bfbfbf"}]}>
              {selectMerchant ? selectMerchant?.businessName : "Select store"}
            </Text>
            <Image source={ICONS.arrow_down}/>
          </TouchableOpacity>
        </View>
        <View style={styles.separatorLine}/>
        <Text style={styles.errorText}>{errors.merchantId}</Text>
        
        <TouchableOpacity
          onPress={handleOnChangeValue}
          activeOpacity={1}
          style={styles.container_radio_button}>
          <CheckedBox onValueChange={handleOnChangeValue} checked={isPrimary} />
          <Text style={styles.titleText}>
            Make primary card
          </Text>
        </TouchableOpacity>

        <View style={styles.button_submit}>
          <ButtonSubmit title="Add card" onSubmit={handleSubmit} width={160} />
        </View>
      </View>
      <SearchListMerchant
        isVisible={isSearch}
        onRequestClose={()=>{setIsSearch(false)}}
        onSubmit={(merchant) => {onPressMerchant(merchant)}}/>
    </View>
  );
}

const IconClick = ({ icon, onPress }) => {
  return (
    <Button
      hitSlop={{ top: 15, bottom: 15, left: 20, right: 20 }}
      style={styles.button_position}
      onPress={onPress}>
      <Image source={icon} style={styles.image} />
    </Button>
  );
};
