import { StyleSheet, Platform } from 'react-native';
import { scaleHeight, scaleWidth } from 'utils';

const styles = StyleSheet.create({
  txtAddMore: {
    fontSize: scaleWidth(4.2),
    color: '#0764B0',
    marginLeft: scaleWidth(1.5),
  },
  textInputNote: {
    marginTop: scaleWidth(3),
    borderWidth: 1,
    borderColor: '#dddddd',
    borderRadius: 5,
    paddingBottom: scaleWidth(27),
    padding: scaleWidth(3),
    color: '#585858',
    fontSize: scaleWidth(3.5),
  },
  txtTotal: {
    fontWeight: Platform.OS === 'android' ? 'bold' : '700',
    fontSize: scaleWidth(4.5),
    color: '#0764B0',
  },
  rowTotal: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  note: {
    width: scaleWidth(5),
    height: scaleWidth(5),
  },
  iconNote: {
    width: scaleWidth(6),
    height: scaleWidth(6),
    marginTop: 7,
  },
  txtNote: {
    marginLeft: scaleWidth(2),
    color: '#585858',
    fontSize: scaleWidth(4.1),
  },
  txtDuration: {
    fontSize: scaleWidth(4.5),
    color: '#585858',
  },
  duration: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  textNote: {
    fontSize: scaleWidth(4),
    color: '#888888',
    marginTop: scaleHeight(1),
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  txtAddNote: {
    fontSize: scaleWidth(3.7),
    color: '#404040',
    marginTop: scaleHeight(1),
  },
  rowButtonAddNote: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: scaleHeight(1.5),
  },
  rowTextNote: {
    flexDirection: 'row',
    marginTop: scaleHeight(2),
    alignItems: 'center',
  },
  rowAddmore: {
    flexDirection: 'row',
    marginTop: scaleHeight(2),
    alignItems: 'center',
  },
});

export default styles;
