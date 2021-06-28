import React from "react";
import { View, StyleSheet, ScrollView, Platform } from "react-native";
import { scaleWidth, scaleHeight } from "utils";
import { Text } from "components";
import { useSelector } from "react-redux";
import Item from "./Item";

export default function SearchResult({ valueSearch, closePopupSearch }) {
  const { services, products } = useSelector((state) => state.appointmentReducer);

  let services_search = services.filter((sv) => {
    return (
      sv.name.trim().toLowerCase().indexOf(valueSearch.toLowerCase()) !== -1 && valueSearch !== ""
    );
  });

  let products_search = products.filter((pro) => {
    return (
      pro.name.trim().toLowerCase().indexOf(valueSearch.toLowerCase()) !== -1 && valueSearch !== ""
    );
  });

  function renderServices() {
    if (services_search.length > 0)
      return (
        <View>
          <Text style={styles.title}>Service</Text>
          {services_search.map((obj) => {
            return (
              <Item
                item={obj}
                name={obj.name}
                duration={obj.duration}
                price={obj.price}
                key={obj.serviceId + "service"}
                closePopupSearch={closePopupSearch}
              />
            );
          })}
        </View>
      );
    return null;
  }

  function renderProducts() {
    if (products_search.length > 0)
      return (
        <View>
          <Text style={styles.title}>Product</Text>
          {products_search.map((obj) => {
            return (
              <Item
                item={obj}
                name={obj.name}
                duration={obj.duration}
                price={obj.price}
                key={obj.productId + "product"}
                closePopupSearch={closePopupSearch}
              />
            );
          })}
        </View>
      );
    return null;
  }

  return (
    <View style={styles.container(services_search, products_search)}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {services_search.length + products_search.length > 0 && (
          <Text style={styles.txtRedsult}>Search result </Text>
        )}
        {renderServices()}
        {renderProducts()}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: () => {
    return {
      flex: 1,
      zIndex: 1,
      // backgroundColor: services_search.length + products_search.length > 0 ? "#f8f8f8" : "transparent",
      backgroundColor: "#f8f8f8",
      paddingHorizontal: scaleWidth(3),
      paddingTop: scaleWidth(3),
    };
  },
  title: {
    fontSize: scaleWidth(4.7),
    color: "#404040",
    fontWeight: Platform.OS === "android" ? "bold" : "600",
    marginBottom: scaleHeight(1.5),
  },
  txtRedsult: {
    fontSize: scaleWidth(4.3),
    color: "#404040",
    marginBottom: scaleHeight(2),
  },
});
