import React from 'react';
import {
  View,
  StyleSheet,
  TextInput,
  Image,
  TouchableOpacity,
} from 'react-native';
import { Text } from 'components';
import { scaleWidth, scaleHeight } from 'utils';
import images from 'assets';

export default function Message({ message, setMessage }) {
  return (
    <View
      style={{ marginTop: scaleHeight(2), paddingHorizontal: scaleWidth(3) }}>
      <Text style={styles.txtMessage}>Leave a comment or Photos</Text>
      <View style={styles.containerInput}>
        <TextInput
          value={message}
          onChangeText={text => {
            if (text && text.length > 500) return;
            setMessage(text)
          }}
          placeholder="Your comment"
          style={styles.textInput}
          multiline
        />

        {/* <TouchableOpacity onPress={pickGallery}>
          <Image source={images.media_rating} style={styles.icon2} />
        </TouchableOpacity>
        <TouchableOpacity onPress={launchCamera}>
          <Image source={images.camera_rating} style={styles.icon} />
        </TouchableOpacity>  */}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  txtMessage: {
    fontSize: scaleWidth(4),
    fontWeight: '600',
  },
  containerInput: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#dddddd',
    width: '100%',
    paddingVertical: scaleWidth(0.5),
    paddingHorizontal: scaleWidth(3),
    borderRadius: 5,
    height: scaleHeight(12),
    marginTop: scaleHeight(1.5),
    backgroundColor: '#F8F8F8',
  },
  textInput: {
    flex: 1,
    height: '100%',
    fontSize: scaleWidth(3.8),
    color: '#404040',
  },
  icon: {
    width: scaleWidth(7),
    height: scaleWidth(7),
  },
  icon2: {
    width: scaleWidth(6),
    height: scaleWidth(5.5),
    marginRight: scaleWidth(3),
  },
});
