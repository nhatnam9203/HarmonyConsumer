import React, { useState, useEffect, useCallback, useRef } from "react";
import { View } from "react-native";
import MapView from "react-native-maps";
import Marker from "./Marker";
import styles from "./styles";
import Header from "./Header";
import Direction from "./Direction";
import ListStoreSearch from "./ListStoreSearch";
import { useSelector, useDispatch } from "react-redux";
import actions from "@redux/actions";
import getDirections from "react-native-google-maps-directions";
import { debounce } from "utils";

export default function index(props) {
  const dispatch = useDispatch();

  const refMap = useRef(null);

  const [listStore, setListStore] = useState([]);

  const debounceSearch = useCallback(debounce(searchAPI, 400), []);

  const { current_location, token } = useSelector((state) => state.datalocalReducer);
  const { storeSelected, storeName } = useSelector((state) => state.storeReducer);

  const { rating } = storeSelected;
  const latitude = parseFloat(storeSelected.latitude);
  const longitude = parseFloat(storeSelected.longitude);
  const { formatted_address } = current_location;
  const { lat, lng } = current_location.location;

  const snapToItem = () => {
    if (latitude && longitude) {
      setTimeout(() => {
        refMap?.current?.animateToRegion(
          {
            latitude: latitude,
            longitude: longitude,
            latitudeDelta: 0.049,
            longitudeDelta: 0.04,
          },
          350,
        );
      }, 300);
    } else {
      alert(`Cannot found store's address , please contact HP Team Support !`);
    }
  };

  useEffect(() => {
    snapToItem();
  }, []);

  const onChangeStoreName = (text) => {
    if (text === "") {
      setListStore([]);
    }
    dispatch(actions.storeAction.onChangeStoreName(text));
    if (text.trim().length > 0) {
      debounceSearch(text);
    }
  };

  function searchAPI(text) {
    dispatch(actions.storeAction.search_store_list(text, token, searchResult));
  }

  const searchResult = (result) => {
    setListStore(result);
  };

  const selectStore = async (merchant) => {
    if (merchant.latitude && merchant.longitude) {
      dispatch(actions.storeAction.selectStore(merchant));
      await setListStore([]);
      refMap?.current?.animateToRegion(
        {
          latitude: parseFloat(merchant.latitude),
          longitude: parseFloat(merchant.longitude),
          latitudeDelta: 0.049,
          longitudeDelta: 0.04,
        },
        350,
      );
    } else {
      alert(`Cannot found store's address , please contact HP Team Support !`);
    }
  };

  const handleGetDirections = () => {
    const data = {
      source: {
        latitude,
        longitude,
      },
      destination: {
        latitude: parseFloat(lat),
        longitude: parseFloat(lng),
      },
      params: [
        {
          key: "travelmode",
          value: "driving",
        },
      ],
    };

    getDirections(data);
  };

  return (
    <View style={styles.container}>
      <Header storeName={storeName} onChangeStoreName={onChangeStoreName} />
      <View style={styles.body}>
        <MapView
          ref={refMap}
          style={styles.map}
          initialRegion={{
            latitude: 10.75475,
            longitude: 106.647537,
            latitudeDelta: 0.049,
            longitudeDelta: 0.04,
          }}>
          <Marker
            coordinate={{
              latitude,
              longitude,
            }}
            rating={rating}
            showBadget={true}
            storeSelected={storeSelected}
          />
        </MapView>
      </View>
      <Direction handleGetDirections={handleGetDirections} myAddress={formatted_address} />
      <ListStoreSearch storeName={storeName} selectStore={selectStore} listStore={listStore} />
    </View>
  );
}
