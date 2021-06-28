import React from "react";
import { StyleSheet, View, Image, Alert, ActivityIndicator } from "react-native";
import * as ImagePicker from "react-native-image-picker";

import { scaleSize } from "utils";

import { Text, Button } from "components";

const options = {
  title: "Select Image",
  // customButtons: [{ name: 'fb', title: 'Choose Photo from Facebook' }],
  storageOptions: {
    skipBackup: true,
    path: "images",
  },
};

const CustomTemplate = ({ onSubmit, images, onChangeImage }) => {
  const [loading, setLoading] = React.useState(false);

  const chooseImage = () => {
    ImagePicker.launchImageLibrary(options, async (response) => {
      setLoading(true);
      try {
        if (response.didCancel) {
        } else if (response.error) {
          Alert.alert("ImagePicker Error: ", response.error);
        } else if (response.customButton) {
          Alert.alert("User tapped custom button: ", response.customButton);
        } else {
          const source = {
            uri: response.uri,
          };

          onChangeImage(source);
          onSubmit(response);
        }
      } catch (error) {
      } finally {
        setTimeout(() => {
          setLoading(false);
        }, 1000);
      }
    });
  };

  return (
    <Button onPress={chooseImage} style={styles.container}>
      {loading ? (
        <ActivityIndicator animating color="#0764B0" size="large" />
      ) : images.uri ? (
        <Image source={images} style={styles.imageChoosed} resizeMode="stretch" />
      ) : (
        <View style={styles.sub_template}>
          <Image style={styles.icon} source={images} />
          <Text fontSize={10} style={{ marginTop: scaleSize(5) }}>
            Upload your photo
          </Text>
        </View>
      )}
    </Button>
  );
};

export default CustomTemplate;

const styles = StyleSheet.create({
  container: {
    width: scaleSize(382),
    height: scaleSize(220),
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F6F6F6",
  },
  sub_template: {
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    alignItems: "center",
    width: scaleSize(280),
    height: scaleSize(130),
    borderWidth: 2,
    borderStyle: "dashed",
    borderColor: "#C5C5C5",
    borderRadius: scaleSize(1),
  },
  icon: {
    width: scaleSize(60),
    height: scaleSize(60),
    resizeMode: "contain",
  },
  imageChoosed: {
    width: scaleSize(382),
    height: scaleSize(220),
  },
});
