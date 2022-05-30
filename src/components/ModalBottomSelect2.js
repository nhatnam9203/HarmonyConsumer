import React from "react";
import { StyleSheet, View, Dimensions, Image, TouchableOpacity } from "react-native";
import { Text, Button, RadioButton } from "components";
import ICONS from "assets";
import { scaleSize } from "utils";
import { Modalize } from "react-native-modalize";
import { useDispatch } from "react-redux";
import actions from "@redux/actions";

const { width } = Dimensions.get("window");
const HEIGHT_HEADER = 50;

export default function ModalBottomSelect({
  isVisible,
  onRequestClose,
  data,
  onSelect,
  value,
  title,
  renderItem,
  isFilterFavouriteStore,
  onCloseModal = () => {},
}) {
  const dispatch = useDispatch();

  const modalizeRef = React.useRef(null);

  const openModal = () => {
    modalizeRef.current?.open();
  };

  const closeModal = () => {
    modalizeRef.current?.close();
  };

  const onClosed = () => {
    if (isVisible) onCloseModal();
  };

  React.useEffect(() => {
    if (isVisible === true) {
      openModal();
    } else {
      closeModal();
    }
    dispatch(actions.generalAction.toggleBottomTabbar(isVisible));
  }, [isVisible]);

  const handleOnChangeValue = (index, item) => () => {
    onSelect(index, item);
  };

  const height_item = data.length > 1 ? data.length * 50 : 120;
  return (
    <Modalize
      overlayStyle={{
        backgroundColor: "rgba(0,0,0,0.4)",
      }}
      modalStyle={{
        backgroundColor: "transparent",
      }}
      adjustToContentHeight
      onBackButtonPress={closeModal}
      onClosed={onClosed}
      ref={modalizeRef}>
      <View
        style={[
          styles.container,
          {
            height: scaleSize(HEIGHT_HEADER + 35 + height_item),
          },
        ]}>
        <View style={styles.container_header}>
          <Text fontSize={20} style={{ fontWeight: "bold" }}>
            {title}
          </Text>

          <Button onPress={onRequestClose}>
            <Image source={ICONS["close_header"]} style={styles.image} />
          </Button>
        </View>

        <View style={{ flex: 1 }}>
          {data.map((item, index) => {
            return (
              <TouchableOpacity
                onPress={handleOnChangeValue(index, item)}
                key={index + ""}
                style={styles.container_item}>
                {renderItem(item, index)}
                <RadioButton
                  onChangeValue={handleOnChangeValue(index, item)}
                  active={
                    isFilterFavouriteStore
                      ? value == item.value
                        ? true
                        : false
                      : value == item
                      ? true
                      : false
                  }
                />
              </TouchableOpacity>
            );
          })}
        </View>
      </View>
    </Modalize>
  );
}

const styles = StyleSheet.create({
  container: {
    width: width,
    backgroundColor: "#FFFF",
    alignItems: "center",
    borderRadius: scaleSize(5),
    justifyContent: "space-between",
  },

  container_header: {
    width: "100%",
    borderBottomWidth: 1,
    borderColor: "#EEEEEE",
    paddingHorizontal: scaleSize(13),
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: scaleSize(20),
  },

  container_item: {
    width,
    height: scaleSize(50),
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    paddingHorizontal: scaleSize(12),
  },

  image: {
    width: scaleSize(17),
    height: scaleSize(17),
    resizeMode: "contain",
  },
  title: {
    fontWeight: "500",
    // marginVertical: scaleSize(20)
  },
  container_content: {
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: scaleSize(20),
  },
  text_content: {
    textAlign: "center",
    lineHeight: scaleSize(20),
  },
});
