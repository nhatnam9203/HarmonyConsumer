import { StyleSheet } from 'react-native';
import { scaleSize } from 'utils';
import Configs from '@src/configs';
const {
  COLORS: { COLOR_MAIN_APP },
} = Configs;
const styles = StyleSheet.create({
  container_giftcard: {
    width: '100%',
    height: scaleSize(240),
    marginTop: scaleSize(15),
  },
  container_center: {
    paddingHorizontal: scaleSize(15),
    paddingBottom: scaleSize(60),
  },
  header: {
    marginVertical: scaleSize(20),
    marginBottom: scaleSize(5),
  },
  container_creditcard: {
    marginTop: scaleSize(30),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: scaleSize(307),
  },
  container_price_giftcard: {
    width: scaleSize(100),
    height: scaleSize(40),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: scaleSize(20),
    backgroundColor: '#FFF',
    position: 'absolute',
    top: scaleSize(15),
    right: scaleSize(15),
  },
  image_creditcard: {
    width: scaleSize(40),
    height: scaleSize(25),
    // tintColor:'#707070'
  },
  image_button: {
    width: scaleSize(25),
    height: scaleSize(25),
    // tintColor:'#707070'
  },
  space: {
    marginTop: scaleSize(30),
  },
  button_submit: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  icon_add: {
    width: scaleSize(25),
    height: scaleSize(25),
    marginRight: scaleSize(10),
  },
  button_add: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    marginTop: scaleSize(20),
  },
  textCancel: {  
    color: 'red',
    fontSize: scaleSize(17)
  }
});

export default styles;
