import React from "react";
import { Text, View, TouchableOpacity, Image } from "react-native";
import Header from "../Header";
import styles from "../styles";
import { scaleWidth } from "utils";
import images from "assets";
import { useFormik } from "formik";
import * as Yup from "yup";
import ScrollTabView from "components/react-native-scrollable-tab-view";
import AddCard from "./AddCard";
import AddBank from "./AddBank";

const schema = Yup.object().shape({
  cardNumber: Yup.string().required("Required"),
  cardName: Yup.string().required("Required"),
});

export default function Payment(props) {
  const refScrollView = React.useRef(null);
  const [type, setType] = React.useState("card");

  const formik = useFormik({
    initialValues: {
      cardNumber: "",
      cardName: "",
    },
    validationSchema: schema,
    onSubmit: (values) => {},
  });

  const { values, handleChange, errors, handleSubmit, isValid } = formik;

  const back = () => {
    props.goToPage(0);
  };

  const goToPage = (page) => {
    refScrollView.current?.goToPage(page);
  };

  const selectType = (type) => {
    setType(type);
    if (type === "card") {
      goToPage(0);
    }
    if (type === "bank") {
      goToPage(1);
    }
  };

  function renderSelectCard() {
    return (
      <View style={styles.row}>
        <TouchableOpacity
          style={styles.selectCard(type, "card")}
          onPress={() => selectType("card")}>
          <Image source={images.card_blue} style={styles.imgCard(type, "card")} />
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.selectCard(type, "bank"), { marginLeft: scaleWidth(5) }]}
          onPress={() => selectType("bank")}>
          <Image source={images.bank} style={styles.imgCard(type, "bank")} />
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Header onBack={back} title={"Add Payment"} />
      <View style={styles.body}>
        {renderSelectCard()}
        <ScrollTabView ref={refScrollView} initialPage={0} renderTabBar={() => <View />}>
          <AddCard />
          <AddBank />
        </ScrollTabView>
      </View>
    </View>
  );
}
