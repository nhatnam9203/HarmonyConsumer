import React from "react";
import { View, TouchableOpacity } from "react-native";
import { Text, LazyImage, ProgressiveImage } from "components";
import images from "assets";
import { scaleWidth, slop } from "utils";
import Swipeout from "react-native-swipeout";
import Ionicons from "react-native-vector-icons/Ionicons";
import actions from "@redux/actions";
import { useDispatch } from "react-redux";
import styles from "./styles";

export default function Product({ sv, renderImg, deleteItem, isDisabled }) {
  const dispatch = useDispatch();
  const swipeoutBtns = [
    {
      backgroundColor: "#ffffff",
      component: (
        <TouchableOpacity onPress={() => deleteItem(sv, "product")} style={styles.buttonDelete}>
          <Ionicons name="trash-bin" color="white" size={scaleWidth(6)} />
        </TouchableOpacity>
      ),
    },
  ];

  const updateQty = (type) => {
    dispatch(actions.bookingAction.checkEdit(true));
    if (type) {
      let product_update = {};
      switch (type) {
        case "minus":
          if (sv.quantity > 1) {
            product_update = {
              ...sv,
              quantity: sv.quantity - 1,
            };
            dispatch(actions.bookingAction.updateQuantityInCart(product_update));
          }
          break;

        case "plus":
          product_update = {
            ...sv,
            quantity: sv.quantity + 1,
          };
          dispatch(actions.bookingAction.updateQuantityInCart(product_update));
          break;

        default:
          break;
      }
    }
  };

  const price = parseFloat(parseFloat(sv.price.toString().replace(",", "")) * sv.quantity).toFixed(
    2,
  );
  const name = sv.name ? sv.name : sv.productName;

  return (
    <Swipeout
      style={styles.topItem}
      key={"productCart" + sv.productId}
      backgroundColor="white"
      disabled={isDisabled == 1}
      right={swipeoutBtns}>
      <View style={styles.containerItem}>
        <ImageItem renderImg={renderImg} />
        <View style={styles.rowProduct}>
          <Text fontFamily="medium" style={styles.name}>
            {`${name}`}
          </Text>
          <View style={styles.row}>
            <Quantity isDisabled={isDisabled} qty={sv.quantity} updateQty={updateQty} />
            <Text style={[styles.txtDuration, styles.txtPrice]}>{`$ ${price}`}</Text>
          </View>
        </View>
      </View>
    </Swipeout>
  );
}

const ImageItem = React.memo(({ renderImg }) => (
  <ProgressiveImage
    thumbnailSource={images["service_holder"]}
    source={renderImg}
    style={styles.imgService}
    containerStyle={{ backgroundColor: "transparent" }}
  />
));

const Quantity = ({ qty, updateQty, isDisabled }) => {
  return (
    <View style={styles.rowQty}>
      <View style={styles.rowButton}>
        <TouchableOpacity
          disabled={qty <= 1}
          hitSlop={slop}
          disabled={isDisabled == 1}
          onPress={() => updateQty("minus")}
          style={styles.btnQty(qty)}>
          <Text style={styles.txtBtnQty(qty)}>-</Text>
        </TouchableOpacity>
        <Text style={styles.txtQty}>{qty}</Text>
        <TouchableOpacity
          disabled={isDisabled == 1}
          hitSlop={slop}
          onPress={() => updateQty("plus")}
          style={styles.btnQty(2)}>
          <Text style={styles.txtBtnQty(2)}>+</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
