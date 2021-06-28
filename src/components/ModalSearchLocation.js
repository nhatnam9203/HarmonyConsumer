import React from "react";
import { StyleSheet, Dimensions, Image, View } from "react-native";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
const { width } = Dimensions.get("window");
import { scaleSize } from "utils";
import ICONS from "assets";
import Modal from "./Modal";
import Text from "./Text";
import Button from "./Button";
import { useSelector } from "react-redux";
import { isArray } from "lodash";
import axios from "axios";
import { GOOGLE_API_KEY } from "utils";

export default function ModalSearchLocation({ isVisible, onRequestClose, onSelected }) {
  const refInputGoogle = React.useRef(null);
  const valueSearchLocationTabNear = useSelector(
    (state) => state.storeReducer.valueSearchLocationTabNear,
  );

  const onSubmit = () => {
    const listSearch = refInputGoogle?.current?.state.dataSource;
    if (isArray(listSearch) && listSearch.length > 0) {
      const firstAddress = { ...listSearch[0] };
      const { place_id } = firstAddress;
      const google_api_url = `https://maps.googleapis.com/maps/api/place/details/json?placeid=${place_id}&key=${GOOGLE_API_KEY}`;
      axios.get(google_api_url).then((response) => {
        if (response.status == 200 && response.data.result) {
          const detail = response.data.result;
          onSelected(null, detail);
        }
      });
    }
  };

  React.useEffect(() => {
    refInputGoogle?.current?.setAddressText(valueSearchLocationTabNear);
  }, [isVisible]);

  const LeftButton = () => (
    <Button onPress={onRequestClose}>
      <Image source={ICONS["arrow_back"]} style={styles.button_left} />
    </Button>
  );

  return (
    <Modal onRequestClose={onRequestClose} isVisible={isVisible} animationType="none">
      <View style={styles.container}>
        <GooglePlacesAutocomplete
          ref={refInputGoogle}
          placeholder="Search"
          autoFocus={true}
          fetchDetails={true}
          currentLocation={true}
          enablePoweredByContainer={false}
          keyboardShouldPersistTaps="handled"
          listEmptyComponent={listEmptyComponent}
          onSubmitEditing={onSubmit}
          debounce={1000}
          minLength={5}
          query={{
            key: GOOGLE_API_KEY,
            language: "en",
          }}
          onPress={onSelected}
          currentLocation={true}
          GooglePlacesDetailsQuery={{
            fields: ["formatted_address", "geometry"],
          }}
          styles={{
            textInputContainer: styles.textInputContainer,
            textInput: styles.textInput,
            container: {
              borderWidth: 0,
            },
            loader: {
              backgroundColor: "red",
            },
          }}
          renderLeftButton={LeftButton}
        />
      </View>
    </Modal>
  );
}

const listEmptyComponent = () => (
  <Text fontSize={16} color="#5d5d5d" style={{ textAlign: "center", paddingTop: scaleSize(15) }}>
    No results
  </Text>
);

const styles = StyleSheet.create({
  textInputContainer: {
    borderWidth: 0,
    borderColor: "red",
    width,
    height: scaleSize(55),
    paddingBottom: scaleSize(6),
    backgroundColor: "#eeeeee",
  },
  textInput: {
    color: "black",
    fontSize: scaleSize(16),
    alignSelf: "center",
    height: scaleSize(42),
    borderWidth: 0,
  },
  container: {
    flex: 1,
    paddingTop: scaleSize(40),
    backgroundColor: "#FFF",
    alignItems: "center",
    width: "100%",
  },
  button_left: {
    width: scaleSize(20),
    height: scaleSize(20),
    tintColor: "#404040",
    marginLeft: scaleSize(15),
    marginRight: scaleSize(10),
    marginTop: scaleSize(4),
  },
});
