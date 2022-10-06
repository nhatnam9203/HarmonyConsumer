import React from "react";
import { View, Image, TouchableOpacity, FlatList, ActivityIndicator } from "react-native";
import * as yup from "yup";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { getMerchantList, useAxiosQuery } from '@apis';
import actions from "@redux/actions";
import ICONS from "assets";
import { scaleSize } from 'utils';
import {
  Text,
  Button,
  Header,
  Form,
  RadioButton,
  StatusBar,
  FocusAwareStatusBar,
  SearchBar,
  CheckBox,
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
  const [page, setPage] = React.useState(1);
  const [totalPage, setTotalPage] = React.useState(0);
  const [listMerchant, setListMerchant] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(false);
  const [selectMerchant, setSelectMerchant] = React.useState(null);

  const typingTimeoutRef = React.useRef();

  const [, getMerchantListData] = useAxiosQuery({
    ...getMerchantList(key, page),
    enabled: false,
    onSuccess: (data, response) => {
      console.log('page', page)
      console.log('onSuccess', data)
      setIsLoading(false);
      setTotalPage(response?.pages);
      
      if(page == 1) {
        console.log('data page 1')
        setListMerchant(data);
      } else {
        let merchants = listMerchant
        merchants.push(...data);
        console.log('merchants', merchants)
        setListMerchant(merchants);
      }
    },
  });

  const { values, touched, errors, handleSubmit, handleChange, setFieldValue } = useFormik({
    initialValues: {
      serialNumber: "",
    },
    validationSchema: yup.object().shape({
      serialNumber: yup.string().required("enter your Serial number"),
    }),

    onSubmit: (values) => onHandleSubmit(values),
  });

  const onHandleSubmit = (values) => {
    let body = { ...values, isPrimaryCard: isPrimary ? 1 : 0 };
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
      console.log('onHandleChangeKey', value)
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
  }

  const renderItem = (item) =>{
    return(
      <TouchableOpacity 
        style={styles.rowView}
        onPress={() => onPressMerchant(item?.item)}>
        {item?.item?.businessName &&
          <Text style={styles.rowText}>
            {item?.item?.businessName}
          </Text>
        }
      </TouchableOpacity>
    )
  }

  React.useEffect(()=>{
      getMerchantListData();
  },[page, key])

  const onLoadMoreMerchant = () => {
    if (page == totalPage || isLoading) return;

    setIsLoading(true);
    const nextPage = page + 1;
    setPage(nextPage);
  }

  const renderFooterMerchantList = () => {
    return (
      page != totalPage &&
      <ActivityIndicator
      size={'small'}
      color={'#646464'}/>
    )
  }

  const heightFlatlist = listMerchant && listMerchant.length>0 ? 200 : 0;

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
          <Text color="#0764B0" style={{ marginLeft: 10 }}>
            Add by serial number
          </Text>
        </TouchableOpacity>
        <View style={styles.container_giftcard}>
          <View style={{ flex: 1, padding: 12 }}>
            <View style={styles.wrapper_input}>
              <Input
                width={326}
                placeHolder="serial number"
                label="Gift card serial number"
                onChangeText={handleChange("serialNumber")}
                value={values.serialNumber}
                error={errors.serialNumber}
                touched={touched.serialNumber}
              />
              <IconClick icon={ICONS["scan_barcode"]} onPress={onHandleScan("serialNumber")} />
            </View>
          </View>
          <View style={styles.line_bottom} />
        </View>
        <TouchableOpacity
          onPress={selectCheckboxStore}
          activeOpacity={1}
          style={styles.container_radio_button}>
          <RadioButton onChangeValue={selectCheckboxStore} active={isSelectStore} />
          <Text color="#0764B0" style={{ marginLeft: 10 }}>
            Add by selecting store
          </Text>
        </TouchableOpacity>
        <View style={styles.viewMerchant}>
          <Text style={[styles.textSelectMerchant, {color: isSelectStore ? "#0000" : "#bfbfbf"}]}>
            Select store to create card
          </Text>
          <View style={styles.search_bar}>
            <SearchBar
              placeholder="Select store"
              placeholderTextColor="#646464"
              iconLeft={ICONS["searchbar"]}
              width={382}
              value={key}
              onChangeText={onHandleChangeKey}
              autoFocus={false}
            />
          </View>
          
          <View 
            style={[styles.flatlistView, { height: scaleSize(heightFlatlist)}]}>
            <FlatList
              data={listMerchant || []}
              renderItem={(item)=> renderItem(item)}
              keyExtractor={(_, index) => index.toString()}
              onEndReached={()=>{onLoadMoreMerchant()}}
              ListFooterComponent={renderFooterMerchantList()}
              onEndReachedThreshold={0.1}
            />
          </View>
          
        </View>
        
        <TouchableOpacity
          onPress={handleOnChangeValue}
          activeOpacity={1}
          style={styles.container_radio_button}>
          <RadioButton onChangeValue={handleOnChangeValue} active={isPrimary} />
          <Text color="#0764B0" style={{ marginLeft: 10 }}>
            Make primary card
          </Text>
        </TouchableOpacity>

        <View style={styles.button_submit}>
          <ButtonSubmit title="Add card" onSubmit={handleSubmit} width={160} />
        </View>
      </View>
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
