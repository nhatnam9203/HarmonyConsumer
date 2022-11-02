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
  FlatList,
  ActivityIndicator,
} from 'react-native';
import { scaleWidth, scaleHeight } from 'utils';
import images from 'assets';
import * as RootNavigation from 'navigations/RootNavigation';
import { useDispatch, useSelector } from 'react-redux';
import FastImage from 'react-native-fast-image';
import actions from '@redux/actions';
import { harmonyApi, useQueryCallback } from '@shared/services';
import AntDesign from 'react-native-vector-icons/AntDesign';
import * as ImagePicker from 'react-native-image-picker';
import { slop } from 'utils';
import { isEmpty } from 'lodash';
import { FormThankYou } from '@shared/components';

const REVIEW_TYPES = {
  NONE: 0,
  NOT_GOOD: 1,
  JUST_OK: 2,
  AWESOME: 3,
  HEART: 4,
};

const options = {
  title: 'Select Avatar',
  customButtons: [{ name: 'fb', title: 'Choose Photo from Facebook' }],
  storageOptions: {
    skipBackup: true,
    path: 'images',
  },
};

const IMAGE_ITEM_HEIGHT = scaleWidth(18);

export default function ReviewPaymentForm(props) {
  const dispatch = useDispatch();
  const flatList = React.useRef(null);
  const token = useSelector(state => state.datalocalReducer.token);
  const { staff_appointment, staff_favourites } = useSelector(
    state => state.staffReducer,
  );
  const merchant = useSelector(state => state.storeReducer.merchant_detail);

  const { showReviewForm } = useSelector(state => state.generalReducer);
  const [reviewType, setReviewType] = React.useState(REVIEW_TYPES.NONE);
  const [file_list, set_file_list] = React.useState([]);
  const [imgList, setImgList] = React.useState([]);
  const [commentText, setCommentText] = React.useState(null);
  const [isSubmit, setSubmit] = React.useState(false);

  const [reviewAppointment, { loading: reviewAppointmentLoading }] =
    useQueryCallback(
      harmonyApi.useReviewAppointmentMutation,
      result => {
        setSubmit(true);
      },
      error => {
        console.log(error);
      },
    );

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

  const _isAllowReview = () => {
    return reviewType !== REVIEW_TYPES.NONE;
  };
  const _onHandleCancel = () => {
    dispatch(actions.generalAction.visibleReviewForm(null));
    dispatch({ type: 'SET_STAFF_APPOINTMENT', payload: [] });
    RootNavigation.navigate('Home');
  };

  const _onHandleSendReview = () => {
    // const body = {
    //   merchantId: showReviewForm.merchantId,
    //   rating: reviewType,
    //   message: commentText,
    //   ratingImages: file_list,
    // };

    const { id } = showReviewForm || {};
    if (!id) {
      alert('Not found appointment id');
      _onHandleCancel();
      return;
    }

    reviewAppointment({
      appointmentId: id,
      data: {
        message: commentText,
        reaction: reviewType,
        images: file_list,
        staffReactions:
          staff_appointment?.map(x => ({
            staffId: x?.staffId,
            reaction:
              staff_favourites?.find(obj => obj?.staffId === x?.staffId) >= 0
                ? REVIEW_TYPES.HEART
                : REVIEW_TYPES.NONE,
          })) ?? [],
      },
    });
  };

  const _onHandleStaffToggleLike = (staffId, isCheck) => {
    const body = {
      staffId: staffId,
      isFavorited: isCheck ? 1 : 0,
    };
    dispatch(actions.staffAction.updateFavouriteStaff(token, body));
  };

  const _onHandleRemoveImage = idx => {
    set_file_list(file_list.filter((x, index) => index !== idx));
    setImgList(imgList.filter((x, index) => idx !== index));
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
    } else if (response?.uri) {
      setImgList([...imgList, response?.uri]);
      onSubmitImage(response);
    }
  };

  const pickGallery = () => {
    // responseCamera({
    //   uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRaPZ-AkoWA-OIYNNBS1hW1NPd5gb2mhp8MPbFvplsyATNL0YyJ7aGh-HI8VIERp3O2Ae4&usqp=CAU',
    // });
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

  React.useEffect(() => {
    if (imgList?.length > 1) {
      const wait = new Promise(resolve => setTimeout(resolve, 500));
      wait.then(() => {
        flatList.current?.scrollToIndex({
          index: imgList?.length - 1,
          animated: true,
        });
      });
    }
  }, [imgList]);

  const _onHandleRenderItem = ({ item, index }) => {
    const isCheck = staff_favourites.find(obj => obj.staffId === item.staffId);
    const _onHandleToggleLike = () => {
      _onHandleStaffToggleLike(item?.staffId, !isCheck);
    };

    return (
      <StaffFavoritesItem
        isFavorite={isCheck}
        staff={item}
        key={'_staff' + item.staffId}
        toggleLike={_onHandleToggleLike}
      />
    );
  };

  const _onHandleRenderMediaItem = obj => {
    const { item, index } = obj || {};
    console.log(obj);
    const key = `${index}-${item}`;
    return (
      <MediaItem
        key={key}
        image={item}
        index={index}
        onRemove={_onHandleRemoveImage}
      />
    );
  };

  const _onHandleSubmitDone = () => {
    _onHandleCancel();
  };

  const onChangeReviewComment = (value) => {
    if (value && value.length > 500) {
      return
    }
    setCommentText(value);
  }

  return (
    <TouchableOpacity style={styles.container} activeOpacity={1}>
      <ScrollView>
        <View style={styles.content}>
          <View style={{ height: scaleHeight(6) }} />
          {/* <Image source={images.checked_transaction} style={styles.iconLogo} /> */}
          {/* <View style={{ height: scaleHeight(2) }} /> */}
          {/* <Text style={styles.txtSuccess}>Transaction successful !</Text>
      <View style={{ height: scaleHeight(2) }} /> */}
          <Text style={styles.txtTitle}>Appointment Review</Text>
          <View style={{ height: scaleHeight(1) }} />
          <Text style={styles.textContent}>
            Please tell us what you think of your service experience.
          </Text>
          <View style={{ height: scaleHeight(3) }} />
          <View
            style={{
              width: '96%',
              flexDirection: 'row',
              justifyContent: 'space-evenly',
            }}>
            <ReviewItem
              type={REVIEW_TYPES.NOT_GOOD}
              image={images.notGood}
              label={'Bad'}
              activeType={reviewType}
              onPress={setReviewType}
              colorActive={'#ED4343'}
              colorNormal={'#6F6F6F'}
            />
            <ReviewItem
              type={REVIEW_TYPES.JUST_OK}
              image={images.justOk}
              label={'Satisfied'}
              activeType={reviewType}
              onPress={setReviewType}
              colorActive={'#FFA800'}
              colorNormal={'#6F6F6F'}
            />
            <ReviewItem
              type={REVIEW_TYPES.AWESOME}
              image={images.awesome}
              label={'Awesome'}
              activeType={reviewType}
              onPress={setReviewType}
              colorActive={'#2AC267'}
              colorNormal={'#6F6F6F'}
            />
          </View>
          <View style={{ height: scaleHeight(4) }} />
          <Text
            style={{
              fontSize: scaleWidth(4),
              color: '#282828',
              textAlign: 'left',
              fontWeight: '500',
            }}>
            Do you satisfied with the staff
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
          {staff_appointment?.length > 0 && (
            <FlatList
              style={{
                maxHeight: scaleHeight(20),
                width: '100%',
                flex: 0,
              }}
              contentContainerStyle={{ paddingHorizontal: scaleWidth(3) }}
              data={staff_appointment}
              renderItem={_onHandleRenderItem}
            />
          )}
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
                height: scaleHeight(10),
                backgroundColor: '#fff',
                borderColor: '#dfdfdf',
                borderWidth: 1,
                paddingHorizontal: 6,
                paddingTop: 6,
                paddingBottom: 2,
              }}>
              <TextInput
                style={{
                  fontSize: scaleWidth(4),
                  color: '#3f3f3f',
                  height: '100%',
                }}
                multiline
                placeholder="Your comment"
                value={commentText}
                onChangeText={onChangeReviewComment}
              />
            </View>
            <View style={{ height: scaleHeight(1) }} />

            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
              <TouchableOpacity
                style={{
                  width: scaleWidth(36),
                  height: scaleWidth(10),
                  backgroundColor: '#ECECEC',
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: scaleWidth(1),
                  marginHorizontal: scaleWidth(2),
                  flexDirection: 'row',
                }}
                onPress={pickGallery}>
                <Image
                  source={images.media_rating}
                  style={{
                    width: scaleWidth(6),
                    height: scaleWidth(4),
                    tintColor: '#5A5A5A',
                  }}
                />
                <View style={{ width: scaleWidth(1) }} />
                <Text
                  style={{
                    fontSize: scaleWidth(4),
                    color: '#5A5A5A',
                  }}>
                  Upload photo
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={{
                  width: scaleWidth(36),
                  height: scaleWidth(10),
                  backgroundColor: '#ECECEC',
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: scaleWidth(1),
                  marginHorizontal: scaleWidth(2),
                  flexDirection: 'row',
                }}
                onPress={launchCamera}>
                <Image
                  source={images.camera_rating}
                  style={{
                    width: scaleWidth(6),
                    height: scaleWidth(4),
                    tintColor: '#5A5A5A',
                  }}
                />
                <View style={{ width: scaleWidth(1) }} />
                <Text
                  style={{
                    fontSize: scaleWidth(4),
                    color: '#5A5A5A',
                  }}>
                  Take photo
                </Text>
              </TouchableOpacity>
            </View>
            <View style={{ height: scaleHeight(1.5) }} />

            <FlatList
              data={imgList}
              ref={flatList}
              style={{
                height: scaleHeight(10),
                flex: 1,
              }}
              getItemLayout={(data, index) => {
                return {
                  length: imgList?.length,
                  offset: IMAGE_ITEM_HEIGHT * index,
                  index,
                };
              }}
              horizontal
              showsHorizontalScrollIndicator={false}
              renderItem={_onHandleRenderMediaItem}
              keyExtractor={(item, index) => `${index}-${item}`}
              ItemSeparatorComponent={() => (
                <View style={{ width: scaleWidth(2) }} />
              )}
              ListFooterComponent={() => <View />}
            />
          </View>
        </View>
      </ScrollView>

      <View
        style={{
          position: 'absolute',
          bottom: 0,
          width: '100%',
          paddingBottom: scaleHeight(3),
          alignItems: 'center',
        }}>
        <TouchableOpacity
          onPress={_onHandleSendReview}
          style={[
            styles.btnNext,
            { backgroundColor: _isAllowReview() ? '#0764B0' : '#dddddd' },
          ]}
          disabled={!_isAllowReview()}>
          <Text style={styles.txtNext}>Submit</Text>
        </TouchableOpacity>
        <View style={{ height: scaleHeight(1) }} />

        <TouchableOpacity
          onPress={_onHandleCancel}
          style={{
            height: scaleWidth(10),
            width: scaleWidth(30),
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text style={styles.txtNotNow}> Skip </Text>
        </TouchableOpacity>
      </View>

      {isSubmit && <FormThankYou onHandleSubmitDone={_onHandleSubmitDone} />}
      {reviewAppointmentLoading && (
        <View
          style={{
            position: 'absolute',
            zIndex: 500,
            justifyContent: 'center',
            alignItems: 'center',
            width: '100%',
            height: '100%',
            backgroundColor: '#0005',
          }}>
          <ActivityIndicator size={'large'} color="white" />
        </View>
      )}
    </TouchableOpacity>
  );
}

