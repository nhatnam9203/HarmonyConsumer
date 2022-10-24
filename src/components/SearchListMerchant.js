import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { getMerchantList, useAxiosQuery } from '@apis';
import actions from "@redux/actions";
import {
  StatusBar,
  SearchBar,
} from "components";
import { StyleSheet, 
    View,
    FlatList, 
    ActivityIndicator, 
    TouchableOpacity,
    Text,
} from "react-native";
import Modal from "react-native-translucent-modal";
import ICONS from "assets";
import { scaleSize } from "utils";


export default function SearchListMerchant({isVisible,
    onRequestClose,
    onSubmit,}) {
  const dispatch = useDispatch();
  const [key, setKey] = React.useState("");
  const [page, setPage] = React.useState(1);
  const [totalPage, setTotalPage] = React.useState(0);
  const [listMerchant, setListMerchant] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(false);

  const typingTimeoutRef = React.useRef();

  const [, getMerchantListData] = useAxiosQuery({
    ...getMerchantList(key, page),
    enabled: false,
    onSuccess: (data, response) => {
      setIsLoading(false);
      setTotalPage(response?.pages);
      
      if(page == 1) {
        setListMerchant(data);
      } else {
        let merchants = listMerchant
        merchants.push(...data);
        setListMerchant(merchants);
      }
    },
  });

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
    onSubmit(merchant);
    if(onRequestClose) {
        onRequestClose();
    }
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

  const goBack = () => {
    onRequestClose();
  }

  return (
    <Modal animationType="slide" onRequestClose={goBack} visible={isVisible}>
        <View style={styles.container}>
            <View style={styles.header}>
                <StatusBar barStyle="dark-content" />
                <SearchBar
                onPressRight={goBack}
                placeholder="Select store"
                placeholderTextColor="#646464"
                width={382}
                height={48}
                iconRight={ICONS["arrow_back_search"]}
                autoFocus={true}
                onChangeText={onHandleChangeKey}
                value={key}
                />

            </View>
            <View 
                style={styles.flatlistView}>
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
    </Modal>
  );
}

const styles = StyleSheet.create({
    container: {
        width: "100%",
        height: "100%",
        // alignItems: 'center',
        backgroundColor: "#FFF",
    },
    header: {
        height: scaleSize(130),
        width: "100%",
        backgroundColor: "#F8F8F8",
        alignItems: "center",
        paddingTop: scaleSize(20),
        paddingHorizontal: scaleSize(12),
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.15,
        shadowRadius: 1.3,

        elevation: 13,
    },
    rowText: {
        fontSize: scaleSize(15)
    },
    rowView: {
        margin: scaleSize(10),
    },
    flatlistView: {
        flex: 1,
        marginTop: scaleSize(15),
        marginLeft: scaleSize(15),
        marginRight: scaleSize(15),
        marginBottom: scaleSize(50),
    },
    viewSelectMerchant: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        height: scaleSize(35),
        marginTop: scaleSize(15),
    },
    textSelectMerchant: {
        fontSize: scaleSize(15),
        color:"#646464",
        marginLeft: 10
    }
});