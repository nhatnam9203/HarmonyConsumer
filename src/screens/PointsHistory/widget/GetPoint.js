import React from "react";
import { View, ScrollView } from "react-native";
import { scaleWidth } from "utils";
import Item from "./Item";
import { LoadMore } from "components";
import { useDispatch, useSelector } from "react-redux";
import actions from "@redux/actions";
import { useFocusEffect } from "@react-navigation/native";

export default function GetPoint(props) {
  const { points_customer } = props;

  const token = useSelector((state) => state.datalocalReducer.token);

  const dispatch = useDispatch();

  const [isLoadMore, setLoadMore] = React.useState(false);
  const [page, setPage] = React.useState(0);
  const timezone = new Date().getTimezoneOffset();

  const updatePage = () => {
    setPage(page + 1);
  };

  const updateLoadmore = async (e) => {
    const scrollPosition = e.nativeEvent.contentOffset.y;
    const scrollViewHeight = e.nativeEvent.layoutMeasurement.height;
    const contentHeight = e.nativeEvent.contentSize.height;
    const isScrolledToBottom = scrollViewHeight + scrollPosition;
    if (isScrolledToBottom >= contentHeight - 50) {
      setLoadMore(true);
      dispatch(actions.customerAction.getPoint(page + 1, timezone, token, stopLoadMore));
    }
  };

  const stopLoadMore = (status) => {
    setLoadMore(false);
    if (status) {
      updatePage();
    }
  };


  useFocusEffect(
    React.useCallback(() => {
      setPage(1);
      dispatch(actions.customerAction.getPoint(1, timezone, token, stopLoadMore));
    }, [])
  );

  return (
    <ScrollView onMomentumScrollEnd={updateLoadmore} showsVerticalScrollIndicator={false}>
      <View style={{ flex: 1, backgroundColor: "white", paddingHorizontal: scaleWidth(3) }}>
        {points_customer.map((item) => (
          <Item item={item} key={item.checkoutId + new Date() + Math.random()} />
        ))}
        {isLoadMore && <LoadMore />}
        <View style={{ height: scaleWidth(50) }} />
      </View>
    </ScrollView>
  );
}
