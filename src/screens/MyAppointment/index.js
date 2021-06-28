import React, { useState } from "react";
import { View, ScrollView, RefreshControl } from "react-native";
import { Appointment, PastAppointment, PlaceHolder, Title } from "./widget";
import { Header, StatusBar, LoadMore, FocusAwareStatusBar } from "components";
import { scaleWidth } from "utils";
import { useDispatch, useSelector } from "react-redux";
import actions from "@redux/actions";
import images from "assets";
import * as RootNavigation from "navigations/RootNavigation";
import styles from "./styles";

export default function index(props) {
  const dispatch = useDispatch();

  const [isRefresh, setRefresh] = useState(false);
  const [isLoadMore, setLoadMore] = useState(false);
  const [firstLoading, setFirstLoading] = useState(false);
  const [page, setPage] = useState(1);

  const token = useSelector((state) => state.datalocalReducer.token);

  const { appointmentUpcoming, appointmentPast } = useSelector((state) => state.appointmentReducer);

  const { count_upcoming, count_past } = useSelector((state) => state.appointmentReducer);

  React.useLayoutEffect(() => {
    setFirstLoading(true);
    dispatch(
      actions.appointmentAction.getAppointmentPast(token, 1, () => {}, afterLoadAppointment),
    );
  }, []);

  const afterLoadAppointment = (status) => {
    if (status == false) {
      setTimeout(() => {
        setFirstLoading(false);
      }, 1000);
    }
  };

  const openDrawer = () => {
    props.navigation.openDrawer();
  };

  const openInbox = () => {
    RootNavigation.navigate("Inbox");
  };

  const viewDetailAppointment = () => {
    RootNavigation.navigate("BookAppointmentStack", {
      screen: "MyAppointmentDetail",
    });
  };

  const updatePage = () => {
    setPage(page + 1);
  };

  const refreshAppointments = () => {
    setRefresh(true);
    dispatch(actions.appointmentAction.getAppointmentUpcoming(token, setRefresh));
    dispatch(actions.appointmentAction.getAppointmentPast(token, 1));
    setTimeout(() => {
      setRefresh(false);
    }, 1500);
  };

  const updateLoadmore = (e) => {
    const scrollPosition = e.nativeEvent.contentOffset.y;
    const scrollViewHeight = e.nativeEvent.layoutMeasurement.height;
    const contentHeight = e.nativeEvent.contentSize.height;
    const isScrolledToBottom = scrollViewHeight + scrollPosition;

    if (isScrolledToBottom >= contentHeight - 50) {
      setLoadMore(true);
      dispatch(actions.appointmentAction.getAppointmentPast(token, page + 1, stopLoadMore));
    }
  };

  const stopLoadMore = (status) => {
    setLoadMore(false);
    if (status) {
      updatePage();
    }
  };

  const renderListAppointMent = () => {
    return appointmentUpcoming.map((app) => {
      return (
        <Appointment
          viewDetailAppointment={viewDetailAppointment}
          appointment={app}
          key={app.appointmentId}
        />
      );
    });
  };

  const renderPastAppointMent = () => {
    return appointmentPast.map((app) => {
      return (
        <PastAppointment
          appointment={app}
          key={app.appointmentId}
          viewDetailAppointment={viewDetailAppointment}
        />
      );
    });
  };

  return (
    <View style={styles.container}>
      <FocusAwareStatusBar barStyle="dark-content" backgroundColor="transparent" />
      <View style={{ backgroundColor: "#F8F8F8" }}>
        <StatusBar barStyle="dark-content" />
        <Header
          title="My Appointments"
          headerLeft={true}
          headerRight={true}
          iconLeft={images["drawer"]}
          onBack={openDrawer}
          onPressRight={openInbox}
        />
      </View>
      <View style={styles.body}>
        {firstLoading ? (
          <PlaceHolder />
        ) : (
          <ScrollView
            refreshControl={
              <RefreshControl refreshing={isRefresh} onRefresh={refreshAppointments} size={30} />
            }
            onMomentumScrollEnd={updateLoadmore}>
            <Title title="Upcoming" quantity={count_upcoming} color="#D4F8FC" />
            {renderListAppointMent()}
            <View style={{ marginTop: scaleWidth(4) }}>
              <Title
                title="Past"
                quantity={count_past > 100 ? "99+" : count_past}
                color="#C5C5C5"
              />
            </View>
            {renderPastAppointMent()}
            {isLoadMore && <LoadMore />}
            <View style={{ height: scaleWidth(40) }} />
          </ScrollView>
        )}
      </View>
    </View>
  );
}
