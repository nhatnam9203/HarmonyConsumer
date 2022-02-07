import React, { useRef } from 'react';
import {
  View,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  RefreshControl,
  Platform,
} from 'react-native';
import { scaleWidth, slop, scaleHeight } from 'utils';
import styles from '../styles';
import moment from 'moment';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import Item from './Item';
import { Header, StatusBar, Text } from 'components';
import { useSelector, useDispatch } from 'react-redux';
import actions from '@redux/actions';
import images from 'assets';
import PopupFilter from './PopupFilter';
import { Modalize } from 'react-native-modalize';

export default function Transaction(props) {
  const refPopupFilter = useRef(null);
  const refModalFilter = useRef(null);
  const refScrollList = useRef(null);

  const dispatch = useDispatch();

  const [page, setPage] = React.useState(1);
  const [isLoadMore, setLoadMore] = React.useState(false);
  const [isRefresh, setRefresh] = React.useState(false);

  const { transaction, filterType } = useSelector(
    state => state.paymentReducer,
  );
  const { token, userInfo } = useSelector(state => state.datalocalReducer);
  const { userId } = userInfo;

  const { start, end } = props;

  const fromTime = moment(start).format('YYYY-MM-DD');
  const toTime = moment(end).format('YYYY-MM-DD');
  const timezone = new Date().getTimezoneOffset();

  React.useEffect(() => {
    dispatch({ type: 'START_FETCH_API' });
  }, []);

  React.useEffect(() => {
    getDataTransaction();
  }, [start, end]);

  const isAndroid = () => Platform.OS === 'android';

  const selectFilter = async data => {
    const { type } = data;
    await dispatch(actions.paymentAction.onChangeFilterType(type));
    await getDataTransaction(type);
    setPage(1);
    refScrollList?.current?.scrollTo({ y: 0 });
    closeModalFilter();
  };

  const getDataTransaction = type => {
    dispatch(
      actions.paymentAction.paymentTransaction(
        token,
        userId,
        1,
        fromTime,
        toTime,
        type ? type : filterType,
        timezone,
        () => {},
      ),
    );
  };

  const back = () => {
    props.navigation.goBack();
  };

  const selectTimeRange = () => {
    props.goToPage(1);
  };

  const openModalFilter = () => {
    refModalFilter.current?.open();
  };

  const closeModalFilter = () => {
    refModalFilter.current?.close();
  };

  const refreshTransaction = () => {
    setRefresh(true);
    getDataTransaction();
    setPage(1);
    setTimeout(() => {
      setRefresh(false);
    }, 1000);
  };

  const stopRefresh = () => {
    setRefresh(false);
  };

  const updatePage = () => {
    setPage(page + 1);
  };

  const updateLoadmore = async e => {
    if (isLoadMore) return;

    const scrollPosition = e.nativeEvent.contentOffset.y;
    const scrollViewHeight = e.nativeEvent.layoutMeasurement.height;
    const contentHeight = e.nativeEvent.contentSize.height;
    const isScrolledToBottom = scrollViewHeight + scrollPosition;

    if (isScrolledToBottom >= contentHeight - 50) {
      setLoadMore(true);
      dispatch(
        actions.paymentAction.paymentTransaction(
          token,
          userId,
          page + 1,
          fromTime,
          toTime,
          filterType,
          timezone,
          stopLoadMore(),
        ),
      );
      updatePage();
    }
  };

  const stopLoadMore = () => {
    setTimeout(() => {
      setLoadMore(false);
    }, 500);
  };

  const onScrollHandle = e => {
    if (isAndroid()) {
      updateLoadmore(e);
    }
  };

  const onMomentumScrollEnd = e => {
    if (!isAndroid()) {
      updateLoadmore(e);
    }
  };

  return (
    <View style={styles.container}>
      <View style={{ backgroundColor: '#f8f8f8' }}>
        <StatusBar barStyle="dark-content" />
        <Header
          onBack={back}
          headerLeft
          title="Transactions"
          headerRight
          iconRight={images.icon_filter}
          onPressRight={openModalFilter}
        />
      </View>

      <View style={styles.body}>
        <SelectBarTime
          selectTimeRange={selectTimeRange}
          start={start}
          end={end}
        />
        <ScrollView
          style={{ flex: 1, height: '100%' }}
          scrollEventThrottle={400}
          refreshControl={
            <RefreshControl
              refreshing={isRefresh}
              onRefresh={refreshTransaction}
              size={30}
            />
          }
          ref={refScrollList}
          onMomentumScrollEnd={onMomentumScrollEnd}
          onScroll={onScrollHandle}>
          {transaction.length == 0 && (
            <Text style={styles.notFound}>No transaction found.</Text>
          )}
          {transaction.map((item, key) => {
            return renderItem(item, key);
          })}
        </ScrollView>
        {isLoadMore && (
          <View
            style={{
              bottom: 10,
              alignSelf: 'center',
              position: 'absolute',
              width: 50,
              height: 50,
              justifyContent: 'center',
            }}>
            <ActivityIndicator size="large" color="#0764B0" />
          </View>
        )}
      </View>

      <Modalize
        ref={refModalFilter}
        adjustToContentHeight
        onBackButtonPress={closeModalFilter}>
        <PopupFilter
          selectFilter={selectFilter}
          ref={refPopupFilter}
          closeModal={closeModalFilter}
        />
      </Modalize>
    </View>
  );
}

const renderItem = (item, key) => {
  return (
    <View key={key}>
      <View style={styles.itemTime}>
        <Text style={styles.txtTime}>{item.date}</Text>
      </View>
      <View style={styles.containerItem}>
        {item.value.map((obj, index) => (
          <Item
            key={obj.userCardTransactionId + index + Math.random()}
            title={obj.type}
            cardName={obj.userCardName}
            price={obj.amount}
            balance={obj.balance}
            createdDate={obj.createdDate}
            time={obj.time}
          />
        ))}
      </View>
    </View>
  );
};

const SelectBarTime = ({ selectTimeRange, start, end }) => {
  const renderTitleText = () => {
    let text = `${moment(start).format('MM/DD/YYYY')} - ${moment(end).format(
      'MM/DD/YYYY',
    )}`;
    const diff = moment(end).diff(moment(start), 'days');
    if (moment(end).format('MM/DD/YYYY') == moment().format('MM/DD/YYYY')) {
      switch (Math.abs(diff)) {
        case 7:
          text = 'Last 7 days';
          break;
        case 30:
          text = 'Last 30 days';
          break;
        case 90:
          text = 'Last 90 days';
          break;

        default:
          text = `${moment(start).format('MM/DD/YYYY')} - ${moment(end).format(
            'MM/DD/YYYY',
          )}`;
          break;
      }
    }
    return text;
  };

  return (
    <TouchableOpacity
      hitSlop={slop}
      onPress={selectTimeRange}
      style={styles.barTime}>
      <View style={styles.wrapSearch}>
        <Text style={styles.txtSearch}>{renderTitleText()}</Text>
        <EvilIcons name="calendar" size={scaleWidth(8)} color={'#7A98BB'} />
      </View>
    </TouchableOpacity>
  );
};
