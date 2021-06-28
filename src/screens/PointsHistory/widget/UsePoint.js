import React from "react";
import { View, ScrollView } from "react-native";
import { scaleWidth } from "utils";
import Item from "./Item";
import { LoadMore } from "components";
import { useDispatch, useSelector } from "react-redux";
import actions from "@redux/actions";

export default function GetPoint(props) {
  const { points_customer_used } = props;

  const dispatch = useDispatch();
  const token = useSelector((state) => state.datalocalReducer.token);
  const [isLoadMore, setLoadMore] = React.useState(false);
  const [page, setPage] = React.useState(1);
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
      dispatch(actions.customerAction.getPointUsed(page + 1, timezone, token, stopLoadMore));
    }
  };

  const stopLoadMore = (status) => {
    setLoadMore(false);
    if (status) {
      updatePage();
    }
  };

  return (
    <ScrollView onMomentumScrollEnd={updateLoadmore} showsVerticalScrollIndicator={false}>
      <View style={{ flex: 1, backgroundColor: "white", paddingHorizontal: scaleWidth(3) }}>
        {points_customer_used.map((item) => (
          <Item item={item} key={item.checkoutId + new Date() + Math.random()} isUsed />
        ))}
        {isLoadMore && <LoadMore />}
        <View style={{ height: scaleWidth(50) }} />
      </View>
    </ScrollView>
  );
}
