import React from 'react';
import { View, Platform } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import ImageResizer from 'react-native-image-resizer';

import actions from '@redux/actions';
import { SelectStoreSpecial, SelectAmount, CustomTemplate } from './widget';
import {
  Text,
  Container,
  Form,
  Header,
  ProgressiveImage,
  LazyImage,
} from 'components';
import * as RootNavigation from 'navigations/RootNavigation';
import styles from './style';
import ICONS from 'assets';
import { scaleSize } from 'utils';

const { Input, ButtonSubmit } = Form;

export default function index(props) {
  const dispatch = useDispatch();
  const token = useSelector(state => state.datalocalReducer.token);
  // const { merchant_name } = store_special;
  const {
    template: {
      type,
      imageUrl,
      giftCardTemplateId,
      fileId,
      giftCardType,
      giftCardTemplateName,
    },
  } = props.route.params;

  const [amount, setAmount] = React.useState(0);
  const [message, setMessage] = React.useState('');
  const [file_id, setFileId] = React.useState(fileId);
  const [images, setImage] = React.useState(ICONS['camera_picker']);
  const onBack = () => {
    RootNavigation.back();
  };

  const submitImage = response => {
    let fileName = response.fileName;
    if (fileName) {
      if (
        Platform.OS === 'ios' &&
        (fileName.endsWith('.heic') || fileName.endsWith('.HEIC'))
      ) {
        fileName = `${fileName.split('.')[0]}.JPG`;
      }
    }
    ImageResizer.createResizedImage(response.uri, 382, 220, 'JPEG', 100, 0)
      .then(({ uri }) => {
        dispatch(
          actions.authAction.uploadAvatar(
            [
              {
                uri,
                fileName: fileName ? fileName : '',
                type: response.type,
              },
            ],
            setFileId,
          ),
        );
      })

      .catch(err => {
        dispatch(
          actions.authAction.uploadAvatar(
            [
              {
                uri: response.uri,
                fileName: fileName ? fileName : '',
                type: response.type,
              },
            ],
            setFileId,
          ),
        );
      });
  };

  const goToSelectCreditCard = () => {
    let gift = {
      message,
      amount,
      merchantId: 0,
      isSpecificMerchant: 0,
      imageUrl: type == 'template_custom' ? images.uri : imageUrl,
      giftCardTemplateId,
      fileId: type == 'template_custom' ? file_id : fileId,
      giftCardType: type == 'template_custom' ? 'User Template' : giftCardType,
      giftCardTemplateName:
        type == 'template_custom' ? 'Your Template' : giftCardTemplateName,
    };

    dispatch(actions.buygiftAction.set_gift_send(gift));

    if (type == 'template_custom') {
      dispatch(
        actions.buygiftAction.post_template_card(token, {
          giftCardTemplateName: 'User Template',
          fileId: file_id,
        }),
      );
    } else {
      RootNavigation.navigate('SelectCreditCard');
    }
    //Custom GiftCard
  };

  const onChangeText = value => {
    setMessage(value);
  };

  return (
    <Container barStyle="dark-content">
      <Header title="Buy gift" headerLeft={true} onBack={onBack} />

      <View style={styles.container_center}>
        <Text style={styles.title} fontSize={17}>
          You have selected the card below
        </Text>

        {type == 'template_custom' ? (
          <CustomTemplate
            onSubmit={submitImage}
            images={images}
            onChangeImage={setImage}
          />
        ) : (
          <ImageCard imageUrl={imageUrl} />
        )}

        {/* <SelectStoreSpecial openSearchList={goToSearchStore} value={merchant_name} /> */}

        <SelectAmount value={amount} onChangeValue={setAmount} />

        <Input
          placeHolder="Say something … !"
          label="Message:"
          multiline={true}
          textAlignVertical="top"
          height={130}
          width={382}
          styleTextInput={styles.input}
          contentContainerInput={{ borderBottomWidth: 0 }}
          onChangeText={onChangeText}
          value={message}
        />

        <View style={styles.button_submit}>
          <ButtonSubmit
            onSubmit={goToSelectCreditCard}
            title="Next"
            width={370}
            disabled={
              amount == 0 || (type == 'template_custom' && !images.uri)
                ? true
                : false
            }
            backgroundColor={
              amount == 0 || (type == 'template_custom' && !images.uri)
                ? '#EEEEEE'
                : '#0764B0'
            }
            textColor={
              amount == 0 || (type == 'template_custom' && !images.uri)
                ? '#585858'
                : '#FFF'
            }
          />
        </View>
      </View>
    </Container>
  );
}

const ImageCard = React.memo(({ imageUrl }) => (
  <ProgressiveImage source={{ uri: imageUrl }} style={styles.image_card} />
));
