import React from "react";
import { StyleSheet, View, ActivityIndicator, Dimensions } from "react-native";
import MapView from "react-native-maps";
import Carousel from "react-native-snap-carousel";

import { ItemCard } from "components";
import { scaleSize, scaleHeight } from "utils";
import Marker from "./Marker";
import * as RootNavigation from "navigations/RootNavigation";

import actions from "@redux/actions";
import { useDispatch, useSelector } from "react-redux";

const { width } = Dimensions.get("window");
const CARD_WIDTH = 350;

const location_address = {
  latitude: 10.75475,
  longitude: 106.647537,
  latitudeDelta: 0.049,
  longitudeDelta: 0.04,
};

const adapterLocation = (location) => {
  return {
    latitude: parseFloat(location.lat),
    longitude: parseFloat(location.lng),
    latitudeDelta: 0.049,
    longitudeDelta: 0.04,
  };
};

export default function index({ data }) {
  const dispatch = useDispatch();
  const { token, location_tab_store } = useSelector((state) => state.datalocalReducer);
  const coordinate_map = location_tab_store?.location
    ? adapterLocation(location_tab_store.location)
    : location_address;

  const { latitude, longitude } = coordinate_map;

  const _map = React.useRef(null);
  const [indexItem, setIndex] = React.useState(0);
  const [loading_map, setLoading] = React.useState(false);

  React.useEffect(() => {
    snapToCurrentLocationTabNear();
  }, [latitude, longitude]);

  const snapToCurrentLocationTabNear = () => {
    _map.current?.animateToRegion(
      {
        latitude,
        longitude,
        latitudeDelta: 0.049,
        longitudeDelta: 0.04,
      },
      350,
    );
  };

  const snapToItem = (index) => {
    const { latitude, longitude } = data[index];
    setIndex(index);
    const coordinate = {
      latitude: +latitude,
      longitude: +longitude,
    };
    if (latitude && longitude) {
      _map.current.animateToRegion(
        {
          ...coordinate,
          latitudeDelta: 0.049,
          longitudeDelta: 0.04,
        },
        350,
      );
    }
  };

  React.useEffect(() => {
    setTimeout(() => {
      setLoading(true);
    }, 500);
  }, []);

  const navigateToStoreDetail = (merchant) => {
    const { merchantId } = merchant;
    dispatch(actions.storeAction.setDetailMerchant(merchant));
    dispatch(actions.storeAction.getDetailMerchant(merchantId, token));
    dispatch(actions.bookingAction.resetBooking());

    RootNavigation.navigate("BookAppointmentStack", {
      screen: "StoreDetail",
      params: { merchantId },
    });
  };

  return (
    <View style={{ flex: 1, marginTop: scaleSize(3) }}>
      {loading_map ? (
        <MapView
          ref={_map}
          style={styles.map}
          initialRegion={coordinate_map}>
          {data.map((marker, index) => {
            const coordinate = {
              latitude: +marker.latitude,
              longitude: +marker.longitude,
            };
            const scaleStyle = {
              transform: [
                {
                  scale: index == indexItem ? 1.5 : 1,
                },
              ],
            };
            const showBadget = index == indexItem ? true : false;
            return (
              <Marker
                key={index + ""}
                coordinate={coordinate}
                rating={marker.rating}
                style={scaleStyle}
                showBadget={showBadget}
              />
            );
          })}
        </MapView>
      ) : (
        <View style={{ paddingTop: scaleSize(15) }}>
          <ActivityIndicator animating={true} color="#0764b0" size="large" />
        </View>
      )}

      <View style={styles.scrollView}>
        <Carousel
          snapToAlignment="center"
          pagingEnabled
          data={data}
          renderItem={({ item, index }) => (
            <ItemCard style={{ borderRadius: 5 }} onPress={navigateToStoreDetail} item={item} />
          )}
          sliderWidth={width}
          itemWidth={scaleSize(CARD_WIDTH)}
          onSnapToItem={(slideIndex) => snapToItem(slideIndex)}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  map: {
    width: "100%",
    height: "100%",
  },
  contentContainerFlatList: {
    alignItems: "center",
    paddingVertical: scaleSize(20),
  },
  title: {
    fontWeight: "700",
    color: "#404040",
  },
  container_title: {
    justifyContent: "center",
    width: scaleSize(382),
    marginBottom: scaleSize(20),
  },
  scrollView: {
    position: "absolute",
    bottom: scaleSize(10),
    left: 0,
    right: 0,
  },
});
