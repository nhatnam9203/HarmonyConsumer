import React from "react";
import { View, ScrollView, RefreshControl } from "react-native";
import styles from "./styles";
import { NotifyList, ItemHolder } from "./widget";
import { Text, LoadMore } from "components";
import Header from "./widget/Header";
import { useSelector, useDispatch } from "react-redux";
import { FocusAwareStatusBar } from "components";
import actions from "@redux/actions";

export default function index(props) {
  const dispatch = useDispatch();
  const [isLoading, setLoading] = React.useState(false);
  const [isRefresh, setRefresh] = React.useState(false);
  const [isLoadMore, setLoadMore] = React.useState(false);
  const [firstLoading, setFirstLoading] = React.useState(false);

  const { token } = useSelector((state) => state.datalocalReducer);

  React.useEffect(() => {
    const timezone = new Date().getTimezoneOffset();
    setFirstLoading(true);
    dispatch(actions.inboxAction.getNotifyToday(timezone, token, getNotifySuccess));
    dispatch(actions.inboxAction.getNotifyHistory(1, timezone, token));
  }, []);

  const getNotifySuccess = (status) => {
    if (status) {
      setTimeout(() => {
        setFirstLoading(false);
      }, 1000);
    }
  };

  const [page, setPage] = React.useState(1);

  const { notify_today, notify_history } = useSelector((state) => state.inboxReducer);

  const timezone = new Date().getTimezoneOffset();

  const refreshInbox = () => {
    setRefresh(true);
    dispatch(actions.inboxAction.getNotifyToday(timezone, token, getNotifySuccess));
    dispatch(actions.inboxAction.getNotifyHistory(1, timezone, token, () => {}));
    setTimeout(() => {
      setRefresh(false);
    }, 300);
  };

  const updateLoadmore = async (e) => {
    const scrollPosition = e.nativeEvent.contentOffset.y;
    const scrollViewHeight = e.nativeEvent.layoutMeasurement.height;
    const contentHeight = e.nativeEvent.contentSize.height;
    const isScrolledToBottom = scrollViewHeight + scrollPosition;
    if (isScrolledToBottom >= contentHeight - 50) {
      setLoadMore(true);
      dispatch(actions.inboxAction.getNotifyHistory(page + 1, timezone, token, stopLoadMore));
    }
  };

  const stopLoadMore = (status) => {
    setLoadMore(false);
    if (status) {
      updatePage();
    }
  };

  const updatePage = () => {
    setPage(page + 1);
  };

  const startLoading = React.useCallback(
    (status) => {
      setLoading(status);
    },
    [isLoading],
  );

  const renderBody = () => {
    if (firstLoading) {
      return <Loading />;
    }
    return (
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={isRefresh} onRefresh={refreshInbox} size={30} />
        }
        onMomentumScrollEnd={updateLoadmore}
        showsVerticalScrollIndicator={false}>
        <Text fontFamily="medium" style={styles.title} fontSize={18} color="#404040">
          Today
        </Text>
        <NotifyList setLoading={startLoading} notify={notify_today} />
        <Text fontFamily="medium" style={styles.title} fontSize={18} color="#404040">
          History
        </Text>
        <NotifyList setLoading={startLoading} isHistory notify={notify_history} />
        {isLoadMore && <LoadMore />}
      </ScrollView>
    );
  };

  return (
    <View pointerEvents={isLoading ? "none" : "auto"} style={styles.container}>
      <FocusAwareStatusBar barStyle="dark-content" backgroundColor="transparent" />
      <Header />
      <View style={styles.body}>{renderBody()}</View>
    </View>
  );
}

const Loading = () => {
  return new Array(10).fill().map(() => <ItemHolder key={new Date() + Math.random()} />);
};
