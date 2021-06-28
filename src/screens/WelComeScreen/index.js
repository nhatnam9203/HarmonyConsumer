import React from "react";
import { View, Text, Image } from "react-native";
import AppIntroSlider from "react-native-app-intro-slider";
import images from "assets";
import { scaleWidth, scaleHeight } from "utils";
import { TouchableRipple } from "react-native-paper";
import styles from "./styles";

const slides = [
  {
    key: 1,
    title: "Best Deals in Real Time",
    text: "Receive best deals in real-time based on location and wish list.",
    image: images.bestDeal,
    backgroundColor: "white",
  },
  {
    key: 2,
    title: "Interactive Booking",
    text: "Book appointments through mobile app or online.",
    text2: "Personalize Booking.",
    text3: "Automatic check-in in waiting list",
    image: images.interactive,
    backgroundColor: "white",
  },
  {
    key: 3,
    title: "Mobile Payment",
    text: "Fast and easy payments.",
    text2: "Competitive rewards points.",
    image: images.mobilePayment,
    backgroundColor: "white",
  },
  {
    key: 4,
    title: "Gift Card",
    text: "Send and receive gift cards from friends and family.",
    image: images.p2p,
    backgroundColor: "white",
  },
];

export default class App extends React.Component {
  constructor(props) {
    super(props);
  }

  state = {
    showRealApp: false,
  };

  gotoPhoneVerify = () => {
    this.props.navigation.navigate("PhoneVerify");
  };

  goToSlide = (key) => {
    this.gotoPhoneVerify();
  };

  _renderItem = ({ item }) => {
    return (
      <View style={styles.containerItem}>
        <View
          style={{
            alignItems: "center",
            justifyContent: "space-between",
            marginTop: scaleWidth(5),
            flex: 1,
            paddingBottom: scaleWidth(20),
          }}>
          <View style={{ marginTop: scaleWidth(5), alignItems: "center" }}>
            <Text style={styles.title}>{item.title}</Text>
            <Image source={item.image} style={styles.image} />
            <Text style={styles.content}>{item.text}</Text>
            <Text style={[styles.content, { marginTop: 5 }]}>{item.text2}</Text>
            <Text style={[styles.content, { marginTop: 5 }]}>{item.text3}</Text>
          </View>

          <TouchableRipple
            borderless={true}
            onPress={() => this.goToSlide(item.key)}
            style={styles.button}>
            <Text style={styles.textButton}>{"Skip"}</Text>
          </TouchableRipple>
        </View>
      </View>
    );
  };

  _onDone = () => {
    this.setState({ showRealApp: true });
  };

  render() {
    if (this.state.showRealApp) {
      return <App />;
    } else {
      return (
        <AppIntroSlider
          bottomButton={false}
          showNextButton={false}
          showDoneButton={false}
          renderItem={this._renderItem}
          data={slides}
          onDone={this._onDone}
          dotStyle={{
            backgroundColor: "#B1B1B1",
            marginBottom: scaleHeight(33),
            width: scaleWidth(8),
            height: scaleWidth(1),
            borderRadius: 0,
          }}
          activeDotStyle={{
            backgroundColor: "#156AAB",
            width: scaleWidth(8),
            height: scaleWidth(1),
            marginBottom: scaleHeight(33),
            borderRadius: 0,
          }}
        />
      );
    }
  }
}
