import React from "react";
import { View, ScrollView, Animated } from "react-native";
import { Text, ProgressiveImage } from "components";
import Extras from "./Extras";
import InfoItem from "./InfoItem";
import ButtonBook from "./ButtonBook";
import ButtonBack from "./ButtonBack";
import Total from "./Total";
import styles from "./styles";
import { scaleHeight } from "utils";
import useHook from "./hook";
import images from "assets";

export default function index(props) {
  const [
    scrollY,
    renderImgItem,
    qty,
    plusQty,
    minusQty,
    item,
    selectExtra,
    tempExtras,
    back,
    isHaveService,
    book,
  ] = useHook(props);

  const renderNoExtra = () => {
    return <Text style={styles.noExtra}>No extra service.</Text>;
  };

  return (
    <View style={styles.container}>
      <ScrollView
        bounces={false}
        onScroll={Animated.event(
          [
            {
              nativeEvent: {
                contentOffset: {
                  y: scrollY,
                },
              },
            },
          ],
          {
            useNativeDriver: false,
          },
        )}
        showsVerticalScrollIndicator={false}>
        <ProgressiveImage
          resizeMode="cover"
          style={[styles.image]}
          source={renderImgItem}
          thumbnailSource={images["service_holder"]}
          containerStyle={{ backgroundColor: "transparent" }}
        />

        <View style={styles.body}>
          <InfoItem qty={qty} plusQty={plusQty} minusQty={minusQty} item={item} />

          {item.serviceId && (
            <Text fontFamily="medium" style={styles.title}>
              Extra services
            </Text>
          )}
          {((item.serviceId && item.extras && item.extras.length === 0) ||
            (item.serviceId && !item.extras)) &&
            renderNoExtra()}

          {item.serviceId && item.extras && item.extras.length > 0 && (
            <Extras
              addExtra={selectExtra}
              service={item}
              tempExtras={tempExtras}
              extras={item.serviceId && item.extras && item.extras.length > 0 ? item.extras : []}
            />
          )}
        </View>

        {((item.serviceId && item.extras && item.extras.length > 0) || item.productId) && (
          <Total
            services={item}
            qty={qty}
            tempExtras={tempExtras}
            extras={item.serviceId && item.extras && item.extras.length > 0 ? item.extras : []}
          />
        )}
        <View style={{ height: scaleHeight(30) }} />
      </ScrollView>
      <ButtonBack onPress={back} />
      <ButtonBook isHaveService={isHaveService} onPress={() => book(item)} />
    </View>
  );
}
