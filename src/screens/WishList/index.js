import React from "react";
import { View, TouchableOpacity, TextInput } from "react-native";
import { Text } from "components";
import styles from "./styles";
import { scaleWidth } from "utils";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import AntDesign from "react-native-vector-icons/AntDesign";
import { Store } from "./widget";
import { Header, StatusBar } from "components";
import images from "assets";
import * as RootNavigation from "navigations/RootNavigation";

const data = [
  { storeName: "A new you spa", isFavorite: true },
  { storeName: "BaBa spa", isFavorite: false },
  { storeName: "Beauty Spa", isFavorite: false },
  { storeName: "Lily nails and Spa", isFavorite: false },
  { storeName: "Sunrise-Sunset Spa", isFavorite: true },
];

export default function index(props) {
  const [searchValue, setValueSearch] = React.useState("");

  const onChangeSearchValue = (data) => {
    setValueSearch(data);
  };

  const back = () => {
    RootNavigation.back();
  };

  React.useEffect(() => {
    alert("coming soon");
  }, []);

  return (
    <View style={styles.container}>
      <View style={{ backgroundColor: "#f8f8f8" }}>
        <StatusBar />
        <Header title="Wish list" onBack={back} headerLeft headerRight iconRight={images.treedot} />
      </View>
      <View style={styles.wrapAddNewItem}>
        <TextInput
          placeholderTextColor={"#939598"}
          placeholder="Add new item"
          value={searchValue}
          onChangeText={onChangeSearchValue}
          style={styles.txtAddNewItem}
        />
        <TouchableOpacity>
          <FontAwesome name="plus" size={scaleWidth(5)} color={"#235AAA"} />
        </TouchableOpacity>

        {searchValue.length > 0 && (
          <View style={styles.containerWishList}>
            {data.map((obj, key) => {
              return (
                <View key={key} style={styles.itemWishList}>
                  <Text>{obj.storeName}</Text>
                  <AntDesign
                    size={scaleWidth(4)}
                    name="heart"
                    color={obj.isFavorite ? "#ED1C24" : "#C5C5C5"}
                  />
                </View>
              );
            })}
          </View>
        )}
      </View>
      {searchValue.length === 0 && <Store />}
    </View>
  );
}
