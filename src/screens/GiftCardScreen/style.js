import { StyleSheet, Dimensions } from 'react-native';
import { scaleSize, statusBarHeight } from 'utils';
import Configs from '@src/configs';
const {
  COLORS: { COLOR_MAIN_APP },
} = Configs;

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  default_tab: {
    height: scaleSize(45),
    width: width / 2,
  },
  tabs: {
    width,
    height: scaleSize(65),
    alignItems: 'center',
    backgroundColor: '#F8F8F8',
    borderBottomWidth: 1,
    borderBottomColor: '#eeeeee',
  },
  wrapper_header: {
    backgroundColor: '#F8F8F8',
    height: scaleSize(124 + statusBarHeight()),
    width: '100%',

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.34,
    shadowRadius: 6.27,

    elevation: 10,
  },
  content_flatlist: {
    paddingHorizontal: scaleSize(15),
    paddingVertical: scaleSize(25),
  },
  seperator: {
    height: scaleSize(10),
    width: '100%',
  },
});

export default styles;
