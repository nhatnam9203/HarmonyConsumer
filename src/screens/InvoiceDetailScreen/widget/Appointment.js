import React from "react";
import { StyleSheet, View, Image } from "react-native";
import { Collapse, CollapseHeader, CollapseBody } from "accordion-collapse-react-native";

import { Text } from "components";
import { scaleSize } from "utils";
import ICONS from "assets";
import Item from "./Item";
import ItemGift from "./ItemGift";
export default function Appointment({ item }) {
  const {
    services = [],
    products = [],
    extras = [],
    giftCards = [],
    code,
    firstName,
    lastName,
    total,
    subTotal,
    tipAmount,
    discount,
    tax,
  } = item;

  return (
    <Collapse style={styles.container} isCollapsed={true}>
      <CollapseHeader>
        <View style={styles.header}>
          <Text fontSize={16.5} fontFamily="bold">
            #{code} - {firstName + " " + lastName}
          </Text>
          <Image source={ICONS["arrow_down"]} style={styles.icons} />
        </View>
      </CollapseHeader>

      <CollapseBody>
        {services && <ServiceList data={services} />}
        {products && <ProductList data={products} />}
        {extras && <ExtraList data={extras} />}
        {giftCards && <GiftCardList data={giftCards} />}

        <View style={styles.line} />
        <Total title="Subtotal" price={subTotal} />
        <Total title="Discount" price={discount} />
        <Total title="Tip" price={tipAmount} />
        <Total title="Tax" price={tax} />

        <View style={styles.line} />
        <Total title="Total" price={total} />
      </CollapseBody>
    </Collapse>
  );
}

const Total = ({ price, title }) => {
  return (
    <View style={styles.containerTotal}>
      <Text fontSize={17}>{title}</Text>
      <Text fontSize={17}>$ {price}</Text>
    </View>
  );
};

const ServiceList = ({ data }) => {
  return data.map((item, index) => (
    <Item key={index + ""} name={item.serviceName} amount={item.price} duration={item.duration} />
  ));
};

const ProductList = ({ data }) => {
  return data.map((item, index) => (
    <Item key={index + ""} name={item.productName} amount={item.price} quantity={item.quantity} />
  ));
};

const ExtraList = ({ data }) => {
  return data.map((item, index) => (
    <Item key={index + ""} name={item.extraName} amount={item.price} duration={item.duration} />
  ));
};

const GiftCardList = ({ data }) => {
  return data.map((item, index) => (
    <ItemGift
      key={index + ""}
      name={item.name}
      amount={item.price}
      quantity={item.quantity}
      imageUrl={item.imageUrl}
    />
  ));
};

const styles = StyleSheet.create({
  container: {
    marginTop: scaleSize(20),
  },
  header: {
    width: scaleSize(382),
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: scaleSize(7),
  },

  icons: {
    width: scaleSize(18),
    height: scaleSize(18),
    resizeMode: "contain",
  },

  content_text: {
    width: scaleSize(290),
    height: scaleSize(80),
    justifyContent: "space-between",
  },
  containerTotal: {
    width: scaleSize(382),
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: scaleSize(10),
  },
  line: {
    borderBottomWidth: 1,
    borderBottomColor: "#eeeeee",
    marginVertical: scaleSize(10),
  },
});