const ReviewItem = ({
  type,
  activeType,
  image,
  label,
  onPress,
  colorNormal,
  colorActive,
}) => {
  const _onHandlePressItem = () => {
    if (onPress && typeof onPress === 'function') {
      onPress(activeType === type ? REVIEW_TYPES.NONE : type);
    }
  };

  return (
    <TouchableOpacity
      onPress={_onHandlePressItem}
      style={[
        {
          flex: 0,
          height: scaleHeight(14),
          justifyContent: 'center',
          alignItems: 'center',
          borderColor: activeType === type ? colorActive : colorNormal,
          borderWidth: 1,
          borderStyle: 'solid',
          borderRadius: 12,
          width: scaleWidth(22),
          backgroundColor: 'white',
        },
        styles.shadow,
      ]}>
      <Image
        source={image}
        style={{
          width: scaleWidth(13),
          height: scaleWidth(13),
          tintColor: activeType === type ? colorActive : colorNormal,
        }}
      />
      <View style={{ height: scaleHeight(1) }} />

      <Text
        style={{
          fontSize: scaleWidth(4),
          color: activeType === type ? colorActive : colorNormal,
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
        justifyContent: 'flex-start',
        alignItems: 'center',
        flexDirection: 'row',
        paddingHorizontal: scaleWidth(2),
        borderWidth: 1,
        borderColor: '#D2D2D2',
        height: scaleHeight(7),
        borderRadius: scaleWidth(3),
      }}>
      <Image
        source={renderImg}
        style={{
          width: scaleHeight(5),
          height: scaleHeight(5),
          borderRadius: scaleHeight(3),
        }}
      />
      <View style={{ width: scaleWidth(2) }} />
      <Text
        style={{
          fontSize: scaleWidth(3.8),
          color: '#404040',
          marginVertical: scaleHeight(1),
          flex: 1,
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

const MediaItem = ({ index, image, onRemove }) => {
  const _onHandleRemoveItem = () => {
    if (onRemove && typeof onRemove === 'function') {
      onRemove(index);
    }
  };

  return (
    <TouchableOpacity style={styles.item}>
      <FastImage
        source={{ uri: image, priority: FastImage.priority.normal }}
        style={{
          width: scaleWidth(18),
          height: scaleWidth(18),
        }}
      />
      <TouchableOpacity
        style={{
          width: scaleWidth(8),
          height: scaleWidth(8),
          position: 'absolute',
          top: 0,
          right: 0,
          justifyContent: 'center',
          alignItems: 'center',
        }}
        onPress={_onHandleRemoveItem}>
        <Image
          source={images.deleteMedia}
          style={{ width: scaleWidth(6), height: scaleWidth(6) }}
        />
      </TouchableOpacity>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1,
    width: '100%',
  },

  content: { flex: 1, width: '100%', alignItems: 'center' },
  iconLogo: {
    width: scaleWidth(17),
    height: scaleWidth(17),
  },
  txtSuccess: {
    fontSize: scaleWidth(5),
    color: '#1C98C9',
  },

  txtTitle: {
    fontSize: scaleWidth(6),
    color: '#404040',
    fontWeight: '600',
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
    color: '#404040',
    textAlign: 'center',
    fontWeight: '400',
  },

  txtNext: {
    fontSize: scaleWidth(4),
    color: 'white',
    fontWeight: Platform.OS === 'android' ? '600' : 'bold',
  },

  txtNotNow: {
    color: '#0764B0',
    fontSize: scaleWidth(4),
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

  item: {
    width: scaleWidth(18),
    height: scaleWidth(18),
    borderRadius: scaleWidth(3),
    overflow: 'hidden',
  },

  shadow: {
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: {
      width: 1,
      height: 2,
    },
    shadowOpacity: 0.13,
    shadowRadius: 2.82,
  },
});
