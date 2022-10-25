import React, { useState } from 'react';
import { View, ScrollView } from 'react-native';
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

  const [message, setMessage] = useState('');
  const [isSubmit, setSubmit] = useState(false);
  const [rating, setRating] = useState(list);
  const [file_list, set_file_list] = useState([]);
  const [imgList, setImgList] = useState([]);

  const { token } = useSelector(state => state.datalocalReducer);
  const { staff_appointment, staff_favourites } = useSelector(
    state => state.staffReducer,
  );

  let merchantId;
  let businessName;
  let appointmentId;

  if (route?.params?.data) {
    merchantId = route?.params?.data?.merchantid;
    businessName = route?.params?.data?.businessname;
    appointmentId = route?.params?.data?.id;
  } else {
    const groupAppointment = useSelector(
      state => state.appointmentReducer.groupAppointment,
    );
    let { appointments } = groupAppointment;
    appointmentId = appointments[0]?.appointmentId;
    appointments = appointments ? appointments : null;
    const merchant = appointments ? appointments[0].merchant : null;
    merchantId = merchant?.merchantId;
    businessName = merchant?.businessName;
  }

  React.useEffect(() => {
    if (merchantId) {
      dispatch(actions.staffAction.getStaffAppointment(token, appointmentId));
      dispatch(actions.staffAction.staffGetByMerchant(merchantId, token));
      dispatch(actions.staffAction.getFavouriteStaffMerchant(token));
    }
  }, []);

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
    ImagePicker.launchImageLibrary(options, response => {
      responseCamera(response);
    });
  };

  const launchCamera = () => {
    ImagePicker.launchCamera(options, response => {
      responseCamera(response);
    });
  };

  const onSkip = () => {
    RootNavigation.navigate('Home');
    dispatch({ type: 'SET_STAFF_APPOINTMENT', payload: [] });
  };

  const deleteImage = index => {
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

  return (
    <View style={styles.container}>
      <View style={{ backgroundColor: '#f8f8f8' }}>
        <StatusBar />
        <Header title="Rating" />
      </View>

      <View style={styles.body}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <StaffList
            businessName={businessName}
            staff_favourites={staff_favourites}
            staffList={staff_appointment}
          />
          <Stars
            list={list}
            rating={rating}
            setRating={setRating}
            businessName={businessName}
          />
          <Message
            pickGallery={pickGallery}
            launchCamera={launchCamera}
            message={message}
            setMessage={setMessage}
          />
          {file_list.length > 0 && (
            <ImageList imgList={imgList} deleteImage={deleteImage} />
          )}
          <ButtonSubmit onSubmit={onSubmit} skip={onSkip} />
        </ScrollView>
      </View>

      <Modal2 isVisible={isSubmit} onRequestClose={() => {}}>
        <PopupThanks />
      </Modal2>
    </View>
  );
}
