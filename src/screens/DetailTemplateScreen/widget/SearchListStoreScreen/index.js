import React, { useState } from "react";
import { View, FlatList, ActivityIndicator } from "react-native";
import { useSelector, useDispatch } from "react-redux";

import { search_store_list, pickup_store_special } from "@redux/actions/storeAction";
import ICONS from "assets";
import { result_store } from "mocks";
import { Container, Header, SearchBar, Text } from "components";
import * as RootNavigation from "navigations/RootNavigation";
import ItemStore from "./ItemStore";
import styles from "./styles";

export default function index(props) {
  const dispatch = useDispatch();
  const [key, setKey] = React.useState("");
  const typingTimeoutRef = React.useRef();
  const loading_search = useSelector((state) => state.storeReducer.loading_search);

  const onBack = () => {
    RootNavigation.back();
  };

  const onHandleChangeKey = React.useCallback(
    (value) => {
      setKey(value);
      if (typingTimeoutRef.current) {
        clearTimeout(typingTimeoutRef.current);
      }
      typingTimeoutRef.current = setTimeout(() => {
        onSubmit();
      }, 300);
    },
    [key],
  );

  const onSubmit = () => {
    dispatch(search_store_list());
  };

  const pickupStore = (store = {}) => {
    dispatch(pickup_store_special(store));
    setKey("");
    onBack();
  };

  const renderListStore = ({ item, index }) => {
    return <ItemStore item={item} onPress={pickupStore} />;
  };

  const EmpListComponent = () => <Text fontSize={15}>List is empty</Text>;

  return (
    <Container barStyle="dark-content">
      <Header
        title="Select store"
        headerLeft={true}
        iconLeft={ICONS["arrow_back_ios"]}
        onBack={onBack}
      />

      <View style={styles.search_bar}>
        <SearchBar
          placeholder="Search..."
          placeholderTextColor="#646464"
          iconLeft={ICONS["searchbar"]}
          width={382}
          value={key}
          onChangeText={onHandleChangeKey}
          autoFocus={true}
        />
      </View>

      {loading_search ? (
        <ActivityIndicator animating color="#0764b0" size="large" />
      ) : (
        <FlatList
          contentContainerStyle={styles.container_center}
          data={result_store}
          renderItem={renderListStore}
          keyExtractor={(_, index) => index + ""}
          ListEmptyComponent={EmpListComponent}
          keyboardDismissMode="on-drag"
          keyboardShouldPersistTaps="handled"
        />
      )}
    </Container>
  );
}
