import React from "react";
import { StyleSheet } from "react-native";
import { Text } from "components";
import images from "assets";
import { scaleHeight, scaleWidth } from "utils";
import Product from "./Product";
import Service from "./Servivce";

export default function ItemList(props) {
  const { services = [], products = [], extras = [], setLoading, status } = props;

  function renderProducts() {
    let data = products.sort(function (a, b) {
      var c = a.bookingProductId;
      var d = b.bookingProductId;
      return c - d;
    });

    return data.map((pro) => {
      const renderImg = pro.imageUrl ? { uri: pro.imageUrl } : images.service_holder;
      return (
        <Product
          setLoading={setLoading}
          key={pro.productId + "pro" + new Date() + Math.random()}
          sv={pro}
          renderImg={renderImg}
          status={status}
        />
      );
    });
  }

  function renderServices() {
    let data = services.sort(function (a, b) {
      var c = a.bookingServiceId;
      var d = b.bookingServiceId;
      return c - d;
    });

    return data.map((sv) => {
      const renderImg = sv.imageUrl ? { uri: sv.imageUrl } : images.service_holder;
      return (
        <Service
          sv={sv}
          extras={extras}
          renderImg={renderImg}
          key={sv.serviceId + "service" + new Date() + Math.random()}
        />
      );
    });
  }

  return (
    <>
      <Text style={styles.title}>Services & Products</Text>
      {renderServices()}
      {renderProducts()}
    </>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: scaleWidth(4.5),
    color: "#404040",
    marginBottom: scaleHeight(1),
    marginTop: scaleHeight(2.5),
  },
});
