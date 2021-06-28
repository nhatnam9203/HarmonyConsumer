import React from "react";
import { View } from "react-native";
import ScrollableTabView from "components/react-native-scrollable-tab-view";
import { HowToAccumulate, ReviewStore, ReferringFriend } from "./widget";

export default function index(props) {
  const refSrollView = React.useRef(null);

  const goToPage = (page) => {
    refSrollView.current?.goToPage(page);
  };

  return (
    <ScrollableTabView locked={true} ref={refSrollView} renderTabBar={() => <View />}>
      <HowToAccumulate goToPage={goToPage} navigation={props.navigation} />
      <ReviewStore goToPage={goToPage} navigation={props.navigation} />
      <ReferringFriend goToPage={goToPage} navigation={props.navigation} />
    </ScrollableTabView>
  );
}
