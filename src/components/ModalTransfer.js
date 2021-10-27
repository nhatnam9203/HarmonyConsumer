import React from "react";
import { StyleSheet, Dimensions, View, Image } from "react-native";
import * as RootNavigation from "navigations/RootNavigation";
import { formatMoney, isEmpty, scaleSize, scaleWidth, FormatPrice } from "utils";
import ICONS from "assets";
import { Modal, Text, Button, ModalBottomSelect, ButtonSelectCard } from "components";
import { ButtonSubmit } from "./Form";
import { TextInputMask } from "react-native-masked-text";

const { width } = Dimensions.get("window");

export default function ModalTransfer({
  isVisible,
  onRequestClose,
  fromCards = [],
  toCard = {},
  onSubmit,
  card_detail,
}) {
  const [visibleModal, setVisibleModal] = React.useState(false);
  const [card, setCard] = React.useState(null);
  const [amount, setAmount] = React.useState(10);

  const amount_card = card ? `$ ${formatMoney(card.amount)}` : "Select card";
  const [error, setError] = React.useState("");
  const url_card = card ? { uri: card.imageUrl } : null;

  const disabled_submit = card && toCard ? false : true;

  React.useEffect(() => {
    if (isVisible == true) {
      setCard(card_detail);
    }
  }, [isVisible]);

  const toggleModal = () => {
    setVisibleModal(!visibleModal);
  };

  const handleOnChangeCard = (index, item) => {
    setCard(item);
    setVisibleModal(false);
  };

  const goToAddNewCard = () => {
    onRequestClose();
    setTimeout(() => {
      RootNavigation.navigate("AddNewCard");
    }, 250);
  };

  const onHandleSubmit = () => {
    let body = {
      giftCardId: card.userCardId,
      amount: formatMoney(amount),
    };
    onSubmit(body);
  };

  const handleChangeAmount = (text) => {
    const price = FormatPrice(formatMoney(text));
    const price_card = FormatPrice(formatMoney(amount_card));
    if (price > price_card) {
      setError("Your card does'nt have enough money.");
    } else {
      setError("");
    }
    setAmount(text);
  };

  return (
    <Modal onRequestClose={onRequestClose} isVisible={isVisible}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text fontSize={20} fontFamily="medium">
            Transfer balance
          </Text>
          <Button onPress={onRequestClose}>
            <Image source={ICONS["close_header"]} style={styles.icon_close} />
          </Button>
        </View>

        <View style={styles.space} />
        {!isEmpty(fromCards) ? (
          <ButtonSelectCard
            title="From this card"
            value={amount_card}
            icon={url_card}
            onPress={toggleModal}
          />
        ) : (
          <EmptyCard onPress={goToAddNewCard} />
        )}

        <ModalBottomSelect
          title="Cards"
          isVisible={visibleModal}
          onRequestClose={toggleModal}
          data={fromCards}
          onSelect={handleOnChangeCard}
          value={card}
          renderItem={(item) => <ItemCard item={item} />}
        />
        <View style={styles.space} />

        <ButtonSelectCard
          title="To this card"
          value={`$ ${formatMoney(toCard?.amount ?? 0)}`}
          icon={{ uri: toCard?.imageUrl }}
          off={true}
        />

        <View style={styles.space} />
        <InputValue value={amount} onChange={handleChangeAmount} error={error} />
        <Transfer onSubmit={onHandleSubmit} disabled={disabled_submit || !isEmpty(error)} />
      </View>
    </Modal>
  );
}

const ItemCard = ({ item }) => {
  const { imageUrl, userCardId } = item;
  return (
    <View style={styles.container_item_card}>
      <Image source={{ uri: imageUrl }} style={styles.image_card} />
      <Text fontSize={17} style={{ fontWeight: "700" }}>
        Mycard - {userCardId}
      </Text>
    </View>
  );
};

const Transfer = ({ onSubmit, disabled }) => {
  return (
    <View style={styles.button_transfer}>
      <ButtonSubmit
        title="Transfer"
        width={160}
        onSubmit={onSubmit}
        disabled={disabled}
        backgroundColor={!disabled ? "#0764B0" : "#EEEEEE"}
        textColor={!disabled ? "#FFF" : "#585858"}
      />
    </View>
  );
};

const EmptyCard = ({ onPress }) => {
  return (
    <View style={styles.container_select_amount}>
      <Text fontSize={15} color="#888888">
        From this card
      </Text>

      <Button onPress={onPress} style={styles.button_select}>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <View style={styles.icon_card} />
          <Text fontSize={15} style={{ marginLeft: scaleSize(10) }}>
            Press in here to add new card
          </Text>
        </View>
      </Button>
    </View>
  );
};

const InputValue = ({ value, onChange, error }) => {
  return (
    <View style={{ width: "92%" }}>
      <Text fontFamily="medium" fontSize={scaleSize(18)}>
        Amount
      </Text>
      <TextInputMask
        value={value}
        autoCapitalize={false}
        onChangeText={(text) => onChange(text)}
        style={styles.inputAmount}
        options={{
          precision: 2,
          separator: ".",
          delimiter: ",",
          unit: "$",
          suffixUnit: "",
        }}
        type="money"
        placeholder={"transfer money"}
        placeholderTextColor="#A9A9A9"
      />
      {!isEmpty(error) && (
        <Text style={styles.txtError} color={"red"} fontSize={scaleSize(16.5)}>
          {error}
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width,
    backgroundColor: "#FFF",
    alignItems: "center",
    borderRadius: scaleSize(10),
  },
  header: {
    width: "100%",
    paddingHorizontal: scaleSize(16),
    height: scaleSize(55),
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottomWidth: 1.5,
    borderColor: "#eeeeee",
  },
  icon_close: {
    width: scaleSize(18),
    height: scaleSize(18),
    resizeMode: "contain",
  },
  space: {
    marginBottom: scaleSize(28),
  },
  container_item_card: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
  },
  image_card: {
    width: scaleSize(48),
    height: scaleSize(28),
    resizeMode: "contain",
    marginRight: scaleSize(15),
  },
  button_transfer: {
    width: "100%",
    justifyContent: "center",
    alignItems: "flex-end",
    paddingRight: scaleSize(16),
    marginVertical: scaleSize(20),
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.15,
    shadowRadius: 1.15,
    elevation: 3,
  },
  container_select_amount: {
    width: scaleSize(382),
    height: scaleSize(60),
    justifyContent: "space-between",
    paddingBottom: scaleSize(15),
    borderBottomWidth: 1.5,
    borderBottomColor: "#EEEEEE",
  },
  cotent: {
    height: "100%",
    justifyContent: "space-between",
    marginLeft: scaleSize(15),
  },
  icon: {
    width: scaleSize(18),
    height: scaleSize(18),
    resizeMode: "contain",
  },
  icon_card: {
    width: scaleSize(48),
    height: scaleSize(28),
    backgroundColor: "grey",
  },
  button_select: {
    width: "100%",
    height: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  txtError: {
    marginTop: scaleSize(10),
  },
  inputAmount: {
    borderBottomWidth: 1,
    borderBottomColor: "#eeeeee",
    paddingBottom: scaleWidth(1),
    marginTop: scaleWidth(3.5),
    fontSize: scaleWidth(3.7),
    color: "#585858",
    width: "100%",
    fontFamily: "SFProDisplay-Bold",
    fontSize: scaleSize(17),
  },
});
