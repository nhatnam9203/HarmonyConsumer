import { StyleSheet } from 'react-native';
import { scaleWidth, scaleHeight } from 'utils';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    minHeight: scaleHeight(50),
    backgroundColor: 'white',
    paddingTop: scaleHeight(3),
  },
  summary: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: scaleWidth(4),
    borderBottomWidth: 1,
    borderBottomColor: '#eeeeee',
    paddingBottom: scaleHeight(1),
  },
  txtRating: {
    fontSize: scaleWidth(6),
    color: '#404040',
    fontWeight: 'normal',
    fontWeight: '400',
  },
  txtCount: {
    fontSize: scaleWidth(4),
    color: '#585858',
  },
  line: {
    borderBottomWidth: 1,
    borderBottomColor: '#eeeeee',
    width: '100%',
    marginTop: scaleHeight(1.3),
  },
  rowComment: {
    flexDirection: 'row',
    marginTop: scaleHeight(2.5),
  },
  imgAvatar: {
    width: scaleWidth(15),
    height: scaleWidth(15),
    borderRadius: scaleWidth(50),
  },
  userName: {
    fontSize: scaleWidth(4),
  },
  commentRight: {
    marginLeft: scaleWidth(3),
  },
  txtCreateDate: {
    color: '#666666',
    fontSize: scaleWidth(3.5),
  },
  message: {
    fontSize: scaleWidth(3.7),
    color: '#404040',
    marginTop: scaleHeight(1),
  },
  imgStoreReview: {
    width: scaleWidth(14),
    height: scaleWidth(14),
    marginRight: scaleWidth(1),
    borderRadius: 5,
    marginTop: scaleHeight(1),
  },
  containerImgComment: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: scaleHeight(1.5),
  },
  itemComment: {
    borderBottomWidth: 1,
    borderBottomColor: '#eeeeee',
    paddingBottom: scaleHeight(1.5),
    width: scaleWidth(94),
    alignSelf: 'center',
  },
});

export default styles;
