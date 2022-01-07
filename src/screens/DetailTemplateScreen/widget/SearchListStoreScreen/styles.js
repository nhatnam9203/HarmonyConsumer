import { StyleSheet } from 'react-native';
import { scaleSize } from 'utils';
import Configs from '@src/configs';
const {
  COLORS: { COLOR_MAIN_APP },
} = Configs;
const styles = StyleSheet.create({
  container_center: {
    alignItems: 'center',
  },
  title: {
    fontWeight: '500',
    marginVertical: scaleSize(20),
  },
  item_store: {
    width: '100%',
    height: scaleSize(55),
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: '#DDDDDD',
    paddingVertical: scaleSize(7),
    marginBottom: scaleSize(10),
  },
  search_bar: {
    marginTop: scaleSize(15),
    marginBottom: scaleSize(10),
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default styles;
