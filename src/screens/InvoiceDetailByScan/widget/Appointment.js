import React from "react";
import { StyleSheet, View, Image } from "react-native";
import { Collapse, CollapseHeader, CollapseBody } from "accordion-collapse-react-native";

import { Text } from "components";
import { scaleSize } from "utils";
import ICONS from "assets";
import Item from "./Item";
export default function Appointment({ item }) {
  const { services, products, extras, code, firstName, lastName } = item;
  let fullName = firstName + lastName;

  return (
    <Collapse style={styles.container} isCollapsed={true}>
      <CollapseHeader>
        <View style={styles.header}>
          <Text fontSize={15} fontFamily="bold">
            #{code} - {fullName}
          </Text>
          <Image source={ICONS["arrow_down"]} style={styles.icons} />
        </View>
      </CollapseHeader>

      <CollapseBody>
        {services && <ServiceList data={services} />}
        {products && <ProductList data={products} />}
        {extras && <ExtraList data={extras} />}
      </CollapseBody>
    </Collapse>
  );
}

const ServiceList = ({ data }) => {
  return data.map((service, index) => {
    const {
      data: { name, price },
    } = service;
    return <Item key={index + ""} name={name} amount={price} />;
  });
};

const ProductList = ({ data }) => {
  return data.map((product, index) => {
    const {
      data: { name, price },
      quantity,
    } = product;
    return <Item key={index + ""} name={name} amount={price} quantity={quantity} />;
  });
};

const ExtraList = ({ data }) => {
  return data.map((extra, index) => {
    const {
      data: { name, price },
    } = extra;
    return <Item key={index + ""} name={name} amount={price} />;
  });
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
    height: scaleSize(40),
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderTopWidth: 0.4,
    borderTopColor: "#585858",
    marginTop: scaleSize(20),
  },
});
