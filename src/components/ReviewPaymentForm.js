import React from 'react';
import {
  Text,
  View,
  StyleSheet,
  Image,
  Platform,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Linking,
  Alert,
} from 'react-native';
import { scaleWidth, scaleHeight } from 'utils';
import images from 'assets';
import * as RootNavigation from 'navigations/RootNavigation';
import { useDispatch, useSelector } from 'react-redux';
import FastImage from 'react-native-fast-image';
import actions from '@redux/actions';
import { harmonyApi } from '@shared/services';
import AntDesign from 'react-native-vector-icons/AntDesign';
import * as ImagePicker from 'react-native-image-picker';
import { slop } from 'utils';
import { isEmpty } from 'lodash';

const REVIEW_TYPES = {
  NOT_GOOD: 1,
  JUST_OK: 2,
  AWESOME: 3,
};

const options = {
  title: 'Select Avatar',
  customButtons: [{ name: 'fb', title: 'Choose Photo from Facebook' }],
  storageOptions: {
    skipBackup: true,
    path: 'images',
  },
};

export default function ReviewPaymentForm(props) {
  const dispatch = useDispatch();
  const token = useSelector(state => state.datalocalReducer.token);
  const { staff_appointment, staff_favourites } = useSelector(
    state => state.staffReducer,
  );
  const merchant = useSelector(state => state.storeReducer.merchant_detail);

  const { showReviewForm } = useSelector(state => state.generalReducer);
  const [reviewType, setReviewType] = React.useState(REVIEW_TYPES.JUST_OK);
  const [file_list, set_file_list] = React.useState([]);
  const [imgList, setImgList] = React.useState([]);
  const [commentText, setCommentText] = React.useState(null);

  React.useEffect(() => {
    if (showReviewForm) {
      const { id, merchantId } = showReviewForm;
      if (id) dispatch(actions.staffAction.getStaffAppointment(token, id));
      if (merchantId) {
        dispatch(actions.staffAction.staffGetByMerchant(merchantId, token));
        dispatch(actions.storeAction.getDetailMerchant(merchantId, token));
      }
      dispatch(actions.staffAction.getFavouriteStaffMerchant(token));
    }
  }, [showReviewForm]);

  const _onHandleCancel = () => {
    dispatch(actions.generalAction.visibleReviewForm(null));
    dispatch({ type: 'SET_STAFF_APPOINTMENT', payload: [] });
    RootNavigation.navigate('Home');
  };

  const _onHandleSendReview = () => {
    const body = {
      merchantId: showReviewForm.merchantId,
      rating: reviewType,
      message: commentText,
      ratingImages: file_list,
    };

    dispatch(
      actions.storeAction.updateRatingMerchant(token, body, () => {
        _onHandleCancel();
      }),
    );
  };

  const toggleLike = (staffId, isCheck) => {
    const body = {
      staffId: staffId,
      isFavorited: isCheck ? 1 : 0,
    };
    dispatch(actions.staffAction.updateFavouriteStaff(token, body));
  };

  const deleteImage = index => {
    set_file_list(file_list.filter((obj, key) => key !== index));
    setImgList(imgList.filter((obj, key) => key !== index));
  };

  const afterSubmitImage = file_id => {
    set_file_list([
      ...file_list,
      {
        fileId: file_id,
      },
    ]);
  };

  const onSubmitImage = response => {
    let fileName = response.fileName;
    if (fileName) {
      if (
        Platform.OS === 'ios' &&
        (fileName.endsWith('.heic') || fileName.endsWith('.HEIC'))
      ) {
        fileName = `${fileName.split('.')[0]}.JPG`;
      }
    }
    const body = {
      uri: response.uri,
      fileName: fileName ? fileName : 'photo',
      type: response.type,
    };

    const data = [];
    data.push(body);

    dispatch(actions.authAction.uploadAvatar(data, afterSubmitImage));
  };

  const responseCamera = response => {
    if (response.didCancel) {
    } else if (response?.errorCode) {
      alert(response.errorCode);
    } else if (response.uri) {
      setImgList([...imgList, response.uri]);
      onSubmitImage(response);
    }
  };

  const pickGallery = () => {
    ImagePicker.launchImageLibrary({ mediaType: 'photo' }, response => {
      responseCamera(response);
    });
  };

  const launchCamera = () => {
    ImagePicker.launchCamera({ mediaType: 'photo' }, response => {
      responseCamera(response);
    });
  };

  const linkToReviewPage = () => {
    if (!isEmpty(merchant?.reviewLink)) {
      Linking.openURL(merchant?.reviewLink);
    } else {
      alert('Not found this store on google.');
    }

    _onHandleCancel();
  };

  const _onHandleSetTypeReview = type => {
    setReviewType(type);

    Alert.alert(
      'Confirm',
      'Do you want review us on Google?',
      [
        {
          text: 'Cancel',
          // onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {
          text: 'OK',
          onPress: linkToReviewPage,
          style: 'default',
        },
      ],
      {
        cancelable: false,
      },
    );
  };

  return (
    <TouchableOpacity style={styles.container} activeOpacity={1}>
      <View style={{ height: scaleHeight(8) }} />
      {/* <Image source={images.checked_transaction} style={styles.iconLogo} /> */}
      {/* <View style={{ height: scaleHeight(2) }} /> */}
      <Text style={styles.txtSuccess}>Transaction successful !</Text>
      <View style={{ height: scaleHeight(2) }} />
      <Text style={styles.textContent}>
        Please tell us what you think of your service experience.
      </Text>
      <View style={{ height: scaleHeight(4) }} />
      <View
        style={{
          width: '96%',
          flexDirection: 'row',
          justifyContent: 'space-evenly',
        }}>
        <ReviewItem
          type={REVIEW_TYPES.NOT_GOOD}
          imageNormal={images.notGood}
          imageActive={images.notGood_active}
          label={'Not Good'}
          activeType={reviewType}
          onPress={setReviewType}
        />
        <ReviewItem
          type={REVIEW_TYPES.JUST_OK}
          imageNormal={images.justOk}
          imageActive={images.justOk_active}
          label={'Just Okey'}
          activeType={reviewType}
          onPress={setReviewType}
        />
        <ReviewItem
          type={REVIEW_TYPES.AWESOME}
          imageNormal={images.awesome}
          imageActive={images.awesome_active}
          label={'Awesome'}
          activeType={reviewType}
          onPress={_onHandleSetTypeReview}
        />
      </View>
      <View style={{ height: scaleHeight(4) }} />
      <Text
        style={{
          fontSize: scaleWidth(4),
          color: '#282828',
          textAlign: 'center',
          fontWeight: '400',
        }}>
        Do you satisfied with the staff at
        <Text
          style={{
            color: '#0764B0',
            fontWeight: Platform.OS === 'android' ? 'bold' : '600',
            fontSize: scaleWidth(4.5),
          }}>
          {` ${showReviewForm?.businessName ?? ''} `}
        </Text>
        ?
      </Text>
      <View style={{ height: scaleHeight(2) }} />
      <View
        style={{
          width: '92%',
          flexDirection: 'row',
          justifyContent: 'space-evenly',
        }}>
        {staff_appointment?.length > 0 && (
          <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
            {staff_appointment?.map(staff => {
              const isCheck = staff_favourites.find(
                obj => obj.staffId === staff.staffId,
              );

              return (
                <StaffFavoritesItem
                  isFavorite={isCheck}
                  staff={staff}
                  key={'staff' + staff.staffId}
                  toggleLike={toggleLike}
                />
              );
            })}
          </ScrollView>
        )}
      </View>
      <View style={{ height: scaleHeight(2) }} />
      <View style={{ width: '92%' }}>
        <Text
          style={{
            fontSize: scaleWidth(4),
            color: '#282828',
            textAlign: 'center',
            fontWeight: '400',
            textAlign: 'left',
          }}>
          Leave comment
        </Text>
        <View style={{ height: scaleHeight(1) }} />

        <View
          style={{
            width: '100%',
            height: scaleHeight(7),
            backgroundColor: '#fff',
            borderColor: '#dfdfdf',
            borderWidth: 1,
            paddingHorizontal: 6,
            paddingTop: 6,
            paddingBottom: 2,
          }}>
          <TextInput
            style={{
              fontSize: scaleWidth(3.8),
              color: '#3f3f3f',
            }}
            multiline
            placeholder="Your comment"
            value={commentText}
            onChangeText={setCommentText}
          />
        </View>
        <View style={{ height: scaleHeight(1) }} />
        <View
          style={{
            width: '92%',
            flexDirection: 'row',
            justifyContent: 'space-evenly',
          }}>
          {imgList.map((image, index) => (
            <MediaItem index={index} image={image} />
          ))}
        </View>

        <TouchableOpacity
          style={{
            width: scaleWidth(14),
            height: scaleWidth(14),
            backgroundColor: '#fff',
            borderColor: '#dfdfdf',
            borderWidth: 1,
            alignItems: 'center',
            justifyContent: 'center',
          }}
          onPress={pickGallery}>
          <Image
            source={images.camera_rating}
            style={{
              width: scaleWidth(6),
              height: scaleWidth(6),
              tintColor: '#7d7d7d',
            }}
          />
          <Text
            style={{
              fontSize: scaleWidth(2.2),
              color: '#7d7d7d',
            }}>
            Add photos
          </Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity onPress={_onHandleSendReview} style={styles.btnNext}>
        <Text style={styles.txtNext}>Send Review</Text>
      </TouchableOpacity>
      <View style={{ height: scaleHeight(1) }} />

      <TouchableOpacity
        onPress={_onHandleCancel}
        style={{
          height: scaleWidth(8),
          width: scaleWidth(20),
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Text style={styles.txtNotNow}> Skip </Text>
      </TouchableOpacity>
    </TouchableOpacity>
  );
}

const ReviewItem = ({
  type,
  activeType,
  imageNormal,
  imageActive,
  label,
  onPress,
}) => {
  const _onHandlePressItem = () => {
    if (onPress && typeof onPress === 'function') {
      onPress(type);
    }
  };

  return (
    <TouchableOpacity
      onPress={_onHandlePressItem}
      style={{
        flex: 0,
        height: scaleHeight(12),
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: '#dfdfdf',
        borderWidth: 1,
        borderRadius: 4,
        width: scaleWidth(22),
        backgroundColor: activeType === type ? '#0764B0' : '#ddd',
      }}>
      <Image
        source={activeType === type ? imageActive : imageNormal}
        style={{
          width: scaleWidth(14),
          height: scaleWidth(14),
        }}
      />
      <View style={{ height: scaleHeight(2) }} />

      <Text
        style={{
          fontSize: scaleWidth(4),
          color: activeType === type ? '#fff' : '#666',
          textAlign: 'center',
        }}>
        {label}
      </Text>
    </TouchableOpacity>
  );
};

const StaffFavoritesItem = ({ staff, isFavorite, toggleLike }) => {
  const _onHandleToggleLike = () => {
    if (toggleLike && typeof toggleLike === 'function') {
      toggleLike(staff?.staffId, !isFavorite);
    }
  };

  const renderImg = staff.imageUrl
    ? { uri: staff.imageUrl, priority: 'normal' }
    : images.avatar;

  return (
    <View
      style={{
        marginRight: scaleWidth(8),
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <Image
        source={renderImg}
        style={{
          width: scaleWidth(14),
          height: scaleWidth(14),
          borderRadius: scaleWidth(80),
        }}
      />
      <Text
        style={{
          fontSize: scaleWidth(3.8),
          color: '#404040',
          marginVertical: scaleHeight(1),
        }}>{`${staff.displayName}`}</Text>
      <TouchableOpacity onPress={_onHandleToggleLike}>
        <AntDesign
          name="heart"
          size={scaleWidth(7)}
          color={isFavorite ? 'red' : '#E5E5E5'}
        />
      </TouchableOpacity>
    </View>
  );
};

const MediaItem = ({ index, image }) => {
  return (
    <View style={styles.item}>
      <Image
        key={index + 'imgList' + Math.random()}
        source={{ uri: image }}
        style={{
          width: scaleWidth(20),
          height: scaleWidth(20),
          marginBottom: scaleWidth(3),
        }}
      />
      <TouchableOpacity
        style={{
          width: 15,
          height: 15,
        }}
        hitSlop={slop}>
        <AntDesign color="white" name="close" size={scaleWidth(3.5)} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1,
    width: '100%',
    alignItems: 'center',
  },
  iconLogo: {
    width: scaleWidth(17),
    height: scaleWidth(17),
  },
  txtSuccess: {
    fontSize: scaleWidth(5),
    color: '#1C98C9',
  },
  ratingNow: {
    color: '#2EBE03',
    fontSize: scaleWidth(4.5),
    fontWeight: Platform.OS === 'android' ? 'bold' : '700',
    marginTop: scaleHeight(4),
  },
  containerStar: {
    flexDirection: 'row',
    marginTop: scaleHeight(4),
  },
  star: {
    marginRight: scaleWidth(2),
  },
  textContent: {
    fontSize: scaleWidth(4),
    color: '#282828',
    textAlign: 'center',
    fontWeight: '500',
  },

  txtNext: {
    fontSize: scaleWidth(4),
    color: 'white',
    fontWeight: Platform.OS === 'android' ? '600' : 'bold',
  },

  txtNotNow: {
    color: '#0764B0',
    fontSize: scaleWidth(3.8),
    marginTop: scaleHeight(1),
    textDecorationLine: 'underline',
    fontWeight: '500',
  },

  btnNext: {
    borderRadius: 5,
    width: '80%',
    height: scaleWidth(12),
    marginTop: scaleHeight(4),
    backgroundColor: '#0764B0',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
