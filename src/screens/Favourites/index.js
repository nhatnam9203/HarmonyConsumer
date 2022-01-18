import React from 'react';
import { View, ScrollView, RefreshControl } from 'react-native';
import {
  Header,
  StatusBar,
  ItemCardPlaceHolder,
  Text,
  FocusAwareStatusBar,
} from 'components';
import styles from './styles';
import { Store, Stylist } from './widget';
import { scaleHeight, scaleWidth } from 'utils';
import { useSelector, useDispatch } from 'react-redux';
import actions from '@redux/actions';
import * as RootNavigation from 'navigations/RootNavigation';
import Configs from '@src/configs';

export default function index(props) {
  const dispatch = useDispatch();
  const token = useSelector(state => state.datalocalReducer.token);
  const placeholders = useSelector(
    state => state.datalocalReducer.placeholders,
  );

  const [firstLoading, setFirstLoading] = React.useState(false);
  const [isRefresh, setRefresh] = React.useState(false);

  React.useEffect(() => {
    setFirstLoading(true);
    getFavorites();
  }, []);

  const getFavorites = () => {
    dispatch(actions.storeAction.get_favourite_store(token, afterGetFavourite));
    dispatch(actions.staffAction.getFavouriteStaffMerchant(token));
  };

  const refreshFavorites = () => {
    setRefresh(true);
    getFavorites();
    setTimeout(() => {
      setRefresh(false);
    }, 1000);
  };

  const afterGetFavourite = status => {
    if (status) {
      setFirstLoading(false);
    }
  };

  const favourite_store_setting = useSelector(
    state => state.storeReducer.favourite_store_setting,
  );
  const staff_favourites = useSelector(
    state => state.staffReducer.staff_favourites,
  );

  const onBack = () => {
    RootNavigation.back();
  };

  const renderStaffList = () => {
    return staff_favourites.map(staff => (
      <Stylist staff={staff} key={staff.staffId} />
    ));
  };

  const renderStores = () => {
    return favourite_store_setting.map(merchant => (
      <Store key={merchant.merchantId} item={merchant} />
    ));
  };

  const renderBody = () => {
    if (firstLoading) {
      return <Loading placeholders={placeholders} />;
    }
    return (
      <>
        <Text fontFamily="medium" style={styles.txtStore}>
          Store
        </Text>
        {renderStores()}

        {favourite_store_setting.length === 0 && (
          <Text fontSize={15} style={styles.txtEmpty}>
            You have no favourite store.
          </Text>
        )}

        {/* -------------------RENDER STYLISTS------------------- */}
        <Text fontFamily="medium" style={styles.txtStore}>
          Stylist
        </Text>
        {renderStaffList()}

        {staff_favourites.length === 0 && (
          <Text fontSize={15} style={styles.txtEmpty}>
            You have no favourite stylist.
          </Text>
        )}
      </>
    );
  };

  return (
    <View style={styles.container}>
      <FocusAwareStatusBar
        barStyle="dark-content"
        backgroundColor="transparent"
      />
      <View style={{ backgroundColor: '#f8f8f8' }}>
        <StatusBar barStyle="dark-content" />
        <Header
          title="Favourites"
          headerLeft={true}
          headerRight={false}
          onBack={onBack}
        />
      </View>

      <ScrollView
        refreshControl={
          <RefreshControl
            refreshing={isRefresh}
            onRefresh={refreshFavorites}
            size={30}
          />
        }
        bounces={true}>
        <View style={styles.body}>{renderBody()}</View>
        <View style={{ height: scaleHeight(20) }} />
      </ScrollView>
    </View>
  );
}

const Loading = ({ placeholders }) => {
  return placeholders.map((item, index) => (
    <ItemCardPlaceHolder
      key={index + ''}
      width={Configs.CARD_WIDTH}
      height={250}
      borderRadius={5}
      style={{
        marginLeft: scaleWidth(5),
        marginTop: scaleHeight(2),
      }}
    />
  ));
};
