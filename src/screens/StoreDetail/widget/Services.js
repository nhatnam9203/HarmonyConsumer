import React from "react";
import { View, StyleSheet } from "react-native";
import { Text } from "components";
import { scaleWidth, scaleHeight } from "utils";
import Item from "./Item";
import ItemHolder from "./ItemHolder";

function Services(props) {
  const {
    services = [],
    products = [],
    category = [],
    isLoadingCategory,
    isLoadingService,
    updateMeasureServiceProduct,
    tabActive,
  } = props;

  function renderListItem(listItem) {
    return listItem
      .filter((obj) => obj.isDisabled === 0 && obj.isDeleted === 0)
      .map((obj, index) => {
        return (
          <Item item={obj} name={obj.name} duration={obj.duration} price={obj.price} key={index} />
        );
      });
  }

  function renderLoading() {
    return (
      <View style={{ paddingTop: scaleHeight(2) }}>
        {new Array(10).fill().map(() => (
          <ItemHolder key={Math.random()} />
        ))}
      </View>
    );
  }

  function renderOffsetList(servicesCount, productsCount) {
    if (
      (servicesCount >= 6 && tabActive === "Services") ||
      (productsCount >= 6 && tabActive === "Products")
    ) {
      return <View style={{ height: scaleHeight(35) }} />;
    }

    if (
      (servicesCount > 3 && servicesCount <= 5 && tabActive === "Services") ||
      (productsCount > 3 && productsCount <= 5 && tabActive === "Products")
    ) {
      return <View style={{ height: scaleHeight(35) }} />;
    }

    if (
      (servicesCount === 3 && tabActive === "Services") ||
      (productsCount === 3 && tabActive === "Products")
    ) {
      return <View style={{ height: scaleHeight(60) }} />;
    }

    if (
      (servicesCount === 1 && tabActive === "Services") ||
      (productsCount === 1 && tabActive === "Products")
    ) {
      return <View style={{ height: scaleHeight(80) }} />;
    }

    if (
      (servicesCount === 2 && tabActive === "Services") ||
      (productsCount === 2 && tabActive === "Products")
    ) {
      return <View style={{ height: scaleHeight(80) }} />;
    }

    return null;
  }

  function renderCategory() {
    let servicesCount = 0,
      productsCount = 0;
    if (!isLoadingService && !isLoadingCategory)
      return (
        <View style={styles.container}>
          {category
            .filter((obj) => obj.isDisabled === 0 && obj.isDeleted === 0)
            .map((obj, index) => {
              let services_render = services.filter((sv) => sv.categoryId === obj.categoryId);
              let products_render = products.filter((pro) => pro.categoryId === obj.categoryId);

              servicesCount += services_render.length;
              productsCount += products_render.length;

              return (
                <View
                  onLayout={(e) => {
                    updateMeasureServiceProduct(e, index, obj, "service");
                  }}
                  style={styles.wrap}
                  key={index + "itemGroup"}>
                  <Text fontFamily="medium" style={styles.txtTitle}>
                    {obj.name}
                  </Text>
                  {renderListItem(services_render)}
                  {renderListItem(products_render)}
                </View>
              );
            })}
          {renderOffsetList(servicesCount, productsCount)}
        </View>
      );
    else return renderLoading();
    return null;
  }

  return <View style={styles.container}>{renderCategory()}</View>;
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: scaleWidth(2),
    paddingTop: scaleHeight(1.5),
    zIndex: 1,
  },
  txtTitle: {
    color: "#404040",
    fontSize: scaleWidth(5),
    letterSpacing: 0.3,
    marginBottom: scaleHeight(2),
  },
  wrap: {},
});

export default React.memo(Services);
