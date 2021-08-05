import React, { useRef } from "react";
import { Animated, View } from "react-native";
import * as Animatable from "react-native-animatable";
import { useDispatch, useSelector } from "react-redux";

import {
  reset_search_list,
  setStoreNearSearch,
  setStoreFavouriteSearch,
} from "@redux/actions/storeAction";
import actions from "@redux/actions";
import { set_location_tab_store } from "@redux/actions/datalocalAction";
import {
  Text,
  ModalBottomSelect,
  StatusBar,
  FocusAwareStatusBar,
  ModalBottomSelect2,
} from "components";
import Geolocation from "@react-native-community/geolocation";
import {
  Header,
  ButtonFilters,
  ModalInputSearchLocation,
  TabBar,
  TabFavourite,
  TabNearMe,
  SearchList,
  ModalFilterList,
} from "./Widget";
import ICONS from "assets";
import { scaleSize } from "utils";
import styles from "./styles";

const DATA = [
  { name: "Favourites", url: ICONS["like_heart"] },
  { name: "Near me", url: ICONS["location"] },
];
const FILTERS_FAVOURITE = [
  { name: "Top rated", value: "rated" },
  { name: "Nearest", value: "nearest" },
  { name: "Newest", value: "newest" },
];

export default function index(props) {
  const { navigation } = props;
  const height = useRef(new Animated.Value(scaleSize(230))).current;
  const dispatch = useDispatch();

  const placeholders = useSelector((state) => state.datalocalReducer.placeholders);
  const {
    store_tab_near = [],
    favourite_stores,
    loading_store,
    storeNearSearch,
    storeFavouriteSearch,
    storeSearch,
    filter_favourite_store,
    filter_near_store,
  } = useSelector((state) => state.storeReducer);
  const token = useSelector((state) => state.datalocalReducer.token);

  const location_tab_store = useSelector((state) => state.datalocalReducer.location_tab_store);
  const { lat, lng, formatted_address } =
    location_tab_store && location_tab_store.location ? location_tab_store.location : 0;

  const [isTabActive, setTabActive] = React.useState(2);

  const [isVisible, setVisibleModal] = React.useState(false);
  const [isShowSearchList, showSearchList] = React.useState(false);
  const [isShowSearchLocation, showSearchLocation] = React.useState(false);

  React.useLayoutEffect(() => {
    dispatch(
      actions.storeAction.searchStoreFavourite(
        "",
        "favorite",
        filter_favourite_store,
        lat,
        lng,
        1,
        token,
      ),
    );
    dispatch(actions.storeAction.searchStoreNear("", "all", filter_near_store, lat, lng, 1, token));
  }, []);

  React.useEffect(() => {
    if (isTabActive == 1) {
      dispatch(
        actions.storeAction.searchStoreNear("", "near", filter_near_store, lat, lng, 1, token),
      );
    } else if (isTabActive == 2) {
      dispatch(
        actions.storeAction.searchStoreNear("", "all", filter_near_store, lat, lng, 1, token),
      );
    }
  }, [isTabActive]);

  const handleChangePage = (i) => {
    if (i == isTabActive) {
      setTabActive(2);
      Animated.timing(height, {
        toValue: scaleSize(230),
        timing: 300,
        // useNativeDriver: false,
      }).start();
      return;
    }
    if (i == 1) {
      getCurrentLocation();
    }
    Animated.timing(height, {
      toValue: i === 0 ? scaleSize(160) : scaleSize(230),
      timing: 300,
      // useNativeDriver: false,
    }).start();
    setTabActive(i);
  };

  const onHandleChangeMyLocation = (data, detail = null) => {
    const addresses = {
      formatted_address: detail.formatted_address,
      location: detail.geometry.location,
    };

    const { lat, lng } = detail.geometry.location;
    dispatch(set_location_tab_store(addresses));
    if (isTabActive == 1) {
      dispatch(
        actions.storeAction.searchStoreNear("", "near", filter_near_store, lat, lng, 1, token),
      );
    } else if (isTabActive == 2) {
      dispatch(
        actions.storeAction.searchStoreNear("", "all", filter_near_store, lat, lng, 1, token),
      );
    }
    showSearchLocation(false);
  };

  const openDrawer = () => {
    navigation.openDrawer();
  };

  const onShowModal = () => {
    setVisibleModal(!isVisible);
  };

  const onShowSearchList = () => {
    showSearchList(!isShowSearchList);
  };

  const getCurrentLocation = () => {
    if (!formatted_address || formatted_address === "" || formatted_address === undefined) {
      Geolocation.getCurrentPosition(
        async (position) => {
          const {
            coords: { longitude, latitude },
          } = position;

          let address = await convertLatLongToAddress(latitude, longitude);

          const payload = {
            formatted_address: address,
            location: {
              lat: latitude,
              lng: longitude,
            },
          };

          dispatch(actions.datalocalAction.set_current_location(payload));
          dispatch(actions.datalocalAction.set_location_tab_store(payload));
        },
        (error) => {
          console.log(error.message);
        },
        { enableHighAccuracy: false, timeout: 20000 },
      );
    }
  };

  const onSubmit = (key) => {
    if (key === "") {
      dispatch({ type: "SET_STORE_SEARCH", payload: [] });
      return;
    }
    dispatch(
      actions.storeAction.searchStore(
        key,
        "all",
        "nearest",
        lat,
        lng,
        1,
        token,
        (screen = "SEARCH_STORE"),
      ),
    );
  };

  const afterSubmitFavouriteStore = (data) => {
    dispatch(setStoreFavouriteSearch(data));
  };

  const afterSubmitNearStore = (data) => {
    dispatch(setStoreNearSearch(data));
  };

  const clearSearchList = () => {
    dispatch(reset_search_list());
  };

  const clearMyLocation = () => {
    const payload = {
      formatted_address: "",
      location: {
        lat: lat,
        lng: lng,
      },
    };

    dispatch(set_location_tab_store(payload));
  };

  const toggleSearchLocation = React.useCallback(() => {
    showSearchLocation(!isShowSearchLocation);
  }, [isShowSearchLocation]);

  const openSearchLocation = () => {
    dispatch(
      actions.storeAction.setValueSearchLocationTabNear(location_tab_store.formatted_address),
    );
    showSearchLocation(true);
  };

  const closeSearchList = () => {
    showSearchList(false);
  };

  const onChangeFavoriteStore = (index, item) => {
    dispatch(actions.storeAction.onChangeFilterFavourite(item.value));
    dispatch(
      actions.storeAction.searchStoreFavourite("", "favorite", item.value, lat, lng, 1, token),
    );
    onShowModal();
  };

  const onChangeNearStore = (index, item) => {
    dispatch(actions.storeAction.onChangeFilterNear(item.value));
    if (isTabActive == 1) {
      dispatch(actions.storeAction.searchStoreNear("", "near", item.value, lat, lng, 1, token));
    } else if (isTabActive == 2) {
      dispatch(actions.storeAction.searchStoreNear("", "all", item.value, lat, lng, 1, token));
    }
    onShowModal();
  };

  const Item = ({ item, index }) => {
    return (
      <Text fontSize={17} style={{ fontWeight: "700", marginLeft: 5 }}>
        {item.name}
      </Text>
    );
  };

  return (
    <View style={{ flex: 1 }}>
      <FocusAwareStatusBar barStyle="dark-content" backgroundColor="transparent" />
      <Animated.View style={[styles.container_header, { height }]}>
        <StatusBar />
        <Header
          openDrawer={openDrawer}
          onfocusSearch={onShowSearchList}
          propInput={{
            onFocus: onShowSearchList,
          }}
        />

        <View style={styles.containerButton}>
          <TabBar
            activeTab={isTabActive}
            tabs={DATA}
            handleChangePage={handleChangePage}
            style={styles.tabs}
          />

          <ButtonFilters style={styles.button_filter} onPress={onShowModal} />
        </View>

        {(isTabActive == 1 || isTabActive == 2) && (
          <Animatable.View animation="fadeIn">
            <ModalInputSearchLocation
              value={location_tab_store.formatted_address}
              onTouchStart={openSearchLocation}
              isVisible={isShowSearchLocation}
              onRequestClose={toggleSearchLocation}
              onPickupLocation={onHandleChangeMyLocation}
              onCancel={clearMyLocation}
            />
          </Animatable.View>
        )}
      </Animated.View>

      {isTabActive == 0 && <TabFavourite data={loading_store ? placeholders : favourite_stores} />}
      {(isTabActive == 1 || isTabActive == 2) && <TabNearMe data={store_tab_near} />}

      {isTabActive == 0 && (
        <ModalBottomSelect2
          title="Sort by"
          isVisible={isVisible}
          onRequestClose={onShowModal}
          onCloseModal={onShowModal}
          data={FILTERS_FAVOURITE}
          onSelect={onChangeFavoriteStore}
          value={filter_favourite_store}
          renderItem={(item) => <Item item={item} />}
          isFilterFavouriteStore={true}
        />
      )}

      {(isTabActive == 1 || isTabActive == 2) && (
        <ModalFilterList
          isVisible={isVisible}
          onRequestClose={onShowModal}
          onCloseModal={onShowModal}
          data={FILTERS_FAVOURITE}
          onSelect={onChangeNearStore}
          value={filter_near_store}
        />
      )}

      <SearchList
        isVisible={isShowSearchList}
        onRequestClose={onShowSearchList}
        onSubmit={onSubmit}
        onClearData={clearSearchList}
        closeSearchList={closeSearchList}
        storeFavouriteSearch={storeFavouriteSearch}
        storeNearSearch={storeNearSearch}
        storeSearch={storeSearch}
      />
    </View>
  );
}
