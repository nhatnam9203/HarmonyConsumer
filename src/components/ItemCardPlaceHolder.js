import React from "react";
import { StyleSheet, View } from "react-native";
import { Card } from "components";
import { scaleSize } from "utils";
import { Placeholder, PlaceholderMedia, PlaceholderLine, Fade, ShineOverlay } from "rn-placeholder";
export default function ItemCard(props) {
  const { width, height, borderRadius, style } = props;

  const PlaceholderCustom = (props) => {
    const { children, ...anyProps } = props;
    return (
      <Placeholder Animation={ShineOverlay} {...anyProps}>
        {children}
      </Placeholder>
    );
  };

  return (
    <Card
      width={width}
      height={height}
      borderRadius={borderRadius}
      paddingHorizontal={0}
      style={style}>
      <PlaceholderCustom>
        <PlaceholderLine style={styles.cardImage} />
      </PlaceholderCustom>

      <View style={styles.textContent}>
        <PlaceholderCustom>
          <PlaceholderLine style={styles.title} />
        </PlaceholderCustom>

        <PlaceholderCustom
          style={styles.text_content_row}
          Left={() => <PlaceholderMedia style={{ width: scaleSize(225), height: scaleSize(18) }} />}
          Right={() => (
            <PlaceholderMedia style={{ width: scaleSize(44), height: scaleSize(18) }} />
          )}></PlaceholderCustom>

        <PlaceholderCustom
          style={{ marginTop: scaleSize(10) }}
          Left={() => (
            <View style={styles.text_content_rating}>
              <PlaceholderMedia style={styles.icon_rating} />
              <PlaceholderMedia style={styles.text_rating} />
              <PlaceholderMedia
                style={{
                  height: scaleSize(20),
                  width: scaleSize(65),
                }}
              />
            </View>
          )}
        />
      </View>
    </Card>
  );
}

const styles = StyleSheet.create({
  textContent: {
    width: "100%",
    paddingHorizontal: scaleSize(10),
    paddingVertical: scaleSize(10),
  },
  title: {
    width: scaleSize(82),
    height: scaleSize(20),
  },
  cardImage: {
    width: "100%",
    height: scaleSize(140),
  },
  text_content_row: {
    flexDirection: "row",
    alignItems: "flex-start",
  },
  text_content_rating: {
    flexDirection: "row",
    alignItems: "center",
    height: scaleSize(20),
  },
  text_rating: {
    height: scaleSize(20),
    width: scaleSize(50),
    marginRight: scaleSize(15),
  },
  icon_rating: {
    width: scaleSize(10),
    height: scaleSize(10),
    marginRight: scaleSize(5),
  },
  button_like: {
    position: "absolute",
    top: scaleSize(10),
    right: scaleSize(15),
    elevation: 2,
  },
});
