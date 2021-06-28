import React from "react";
import { StyleSheet, View, Dimensions, Image, TouchableOpacity } from "react-native";
import { Text, Button, RadioButton } from "components";
import ICONS from "assets";
import { scaleSize } from "utils";
import { Modalize } from "react-native-modalize";
import { useDispatch } from "react-redux";
import actions from "@redux/actions";
const { width } = Dimensions.get("window");

export default function ModalFilterList({
  isVisible,
  onRequestClose,
  data,
  onSelect,
  value,
  onCloseModal = () => {},
}) {
  const dispatch = useDispatch();
  const [filter, setFilter] = React.useState("Beauty");

  React.useEffect(() => {
    if (isVisible === true) {
      openModal();
    } else {
      closeModal();
    }
    dispatch(actions.generalAction.toggleBottomTabbar(isVisible));
  }, [isVisible]);

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

  const handleOnChangeValue = (index, item) => () => {
    onSelect(index, item);
  };

  const onHandleSelectFilter = (name) => () => {
    setFilter(name);
  };

  const ButtonFilter = ({ title, icon }) => {
    const active_text = title == filter ? "#FFFF" : "#404040";
    const active_background = title == filter ? "#0764b0" : "#FFFF";
    const active_color_image = title == filter ? "#FFFF" : "#404040";
    return (
      <Button
        onPress={onHandleSelectFilter(title)}
        style={[styles.button_filter, { backgroundColor: active_background }]}>
        <Image source={icon} style={[styles.icon_filter, { tintColor: active_color_image }]} />

        <Text fontSize={17} color={active_text}>
          {title}
        </Text>
      </Button>
    );
  };

  const SortList = () => {
    return data.map((item, index) => {
      return (
        <TouchableOpacity
          onPress={handleOnChangeValue(index, item)}
          key={index + ""}
          style={styles.container_item}>
          <Text fontSize={17} style={{ fontWeight: "700", marginLeft: 5 }}>
            {item.name}
          </Text>

          <RadioButton
            onChangeValue={handleOnChangeValue(index, item)}
            active={value == item.value ? true : false}
          />
        </TouchableOpacity>
      );
    });
  };

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
      <View style={styles.container}>
        <View style={styles.container_header}>
          <Text fontSize={20} style={{ fontWeight: "bold" }}>
            Filter
          </Text>

          <Button style={styles.container_close} onPress={onRequestClose}>
            <Image source={ICONS["close_header"]} style={styles.image} />
          </Button>
        </View>

        <View style={styles.container_button_filter}>
          <ButtonFilter title="Beauty" icon={ICONS["beauty_merchant"]} />
          {/* <ButtonFilter title='Restaurant' icon={ICONS["restaurant_merchant"]} /> */}
          <Text fontSize={15} color="#888888" style={styles.txt_commingsoon}>
            Coming soon
          </Text>
        </View>

        <View style={styles.title}>
          <Text fontSize={20} style={{ fontWeight: "bold" }}>
            Sort by
          </Text>
        </View>

        <SortList />
      </View>
    </Modalize>
  );
}

const styles = StyleSheet.create({
  container: {
    width,
    backgroundColor: "#FFFF",
    alignItems: "center",
    borderRadius: scaleSize(5),
    paddingHorizontal: scaleSize(16),
    paddingTop: scaleSize(15),
    paddingBottom: scaleSize(15),
  },

  container_header: {
    width: "100%",
    height: scaleSize(40),
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  line: {
    borderBottomWidth: 6,
    borderBottomColor: "red",
    marginTop: scaleSize(10),
  },

  container_item: {
    width,
    height: scaleSize(50),
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    paddingHorizontal: scaleSize(16),
  },

  image: {
    width: scaleSize(17),
    height: scaleSize(17),
    resizeMode: "contain",
  },
  title: {
    alignSelf: "flex-start",
    marginVertical: scaleSize(16),
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

  container_button_filter: {
    width,
    marginVertical: scaleSize(15),
    paddingHorizontal: scaleSize(16),
  },

  button_filter: {
    width: scaleSize(122),
    height: scaleSize(32),
    borderRadius: scaleSize(20),
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#dddddd",
    marginTop: scaleSize(16),
  },
  icon_filter: {
    width: scaleSize(20),
    height: scaleSize(20),
    marginRight: scaleSize(10),
  },
  container_close: {},
  txt_commingsoon: {
    position: "absolute",
    bottom: scaleSize(7),
    left: scaleSize(166),
  },
});
