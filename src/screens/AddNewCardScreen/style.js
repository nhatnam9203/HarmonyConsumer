import { StyleSheet } from 'react-native';
import { scaleSize } from 'utils';
import Configs from '@src/configs';
const {
  COLORS: { COLOR_MAIN_APP },
} = Configs;
const styles = StyleSheet.create({
  container_giftcard: {
    marginTop: scaleSize(30),
    width: '100%',
    height: scaleSize(140),
    backgroundColor: '#FFF',
    //overFlow:'hidden',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.34,
    shadowRadius: 6.27,
    elevation: 10,
    borderRadius: scaleSize(5),
  },
  container_center: {
    paddingHorizontal: scaleSize(15),
    flex: 1,
    alignItems: 'center',
  },

  wrapper_input: {
    width: '100%',
    height: scaleSize(91),
  },

  line_bottom: {
    width: '100%',
    height: scaleSize(25),
    backgroundColor: '#F6F6F6',
    marginBottom: scaleSize(20),
  },
  image: {
    width: scaleSize(24),
    height: scaleSize(24),
    resizeMode: 'contain',
  },
  button_position: {
    position: 'absolute',
    right: 0,
    bottom: scaleSize(40),
  },
  image_button: {
    width: scaleSize(25),
    height: scaleSize(25),
    // tintColor:'#707070'
  },
  container_radio_button: {
    marginTop: scaleSize(30),
    justifyContent: 'flex-start',
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
  },
  button_submit: {
    justifyContent: 'flex-end',
    flex: 1,
    alignSelf: 'flex-end',
    marginBottom: scaleSize(30),
  },
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  viewMerchant: {
    justifyContent: 'flex-start',
    alignSelf: 'flex-start',
  },
  textSelectMerchant: {
    marginTop: scaleSize(10),
    marginLeft: scaleSize(10)
  },
  search_bar: {
    marginTop: scaleSize(15),
    marginBottom: scaleSize(10),
    justifyContent: 'center',
    alignItems: 'center',
  },
  rowText: {
    fontSize: scaleSize(15)
  },
  rowView: {
    margin: scaleSize(10),
  },
  flatlistView: {
    height: scaleSize(200)
  }
});

export default styles;
