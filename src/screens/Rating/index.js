import React, { useState } from 'react';
import {
  View,
  ScrollView,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
} from 'react-native';
import styles from './styles';
import { Header, StatusBar, Modal2 } from 'components';
import {
  Message,
  Stars,
  StaffList,
  ButtonSubmit,
  ImageList,
  PopupThanks,
} from './widget';
import * as RootNavigation from 'navigations/RootNavigation';
import { useSelector, useDispatch } from 'react-redux';
import actions from '@redux/actions';
import * as ImagePicker from 'react-native-image-picker';
import ICONS from 'assets';
import FastImage from 'react-native-fast-image';
import { FormThankYou } from '@shared/components';

const options = {
  title: 'Select Avatar',
  customButtons: [{ name: 'fb', title: 'Choose Photo from Facebook' }],
  storageOptions: {
    skipBackup: true,
    path: 'images',
  },
};

const list = [
  {
    isActive: true,
    key: 0,
  },
  {
    isActive: true,
    key: 1,
  },
  {
    isActive: true,
    key: 2,
  },
  {
    isActive: true,
    key: 3,
  },
  {
    isActive: true,
    key: 4,
  },
];

export default function index(props) {
  const { route } = props || {};
  const dispatch = useDispatch();
  const flatList = React.useRef(null);

  const [message, setMessage] = useState('');
  const [isSubmit, setSubmit] = useState(false);
  const [rating, setRating] = useState(list);
  const [file_list, set_file_list] = useState([]);
  const [imgList, setImgList] = useState([]);

  const { token } = useSelector(state => state.datalocalReducer);

  const merchant = useSelector(state => state.storeReducer.merchant_detail);
  const { merchantId, businessName } = merchant || {};

  const responseCamera = response => {
    if (response.didCancel) {
    } else if (response.error) {
    } else {
      setImgList([...imgList, response.uri]);
      onSubmitImage(response);
    }
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

  const afterSubmitImage = file_id => {
    set_file_list([
      ...file_list,
      {
        fileId: file_id,
      },
    ]);
  };

  const pickGallery = () => {
    // onSubmitImage({
    //   fileName: 'test.heic',
    //   uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRBmNyK5FXbYrMhKrD9szqcn4naSokfa4NY2zrbg-sox8HHRMKTCJRHVVF4R63epT-A8R8&usqp=CAU',
    //   type: 'image',
    // });
    ImagePicker.launchImageLibrary(options, response => {
      responseCamera(response);
    });
  };

  const launchCamera = () => {
    ImagePicker.launchCamera(options, response => {
      responseCamera(response);
    });
  };

  const _onHandleRemoveImage = index => {
    set_file_list(file_list.filter((obj, key) => key !== index));
    setImgList(imgList.filter((obj, key) => key !== index));
  };

  const onSubmit = () => {
    const count_rating = rating.filter(obj => obj.isActive === true);
    const body = {
      merchantId,
      rating: count_rating.length,
      message,
      ratingImages: file_list,
    };
    dispatch(actions.storeAction.updateRatingMerchant(token, body, setSubmit));
  };

  const _onHandleBack = () => {
    RootNavigation.back();
  };

  const _onHandleRenderMediaItem = ({ item, index }) => {
    return (
      <MediaItem image={item} index={index} onRemove={_onHandleRemoveImage} />
    );
  };

  const _onHandleSubmitDone = () => {
    RootNavigation.navigate('Home');
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

  return (
    <View style={styles.container}>
      <View style={{ backgroundColor: '#f8f8f8' }}>
        <StatusBar />
        <Header
          title="Rating"
          iconRight={ICONS['close_header']}
          headerRight={true}
          onPressRight={_onHandleBack}
        />
      </View>

      <View style={styles.body}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={{ height: scaleHeight(10) }} />

          <Text
            style={{ fontSize: 24, fontWeight: '600', textAlign: 'center' }}>
            Store Review
          </Text>

          <Stars
            list={list}
            rating={rating}
            setRating={setRating}
            businessName={businessName}
          />
          <View style={{ height: scaleHeight(10) }} />
          <View style={{ height: 1, backgroundColor: '#E7E7E7' }} />
          <Message
            pickGallery={pickGallery}
            launchCamera={launchCamera}
            message={message}
            setMessage={setMessage}
          />
          {/* {file_list.length > 0 && (
            <ImageList imgList={imgList} deleteImage={deleteImage} />
          )} */}
          <View style={{ height: scaleHeight(15) }} />
          <FlatList
            ref={flatList}
            style={{
              height: scaleHeight(95),
            }}
            contentContainerStyle={{ paddingHorizontal: scaleWidth(10) }}
            horizontal
            showsHorizontalScrollIndicator={false}
            data={imgList}
            renderItem={_onHandleRenderMediaItem}
            ItemSeparatorComponent={() => (
              <View style={{ width: scaleWidth(10) }} />
            )}
            ListFooterComponent={() => (
              <TouchableOpacity
                style={{
                  width: scaleWidth(103),
                  height: scaleHeight(95),
                  backgroundColor: '#F2F2F2',
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: scaleWidth(11),
                  marginHorizontal: scaleWidth(10),
                }}
                onPress={pickGallery}>
                <Image
                  source={ICONS.camera_rating}
                  style={{
                    width: scaleWidth(24),
                    height: scaleHeight(18),
                    tintColor: '#5A5A5A',
                  }}
                />
                <View style={{ height: scaleHeight(1) }} />
                <Text
                  style={{
                    fontSize: scaleWidth(14),
                    color: '#5A5A5A',
                  }}>
                  Add photos
                </Text>
              </TouchableOpacity>
            )}
          />
        </ScrollView>
        <View
          style={{
            position: 'absolute',
            bottom: 0,
            alignItems: 'center',
            justifyContent: 'center',
            width: '100%',
            height: scaleHeight(90),
            elevation: 3,
            shadowColor: '#000',
            shadowOffset: {
              width: 1,
              height: 2,
            },
            shadowOpacity: 0.13,
            shadowRadius: 2.82,
            backgroundColor: 'white',
            paddingBottom: scaleHeight(30),
          }}>
          <ButtonSubmit onSubmit={onSubmit} />
        </View>
      </View>

      {isSubmit && <FormThankYou onHandleSubmitDone={_onHandleSubmitDone} />}
    </View>
  );
}

const MediaItem = ({ index, image, onRemove }) => {
  const _onHandleRemoveItem = () => {
    if (onRemove && typeof onRemove === 'function') {
      onRemove(index);
    }
  };
  return (
    <TouchableOpacity
      style={{
        width: scaleWidth(103),
        height: scaleHeight(95),
        borderRadius: scaleWidth(11),
        overflow: 'hidden',
      }}>
      <FastImage
        key={index + 'imgList' + Math.random()}
        source={{ uri: image, priority: FastImage.priority.normal }}
        style={{
          flex: 1,
        }}
      />
      <TouchableOpacity
        style={{
          flex: 0,
          position: 'absolute',
          top: 0,
          right: 0,
          justifyContent: 'center',
          alignItems: 'center',
        }}
        onPress={_onHandleRemoveItem}>
        <Image
          source={ICONS.deleteMedia}
          style={{ width: scaleWidth(30), height: scaleWidth(30) }}
        />
      </TouchableOpacity>
    </TouchableOpacity>
  );
};
