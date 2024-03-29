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
  icon_reload: {
    width: scaleSize(18),
    height: scaleSize(18),
    resizeMode: "contain",
    marginLeft: scaleSize(15),
  },
  textAddCard: {
    color: '#0764B0',
    fontSize: scaleSize(17),
    fontWeight: '700',
    marginLeft: scaleSize(5),
    marginRight: scaleSize(10)
  },
  buyGiftButton: {
    backgroundColor: "#0764B0",
    height: scaleSize(45),
    width: '70%',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: scaleSize(10),
    marginBottom: scaleSize(20)
  },
  buyGiftText: {
    fontSize: scaleSize(17),
    color: "white",
    fontWeight: "bold",
  },
  emptyCardView: {
    flex: 1,
    justifyContent: 'center',
    margin: scaleSize(20),
    alignItems: 'center',
    marginTop: scaleSize(50)
  },
  viewButtonBuyGiftCard: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: scaleSize(30)
  },
  titleText: {
    fontSize: scaleSize(18),
    fontWeight: "bold",
    marginBottom: scaleSize(15)
  },
  normalText: {
    fontSize: scaleSize(16),
    textAlign: 'center',
    marginBottom: scaleSize(20)
  },
  moreCardView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  txtMoreCard: {
    marginBottom: scaleSize(15),
    marginTop: scaleSize(25),
  },
});

export default styles;
