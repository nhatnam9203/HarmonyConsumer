import { StyleSheet } from 'react-native';
import { scaleSize } from 'utils';
import Configs from '@src/configs';
const {
  COLORS: { INPUT },
} = Configs;
const styles = StyleSheet.create({
  card: {
    top: -scaleSize(75),
    paddingVertical: scaleSize(15),
  },
  container_center: {
    // paddingHorizontal: scaleSize(15),
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  header_card: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    width: '100%',
    height: scaleSize(30),
    borderBottomWidth: 1,
    borderBottomColor: '#eeeeee',
    marginBottom: scaleSize(15),
  },
  text_header_card: {
    fontWeight: '700',
  },
  body_card: {
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    height: scaleSize(160),
  },
  body_card_left: {
    width: scaleSize(264),
    justifyContent: 'space-between',
    alignItems: 'center',
    overflow: 'hidden',
  },
  img_card_left: {
    width: scaleSize(264),
    height: scaleSize(160),
    resizeMode: 'cover',
  },
  body_card_right: {
    width: scaleSize(70),
    height: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  button_add_card: {
    width: scaleSize(70),
    height: scaleSize(70),
    borderRadius: 5,
    borderStyle: 'dashed',
    borderWidth: 1,
    borderColor: '#CCCCCC',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  icon_button: {
    width: scaleSize(45),
    height: scaleSize(45),
  },
  title_popular: {
    width: Configs.CARD_WIDTH,
    top: -scaleSize(15),
  },
});
export default styles;
