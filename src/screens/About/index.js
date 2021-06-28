import React from "react";
import { View } from "react-native";
import ScrollTabView from "components/react-native-scrollable-tab-view";
import { Main, AboutUs, ContactUs, FeedBack } from "./widget";
import { FocusAwareStatusBar } from "components";

export default function index(props) {
  const scrollTabView = React.useRef(null);

  const goToPage = (page) => {
    scrollTabView.current?.goToPage(page);
  };

  return (
    <React.Fragment>
      <FocusAwareStatusBar barStyle="dark-content" backgroundColor="transparent" />
      <ScrollTabView
        locked={true}
        ref={scrollTabView}
        renderTabBar={() => <View />}
        initialPage={0}>
        <Main goToPage={goToPage} />
        <AboutUs goToPage={goToPage} />
        <ContactUs goToPage={goToPage} />
        <FeedBack goToPage={goToPage} />
      </ScrollTabView>
    </React.Fragment>
  );
}
