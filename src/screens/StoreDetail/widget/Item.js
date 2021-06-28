import React from "react";
import { View, StyleSheet, Platform, TouchableOpacity } from "react-native";
import { Text, LazyImage, ProgressiveImage } from "components";
import { scaleWidth, scaleHeight, convertMinsToHrsMins, scaleSize } from "utils";
import images from "assets";
import { useSelector } from "react-redux";
import * as RootNavigation from "navigations/RootNavigation";
import Image from "react-native-fast-image";

export default function Item(props) {
  const bookingReducer = useSelector((state) => state.bookingReducer);
  const { services, products } = bookingReducer;

  const { name, duration = "", price, item, closePopupSearch } = props;

  let isExist = false;

  if (item.productId) {
    const obj = products.find((obj) => obj.productId === item.productId);
    if (obj) isExist = true;
  }

  if (item.serviceId) {
    const obj = services.find((obj) => obj.serviceId === item.serviceId);
    if (obj) isExist = true;
  }

  const renderImg = item.imageUrl
    ? { uri: item.imageUrl, priority: Image.priority.high }
    : images.service_holder;

  const navigateToItemDetail = () => {
    closePopupSearch ? closePopupSearch() : () => {};
    RootNavigation.navigate("ItemAppointment", { item });
  };

  return (
    <TouchableOpacity
      key={Math.random() + item}
      disabled={isExist}
      onPress={navigateToItemDetail}
      activeOpacity={0.8}
      style={{ zIndex: 1 }}>
      <View style={[styles.serviceContainer, { opacity: isExist ? 0.5 : 1 }]}>
        <ServiceImage renderImg={renderImg} />
        <View style={styles.rightService}>
          <Name name={name} />
          <View style={styles.rowBottomServices}>
            {duration !== "" && <Duration duration={convertMinsToHrsMins(duration)} />}
            {duration === "" && <Text style={styles.duration}> </Text>}
            <Price price={price} />
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const ServiceImage = ({ renderImg }) => (
  <ProgressiveImage
    source={renderImg}
    style={styles.imgServices}
    resizeMode="cover"
    thumbnailSource={images["service_holder"]}
  />
);

const Name = ({ name }) => (
  <Text fontFamily="medium" style={styles.serviceName}>
    {name}
  </Text>
);

const Duration = ({ duration }) => (
  <Text fontFamily="medium" style={styles.duration}>
    {duration}
  </Text>
);

const Price = ({ price }) => <Text fontFamily="bold" style={styles.price}>{`$ ${price}`}</Text>;

const styles = StyleSheet.create({
  imgServices: {
    width: scaleSize(80),
    height: scaleSize(80),
    borderRadius: 3,
  },
  txtTitle: {
    color: "#404040",
    fontWeight: Platform.OS === "android" ? "bold" : "bold",
    fontSize: scaleWidth(5),
    marginVertical: scaleHeight(1.8),
  },
  rowBottomServices: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: scaleWidth(69),
  },
  rightService: {
    justifyContent: "space-between",
    marginLeft: scaleWidth(3),
  },
  serviceName: {
    color: "#0764B0",
    fontSize: scaleWidth(4.6),
    // fontWeight: Platform.OS === "android" ? "bold" : "600",
    width: scaleWidth(70),
  },
  duration: {
    color: "#6A6A6A",
    fontSize: scaleWidth(4.2),
  },
  price: {
    color: "#585858",
    fontSize: scaleWidth(4.2),
  },
  serviceContainer: {
    flexDirection: "row",
    paddingBottom: scaleHeight(1.7),
    marginBottom: scaleHeight(1.7),
    borderBottomWidth: 0.5,
    borderBottomColor: "#eeeeee",
  },
});
