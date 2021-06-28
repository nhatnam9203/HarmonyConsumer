import React from "react";
import { View, StyleSheet, TouchableOpacity, TextInput, Animated, Platform } from "react-native";
import Modal from "react-native-translucent-modal";
import { scaleWidth, scaleHeight, slop } from "utils";
import AntDesign from "react-native-vector-icons/AntDesign";
import * as RootNavigation from "navigations/RootNavigation";
import { useDispatch } from "react-redux";
import actions from "@redux/actions";
import TopComponent from "./TopComponent";
import SearchResult from "./SearchResult";
import images from "assets";
import { Text } from "components";

export default function Banner(props) {
  const dispatch = useDispatch();

  const [isSearch, setIsSearch] = React.useState(false);
  const [valueSearch, setValueSearch] = React.useState("");
  const {
    idEditAppointment,
    tabActive,
    setTabActive,
    scrollY,
    translateY_listTime,
    isOpenListTime,
    isScrollY,
    measureCategory,
    isAddmore,
  } = props;

  const AnimatedText = Animated.createAnimatedComponent(Text);

  const refInput = React.useRef(null);

  const opacityStoreName = scrollY.interpolate({
    inputRange: [0, scaleHeight(25)],
    outputRange: [0, 1],
    extrapolate: "clamp",
  });

  const background = scrollY.interpolate({
    inputRange: [0, scaleHeight(25)],
    outputRange: ["transparent", "white"],
    extrapolate: "clamp",
  });

  const tintColorIcon = scrollY.interpolate({
    inputRange: [0, scaleHeight(25)],
    outputRange: ["white", "#404040"],
    extrapolate: "clamp",
  });

  const colorSearch = scrollY.interpolate({
    inputRange: [0, scaleHeight(25)],
    outputRange: ["#787777", "transparent"],
    extrapolate: "clamp",
  });

  const toggleContainerSearch = () => {
    setIsSearch(!isSearch);
  };

  const closePopupSearch = () => {
    setIsSearch(false);
    setTimeout(() => {
      setValueSearch("");
    }, 1000);
  };

  const openPopupSearch = () => {
    setIsSearch(true);
    setTimeout(() => {
      refInput?.current?.focus();
    }, 300);
  };

  const back = () => {
    if (isAddmore) {
      RootNavigation.navigate("Review");
      setTimeout(() => {
        dispatch(actions.bookingAction.setAddmore(false));
      }, 400);
    } else {
      if (!idEditAppointment) {
        dispatch(actions.bookingAction.resetBooking());
      }
      RootNavigation.back();
    }
  };

  const onChangeSearchValue = (text) => {
    setValueSearch(text);
  };

  function renderIconBanner() {
    const { businessName } = props.merchant;
    return (
      <Animated.View style={[styles.container]}>
        <Animated.View style={[styles.rowSearch(background)]}>
          <TouchableOpacity onPress={back} style={styles.btnBack}>
            <Animated.View style={styles.wrapSearch(colorSearch)}>
              <Animated.Image source={images.icon_back} style={styles.iconBack(tintColorIcon)} />
            </Animated.View>
            <AnimatedText fontFamily="medium" style={[styles.storeName(opacityStoreName)]}>
              {`${businessName}`}
            </AnimatedText>
          </TouchableOpacity>
          <TouchableOpacity onPress={openPopupSearch} hitSlop={slop}>
            <Animated.View style={styles.wrapSearch(colorSearch)}>
              <Animated.Image source={images.searchbar} style={styles.iconSearch(tintColorIcon)} />
            </Animated.View>
          </TouchableOpacity>
        </Animated.View>

        <TopComponent
          scrollY={scrollY}
          tabActive={tabActive}
          setTabActive={setTabActive}
          translateY_listTime={translateY_listTime}
          isOpenListTime={isOpenListTime}
          isScrollY={isScrollY}
          isBottom={false}
          measureCategory={measureCategory}
        />
      </Animated.View>
    );
  }

  function renderSearchBar() {
    return (
      <Modal
        animationType="slide"
        style={{ flex: 1 }}
        onRequestClose={() => setIsSearch(false)}
        isVisible={isSearch}>
        <View style={styles.containerSearch}>
          <View style={styles.wrapInputSearch}>
            <TouchableOpacity onPress={toggleContainerSearch} hitSlop={slop}>
              <AntDesign name="close" color="#585858" size={scaleWidth(5.5)} />
            </TouchableOpacity>
            <View style={styles.containerInput}>
              <TextInput
                placeholder="Search..."
                placeholderTextColor="#646464"
                value={valueSearch}
                autoCapitalize={"none"}
                onChangeText={onChangeSearchValue}
                style={styles.textInput}
                ref={refInput}
              />
              <TouchableOpacity activeOpacity={1} disabled={true} hitSlop={slop}>
                <AntDesign name="search1" color={"#585858"} size={scaleWidth(5)} />
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.overlay}>
            <SearchResult valueSearch={valueSearch} closePopupSearch={closePopupSearch} />
          </View>
        </View>
      </Modal>
    );
  }

  return (
    <React.Fragment>
      {!isSearch && renderIconBanner()}
      {isSearch && renderSearchBar()}
    </React.Fragment>
  );
}

const styles = StyleSheet.create({
  imgBanner: {
    width: scaleWidth(100),
    height: scaleHeight(30),
  },
  container: {
    position: "absolute",
    top: 0,
    zIndex: 1,
    backgroundColor: "transparent",
  },
  rowSearch: (background) => {
    return {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      width: scaleWidth(100),
      paddingHorizontal: scaleWidth(3),
      paddingTop: scaleHeight(5),
      backgroundColor: background,
    };
  },
  containerSearch: {
    position: "absolute",
    top: 0,
    width: "100%",
    zIndex: 1,
  },
  wrapInputSearch: {
    backgroundColor: "#F8F8F8",
    paddingHorizontal: scaleWidth(3),
    paddingBottom: scaleHeight(1.5),
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: scaleHeight(5),
  },
  overlay: {
    width: scaleWidth(100),
    height: scaleHeight(100),
    backgroundColor: "rgba(0,0,0,0.6)",
  },
  wrapSearch: (colorSearch) => {
    return {
      width: scaleWidth(8),
      height: scaleWidth(8),
      justifyContent: "center",
      alignItems: "center",
      borderRadius: 300,
      backgroundColor: colorSearch,
    };
  },
  textInput: {
    fontSize: scaleWidth(4),
    color: "#333",
    flex: 1,
  },
  containerInput: {
    width: scaleWidth(85),
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderWidth: 1,
    borderColor: "#DDDDDD",
    borderRadius: 5,
    padding: scaleWidth(2),
    paddingVertical: Platform.OS === "ios" ? scaleWidth(2) : 0,
  },
  storeName: (opacityStoreName) => {
    return {
      color: "#0764B0",
      fontSize: scaleWidth(4.8),
      marginLeft: scaleWidth(3),
      opacity: opacityStoreName,
    };
  },
  iconBack: (tintColorIcon) => {
    return {
      width: scaleWidth(8),
      height: scaleWidth(8),
      tintColor: tintColorIcon,
    };
  },
  iconSearch: (tintColorIcon) => {
    return {
      width: scaleWidth(4.5),
      height: scaleWidth(4.5),
      tintColor: tintColorIcon,
    };
  },
  btnBack: {
    flexDirection: "row",
    alignItems: "center",
  },
});
