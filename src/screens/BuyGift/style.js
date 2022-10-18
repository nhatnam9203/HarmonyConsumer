import { StyleSheet, Dimensions } from 'react-native';
import { scaleSize } from 'utils';
const { width } = Dimensions.get('window');
const styles = StyleSheet.create({
  content_flatlist: {
    paddingHorizontal: scaleSize(15),
    paddingVertical: scaleSize(25),
  },
  seperator: {
    height: scaleSize(10),
    width: '100%',
  },
  textCancel: {
    color: 'red',
    fontSize: scaleSize(17)
  }
});

export default styles;